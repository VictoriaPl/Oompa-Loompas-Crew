import React from "react";
import { Link } from "react-router-dom";
import ItemBasicInfo from "./ItemBasicInfo";

export default function Item({ item }) {
  return (
    <Link to={`/${item.id}`}>
      <div className='item-list-img-wrapper'>
        <img src={item.image} alt='item' className='item-list-img' />
      </div>
      <div className={"item-list-info"}>
        <ItemBasicInfo
          name={item.name}
          lastName={item.lastName}
          gender={item.gender}
          profession={item.profession}
        />
      </div>
    </Link>
  );
}
