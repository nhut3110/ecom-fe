import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const api = axios.create({
  baseURL: "https://fakestoreapi.com/",
});

api.interceptors.response.use((response) => {
  return response;
});

const FetchProducts = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      api.get("/products").then((response) => {
        return response.data;
      }),
  });
  return { products: data, error, isLoading };
};

const FetchProductDetails = ({ productId }: { productId: string }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["products", productId],
    queryFn: () =>
      api.get(`/products/${productId}`).then((response) => {
        return response.data;
      }),
  });
  return { data, error, isLoading };
};

export { FetchProducts, FetchProductDetails };
