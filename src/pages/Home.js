import React, { useContext, useState } from "react";
import { filterByValue } from "../components/Filter";
import { ItemsList } from "../components/ItemsList";
import { AppContext, getItems } from "../State";
// import "./Home.css";

export default function Home() {
  const { state } = useContext(AppContext);
  const [searchParam, setSearchParam] = useState("");
  const items = getItems(state);

  const filteredItems = searchParam
    ? filterByValue(items, searchParam)
    : items;
  return (
    <div>
      {/* SEARCH BAR */}
      <input
        type='text'
        placeholder={"search"}
        onChange={e => setSearchParam(e.target.value)}
      />
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
