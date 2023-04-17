import { OrderType } from "../constants/data";
import { CartStateType } from "../context/CartContext";
import { FavoriteStateType } from "../context/FavoriteContext";

type LocalStorageProps = {
  key: string;
  value?: OrderType[] | FavoriteStateType;
};

const initLocalStorage = (key: string) => {
  localStorage.setItem(key, "{}");
};

const getLocalStorageValue = (data: LocalStorageProps) => {
  const value = localStorage.getItem(data.key);
  if (value === null) initLocalStorage(data.key);
  return JSON.parse(value ?? "");
};

const updateLocalStorageValue = (data: LocalStorageProps) => {
  const value = JSON.stringify(data.value);
  localStorage.setItem(data.key, value);
};

const removeLocalStorageValue = (data: LocalStorageProps) => {
  localStorage.removeItem(data.key);
};

const clearAllLocalStorageValues = () => {
  localStorage.clear();
};

export {
  initLocalStorage,
  getLocalStorageValue,
  updateLocalStorageValue,
  removeLocalStorageValue,
  clearAllLocalStorageValues,
};
