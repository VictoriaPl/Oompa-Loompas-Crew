import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL, KEY_ITEM_ID } from "../constants";
import { AppContext, setError } from "../State";
import parse from "react-html-parser";
import {
  localStorageGet,
  localStorageSet,
} from "../utils/localstorage";
import ItemBasicInfo from "../components/ItemBasicInfo";
import "./ItemDetail.css";

export default function ItemDetail() {
  const { dispatch } = useContext(AppContext);
  const { id } = useParams();
  const [item, setItem] = useState({ id });

  useEffect(() => {
    let itemDetail = localStorageGet(KEY_ITEM_ID(id));
    if (itemDetail) {
      itemDetail = JSON.parse(itemDetail);
      setItem(itemDetail);
      return;
    }

    Axios.get(`${API_URL}/${id}`)
      .then(({ data }) => {
        const detail = {
          id: id,
          name: data.first_name,
          lastName: data.last_name,
          image: data.image,
          gender: data.gender,
          profession: data.profession,
          description: data.description,
        };

        localStorageSet(KEY_ITEM_ID(id), JSON.stringify(detail));
        setItem({ id, ...detail });
      })
      .catch(err => dispatch(setError(err)));
  }, [id, dispatch]);

  return (
    <div className='item-detail-wrapper'>
      <div className='item-detail-img-wrapper'>
        <img
          alt='itemDetail'
          src={item.image}
          className='item-detail-img'
        />
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
