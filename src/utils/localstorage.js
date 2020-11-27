import { APP_PREFIX } from "../constants";

const prefixKey = key => `${APP_PREFIX}.${key}`;

export const localStorageGet = key =>
  localStorage.getItem(prefixKey(key));

export const localStorageSet = (key, value) =>
  localStorage.setItem(prefixKey(key), value);
