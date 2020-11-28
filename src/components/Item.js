import React from "react";
import { Link } from "react-router-dom";

export default function Item({ item }) {
  return (
    <div className='item-list'>
      <Link to={`/${item.id}`}>
        <img
          src={item.image}
          alt={"item"}
          className={"item-list-img"}
        />
        <p>{item.name}</p>
        <p>{item.gender}</p>
        <p>{item.profession}</p>
      </Link>
    </div>
  );
}
