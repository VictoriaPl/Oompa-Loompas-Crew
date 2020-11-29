import React from "react";
import { SEARCH_ICON } from "../constants";
import "./SearchBar.css";

export default function SearchBar({ handleChange }) {
  return (
    <div className='search-bar'>
      <input
        type='text'
        placeholder={"Search"}
        className='search-bar-input'
        onChange={e => handleChange(e.target.value)}
      />
      <img
        src={SEARCH_ICON}
        alt={"search-icon"}
        className='search-bar-icon'
      />
    </div>
  );
}
