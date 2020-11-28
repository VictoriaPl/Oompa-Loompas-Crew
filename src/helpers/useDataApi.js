import Axios from "axios";
import { useContext } from "react";
import { AppContext, setError, setItems } from "../State";

export const useDataApi = () => {
  const { dispatch } = useContext(AppContext);

  const fetchItems = (url, page) => {
    Axios.get(url)
      .then(response =>
        dispatch(
          setItems(
            response.data.results,
            Boolean(response.data?.results?.length),
            page
          )
        )
      )
      .catch(err => dispatch(setError(err)));
  };

  return { fetchItems };
};
