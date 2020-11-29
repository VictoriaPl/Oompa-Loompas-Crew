import React, { useContext, useState } from "react";
import { filterByValue } from "../components/Filter";
import InfoMessage from "../components/InfoMessage";
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
      {filteredItems.length ? (
        <ItemsList items={filteredItems} />
      ) : !filteredItems.length && searchParam ? (
        <InfoMessage
          title={`No Oompa Loompas found with name or profession "${searchParam}"`}
          extraInfo={"Remember to check your spelling and try again!"}
        />
      ) : (
        <InfoMessage
          title={"We could not get your Oompa Loompas!"}
          extraInfo={
            "Try again later or check your connection to internet"
          }
        />
      )}
    </div>
  );
}
