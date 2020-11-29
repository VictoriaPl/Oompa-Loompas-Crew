import React, { createContext } from "react";
import {
  FETCH_ITEMS,
  SET_ERROR,
  KEY_ITEMS,
  KEY_LAST_PAGE,
} from "./constants";
import { localStorageGet, localStorageSet } from "./utils/localstorage";

export const AppContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_ITEMS:
      const newItems = !state.items.find(
        i => i.id === action.items[0].id
      );
      const items = newItems
        ? [...state.items, ...action.items]
        : state.items;

      localStorageSet(KEY_ITEMS, JSON.stringify(items));
      localStorageSet(KEY_LAST_PAGE, action.page);

      return {
        ...state,
        items,
        page: action.page,
        hasMorePages: newItems,
        error: "",
      };

    case SET_ERROR:
      return {
        ...state,
        items: {},
        page: 1,
        error: action.error,
      };
    default:
      return state;
  }
};

const initialState = {
  page: 1,
  items: [],
  hasMorePages: true,
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
export const setItems = (items, page) => ({
  type: FETCH_ITEMS,
  items: items,
  page,
});

export const setError = error => ({
  type: SET_ERROR,
  error,
});

//State selectors
export const hasMorePages = state => state.hasMorePages;
export const hasError = state => state.hasError;

export const getItems = state => state.items;
