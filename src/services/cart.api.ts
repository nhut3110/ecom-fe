import { useQuery } from "@tanstack/react-query";
import { authApi } from "./api";
import { CartItem } from "./types.api";

const getCart = async () => {
  const { data } = await authApi.get("/carts");

  return data;
};

const addToCart = async (product: CartItem) => {
  const { data } = await authApi.post("/carts", product);

  return data;
};

const updateQuantity = async (productId: string, quantity: number) => {
  const { data } = await authApi.patch(
    `/carts/${productId}?quantity=${quantity}`
  );

  return data;
};

const deleteProductFromCart = async (productId: string) => {
  const { data } = await authApi.delete(`/carts/${productId}`);

  return data;
};

const clearCart = async () => {
  const { data } = await authApi.delete("/carts/clear");

  return data;
};

const fetchCartList = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(),
  });

  return { cart: data, error, isLoading };
};

export {
  getCart,
  addToCart,
  updateQuantity,
  deleteProductFromCart,
  clearCart,
  fetchCartList,
};
