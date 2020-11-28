import React from "react";
import { ItemsList } from "../components/ItemsList";
// import "./Home.css";

export default function Home() {
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
      <ItemsList />
    </div>
  );
}
