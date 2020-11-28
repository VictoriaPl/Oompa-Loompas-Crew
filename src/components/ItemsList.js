import Axios from "axios";
import React, { useCallback, useContext, useRef } from "react";
import { API_URL, KEY_LAST_PAGE } from "../constants";
import {
  AppContext,
  getItems,
  hasMorePages,
  setError,
  setItems,
} from "../State";
import { localStorageGet } from "../utils/localstorage";
import Item from "./Item";

export const ItemsList = () => {
  const { state, dispatch } = useContext(AppContext);
  const observer = useRef();
  const hasMore = hasMorePages(state);
  const items = getItems(state);

  const lastItemRef = useCallback(
    item => {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          let lastPage = localStorageGet(KEY_LAST_PAGE);
          lastPage = Number(lastPage) + 1;

          Axios.get(`${API_URL}?page=${lastPage}`)
            .then(response =>
              dispatch(
                setItems(
                  response.data.results,
                  Boolean(response.data?.results?.length),
                  lastPage
                )
              )
            )
            .catch(err => dispatch(setError(err)));
        }
      });
      if (item) observer.current.observe(item);
    },
    [hasMore, dispatch]
  );

  return (
    <div className='home-list-wrapper'>
      {items.length
        ? items.map(item => (
            <React.Fragment key={item.id}>
              {items.length === item.id + 1 ? (
                <div ref={lastItemRef}>
                  <Item item={item} />
                </div>
              ) : (
                <Item item={item} />
              )}
            </React.Fragment>
          ))
        : "No Oompa Loompas"}
    </div>
  );
};
