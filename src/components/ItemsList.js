import React, { useCallback, useContext, useRef } from "react";
import { API_URL, KEY_LAST_PAGE } from "../constants";
import { AppContext, hasMorePages } from "../State";
import { localStorageGet } from "../utils/localstorage";
import { useDataApi } from "../helpers/useDataApi";
import Item from "./Item";

export const ItemsList = ({ items }) => {
  const { state } = useContext(AppContext);
  const { fetchItems } = useDataApi();
  const observer = useRef();
  const hasMore = hasMorePages(state);

  const lastItemRef = useCallback(
    item => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          let page = localStorageGet(KEY_LAST_PAGE);
          page = Number(page) + 1;

          fetchItems(`${API_URL}?page=${page}`, page);
        }
      });
      if (item) observer.current.observe(item);
    },
    [hasMore, fetchItems]
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
