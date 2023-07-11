import { useQuery } from "@tanstack/react-query";
import { authApi } from "./api";
import { AddOrderType, Order } from "./types.api";
import { OrderStatus } from "../constants";

const addOrder = async (data: AddOrderType) => {
  return await authApi.post("/orders", data);
};

const getOrders = async () => {
  const { data } = await authApi.get("/orders");

  return data as Order[];
};

const getOrder = async (id: String) => {
  const { data } = await authApi.get(`/orders/${id}`);

  return data as Order;
};

const cancelOrder = async (id: string) => {
  const { data } = await authApi.patch(`/orders/${id}/status`, {
    status: OrderStatus.CANCELED,
  });

  return data as Order;
};

const fetchOrderList = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrders(),
  });

  return { orders: data, error, isLoading };
};

const fetchSingleOrder = (id: string) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["orders", id],
    queryFn: () => getOrder(id),
  });

  return { order: data, error, isLoading };
};

export {
  addOrder,
  getOrders,
  fetchOrderList,
  getOrder,
  fetchSingleOrder,
  cancelOrder,
};
