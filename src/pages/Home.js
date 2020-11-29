import React, { useContext, useState } from "react";
import { filterByValue } from "../components/Filter";
import { ItemsList } from "../components/ItemsList";
import SearchBar from "../components/SearchBar";
import { AppContext, getItems } from "../State";
import "./Home.css";

export default function Home() {
  const { state } = useContext(AppContext);
  const [searchParam, setSearchParam] = useState("");
  const items = getItems(state);

  const filteredItems = searchParam
    ? filterByValue(items, searchParam)
    : items;
  return (
    <div className='home-wrapper'>
      {/* SEARCH BAR */}
      <div className='home-search-bar-wrapper'>
        <SearchBar handleChange={setSearchParam} />
      </div>

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
      <ItemsList items={filteredItems} />
    </div>
  );
}
