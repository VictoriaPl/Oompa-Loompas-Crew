import React, { useContext, useEffect } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import { API_URL, KEY_ITEMS, KEY_LAST_PAGE } from "../constants";
import { AppContext, setError, setItems } from "../State";
import Home from "./Home";
import ItemDetail from "./ItemDetail";
import Header from "../components/Header";
import { localStorageGet } from "../utils/localstorage";
import { fetchItems } from "../helpers/FetchApiData";

export default function Main() {
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    //Get initial data if there are no items in local storage
    const items = localStorageGet(KEY_ITEMS);
    if (items) return;

    let page = localStorageGet(KEY_LAST_PAGE);
    page = Number(page) ? Number(page) : 1;

    fetchItems(`${API_URL}?page=${page}`)
      .then(items => dispatch(setItems(items, page)))
      .catch(err => dispatch(setError(err)));
  }, [dispatch]);

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
