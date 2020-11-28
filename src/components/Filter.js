import { SEARCH_KEYS } from "../constants";

// Filters an array by the given search value and keys of the array object
export const filterByValue = (array, searchString) =>
  array.filter(item =>
    SEARCH_KEYS.some(k =>
      item[k].toLowerCase().includes(searchString.toLowerCase())
    )
  );
