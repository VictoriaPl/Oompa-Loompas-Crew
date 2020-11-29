import React from "react";
import { Link } from "react-router-dom";
import ItemBasicInfo from "./ItemBasicInfo";

export default function Item({ item }) {
  return (
    <div className='item-list'>
      <Link to={`/${item.id}`}>
        <div className='item-list-img-wrapper'>
          <img
            src={item.image}
            alt={"item"}
            className={"item-list-img"}
          />
        </div>
        <div className={"item-list-info"}>
          <ItemBasicInfo
            name={item.name}
            gender={item.gender}
            profession={item.profession}
          />
        </div>
      </Link>
    </div>
  );
}
