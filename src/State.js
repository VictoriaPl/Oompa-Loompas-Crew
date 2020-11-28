import React, { createContext } from "react";
import {
  SET_PAGE,
  SET_SUCCESS,
  SET_ERROR,
  SET_LOADING,
  KEY_ITEMS,
  KEY_LAST_PAGE,
} from "./constants";
import { localStorageGet, localStorageSet } from "./utils/localstorage";

export const AppContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case SET_PAGE:
      return {
        ...state,
        page: action.page,
      };
    case SET_SUCCESS:
      const items = state.items.concat(action.items);
      localStorageSet(KEY_ITEMS, JSON.stringify(items));
      localStorageSet(KEY_LAST_PAGE, action.page);

      return {
        ...state,
        items,
        page: action.page,
        hasMorePages: action.hasMorePages,
        loading: false,
        error: "",
      };
    case SET_ERROR:
      return {
        ...state,
        items: {},
        page: 1,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

const logger = reducer => {
  const reducerWithLogger = (state, action) => {
    console.log(
      "%cPrevious State:",
      "color: #9E9E9E; font-weight: 700;",
      state
    );
    console.log(
      "%cAction:",
      "color: #00A7F7; font-weight: 700;",
      action
    );
    console.log(
      "%cNext State:",
      "color: #47B04B; font-weight: 700;",
      reducer(state, action)
    );
    return reducer(state, action);
  };

  return reducerWithLogger;
};

// const loggerReducer = logger(reducer);

const initialState = {
  page: 1,
  items: [],
  hasMorePages: true,
  loading: false,
  error: null,
};

export function AppContextProvider(props) {
  let items = localStorageGet(KEY_ITEMS);
  let page = localStorageGet(KEY_LAST_PAGE);

  const fullInitialState = {
    ...initialState,
    items: items ? JSON.parse(items) : [],
    page: page ? Number(page) + 1 : 1,
  };

  let [state, dispatch] = React.useReducer(reducer, fullInitialState);
  let value = { state, dispatch };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
}

export const AppContextConsumer = AppContext.Consumer;

//State action creators
export const setPage = page => ({
  type: SET_PAGE,
  page,
});

export const setItems = (items, hasMorePages, page) => ({
  type: SET_SUCCESS,
  items,
  hasMorePages,
  page,
});

export const setError = error => ({
  type: SET_ERROR,
  error,
});

export const setLoading = loading => ({
  type: SET_LOADING,
  loading,
});

//State selectors
export const hasMorePages = state => state.hasMorePages;
export const isLoading = state => state.isLoading;
export const hasError = state => state.hasError;

export const getPage = state => state.page;
export const getItems = state => state.items;
export const getItemById = (state, id) =>
  state.items.find(item => item.id === id);
