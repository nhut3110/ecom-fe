import { authApi } from "./api";
import { AddOrderType } from "./types.api";

const addOrder = async (data: AddOrderType) => {
  return await authApi.post("/orders", data);
};

export { addOrder };
