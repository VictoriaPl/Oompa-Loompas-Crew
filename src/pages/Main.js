import Axios from "axios";
import React, { useContext, useEffect } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import { API_URL, KEY_ITEMS } from "../constants";
import { AppContext, getPage, setError, setItems } from "../State";
import Home from "./Home";
import ItemDetail from "./ItemDetail";
import Header from "../components/Header";
import { localStorageGet } from "../utils/localstorage";

export default function Main() {
  const { state, dispatch } = useContext(AppContext);
  const page = getPage(state);

  useEffect(() => {
    //Get initial data if there are no items in local storage
    const items = localStorageGet(KEY_ITEMS);
    if (items) return;

    Axios.get(`${API_URL}?page=${page}`)
      .then(response =>
        dispatch(
          setItems(
            response.data.results,
            Boolean(response.data?.results?.length),
            page
          )
        )
      )
      .catch(err => dispatch(setError(err)));
  }, [dispatch, page]);

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/:id' component={ItemDetail} />
      </Switch>
    </Router>
  );
}
