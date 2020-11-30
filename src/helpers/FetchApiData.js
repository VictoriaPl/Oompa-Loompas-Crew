import Axios from "axios";
import { KEY_ITEM_ID } from "../constants";
import { localStorageSet } from "../utils/localstorage";

export const fetchItems = url =>
  Axios.get(url)
    .then(response => {
      const results = response.data?.results;
      const items = results.map(i => {
        return {
          id: i.id,
          name: i.first_name,
          lastName: i.last_name,
          image: i.image,
          gender: i.gender,
          profession: i.profession,
        };
      });
      return items;
    })
    .catch(err => err);

export const fetchDetail = (url, id) =>
  Axios.get(url)
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
      return { id, ...detail };
    })
    .catch(err => err);
