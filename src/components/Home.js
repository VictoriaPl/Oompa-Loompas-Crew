import React, { useState, useEffect, useRef, useCallback } from "react";
import Axios from "axios";
import { API_URL, KEY_ITEMS, KEY_LAST_PAGE } from "../constants";
import ItemList from "./ItemList";
import {
  localStorageGet,
  localStorageSet,
} from "../utils/localstorage";

export default function Home() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMorePages, setHasMorePages] = useState(false);
  const observer = useRef();

  const lastItemRef = useCallback(
    node => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries =>
        entries[0].isIntersecting && hasMorePages
          ? setPage(prevPage => {
              const nextPage = prevPage + 1;
              setPage(nextPage);
              localStorageSet(KEY_LAST_PAGE, nextPage);
            })
          : ""
      );
      if (node) observer.current.observe(node);
    },
    [hasMorePages, loading]
  );

  useEffect(() => {
    const lastPage = localStorageGet(KEY_LAST_PAGE);
    if (lastPage) setPage(lastPage);
    const items = localStorageGet(KEY_ITEMS);
    if (items) {
      setItems(JSON.parse(items));
      return;
    }
  }, []);

  useEffect(() => {
    setLoading(true);

    Axios.get(`${API_URL}?page=${page}`)
      .then(res => {
        const hasMore = res.data?.results?.length > 0;
        setHasMorePages(hasMore);
        if (!hasMore) return;
        setItems(items => {
          const newItems = [
            ...new Set([...items, ...res.data.results]),
          ];
          console.log("SETTING new items", newItems);
          localStorageSet(KEY_ITEMS, JSON.stringify(newItems));
          return newItems;
        });
        setLoading(false);
      })
      .catch(err => console.log("ERROR >>", err));
  }, [page]);

  return (
    <div>
      {/* SEARCH BAR */}
      <input type='text' />
      {/* TITLE */}
      <div className='home-title-wrapper'>
        <p className='content-center m-0 home-title'>
          Find your Oompa Loompa
        </p>
        <p className='content-center m-0 home-subtitle'>
          There are more than 100k
        </p>
      </div>
      {/* ITEMS */}
      <div className='home-list-wrapper'>
        {items.length
          ? items.map(item => (
              <React.Fragment key={item.id}>
                {items.length === item.id + 1 ? (
                  <div ref={lastItemRef}>
                    <ItemList item={item} />
                  </div>
                ) : (
                  <ItemList item={item} />
                )}
              </React.Fragment>
            ))
          : ""}
      </div>
    </div>
  );
}
