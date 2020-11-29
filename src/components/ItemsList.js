import React, { useCallback, useContext, useRef } from "react";
import { API_URL, HEADER_LOGO, KEY_LAST_PAGE } from "../constants";
import { AppContext, hasMorePages, setItems } from "../State";
import { localStorageGet } from "../utils/localstorage";
import Item from "./Item";
import "./ItemsList.css";
import { fetchItems } from "../helpers/FetchApiData";

export const ItemsList = ({ items }) => {
  const { state, dispatch } = useContext(AppContext);
  const observer = useRef();
  const hasMore = hasMorePages(state);

  const lastItemRef = useCallback(
    item => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          let page = localStorageGet(KEY_LAST_PAGE);
          page = Number(page) + 1;

          const url = `${API_URL}?page=${page}`;

          fetchItems(url)
            .then(items => dispatch(setItems(items, page)))
            .catch(err => dispatch(err));
        }
      });
      if (item) observer.current.observe(item);
    },
    [hasMore, dispatch]
  );

  return (
    <div className='items-list-wrapper'>
      {items.length ? (
        items.map(item => (
          <React.Fragment key={item.id}>
            {items.length - 3 === item.id ? (
              <div className='item-list' ref={lastItemRef}>
                <Item item={item} />
              </div>
            ) : (
              <div className='item-list'>
                <Item item={item} />
              </div>
            )}
          </React.Fragment>
        ))
      ) : (
        <div className='flex-column'>
          <img
            src={HEADER_LOGO}
            alt='logo'
            width={"20%"}
            className='m-auto'
          />
          <h2 className='content-center'>
            We could not get your Oompa Loompas!
          </h2>
          <p className='content-center gray'>
            Try again later or check your connection to internet
          </p>
        </div>
      )}
      {!hasMore && (
        <div className='flex-column'>
          <img
            src={HEADER_LOGO}
            alt='logo'
            width={"20%"}
            className='m-auto'
          />
          <h2 className='content-center'>Uh Oh!</h2>
          <p className='content-center gray'>
            There are no more Oompa Loompas available at this moment!
          </p>
        </div>
      )}
    </div>
  );
};
