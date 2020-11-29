import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL, KEY_ITEM_ID } from "../constants";
import parse from "react-html-parser";
import { localStorageGet } from "../utils/localstorage";
import ItemBasicInfo from "../components/ItemBasicInfo";
import "./ItemDetail.css";
import { fetchDetail } from "../helpers/FetchApiData";
import Skeleton from "react-loading-skeleton";

export default function ItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState({ id });

  useEffect(() => {
    let itemDetail = localStorageGet(KEY_ITEM_ID(id));
    if (itemDetail) {
      itemDetail = JSON.parse(itemDetail);
      setItem(itemDetail);
      return;
    }
    // If the item is not in the localstorage we fetch it from the API
    fetchDetail(`${API_URL}/${id}`, id)
      .then(detail => setItem(detail))
      .catch(err => err);
  }, [id]);

  return (
    <div className='item-detail-wrapper'>
      <div className='item-detail-img-wrapper'>
        {(item.image && (
          <img
            src={item.image}
            alt='item'
            className='item-detail-img'
          />
        )) || <Skeleton height={100} />}
      </div>
      <div className='item-detail-info'>
        <ItemBasicInfo
          name={item.name}
          gender={item.gender}
          profession={item.profession}
        />
        <div className='item-detail-description'>
          {parse(item.description)}
        </div>
      </div>
    </div>
  );
}
