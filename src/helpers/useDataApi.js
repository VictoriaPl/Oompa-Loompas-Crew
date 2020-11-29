import Axios from "axios";
import { useContext } from "react";
import { AppContext, setError, setItems } from "../State";

export const useDataApi = () => {
  const { dispatch } = useContext(AppContext);

  const fetchItems = (url, page) => {
    Axios.get(url)
      .then(response => {
        const results = response.data?.results;
        const items = results.map(i => {
          return {
            id: i.id,
            name: i.first_name,
            image: i.image,
            gender: i.gender,
            profession: i.profession,
          };
        });
        const hasMore = Boolean(items.length);
        dispatch(setItems(items, hasMore, page));
      })
      .catch(err => dispatch(setError(err)));
  };

  return { fetchItems };
};
