import React from "react";
import { Link } from "react-router-dom";

export default function ItemList({ item }) {
  return (
    <div className='item-list'>
      <Link to={`/${item.id}`}>
        <img
          src={item.image}
          alt={"item"}
          className={"item-list-img"}
        />
      </Link>
    </div>
  );
}
