import { useQuery } from "@tanstack/react-query";
import { publicApi } from "./api";

const getProductList = async () => {
  return await publicApi.get("/products").then((response) => {
    return response.data;
  });
};

const getProductDetails = async (productId: string) => {
  return await publicApi.get(`/products/${productId}`).then((response) => {
    return response.data;
  });
};

const fetchProducts = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProductList(),
  });

  return { products: data, error, isLoading };
};

const fetchProductDetails = ({ productId }: { productId: string }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["products", productId],
    queryFn: () => getProductDetails(productId),
  });

  return { data, error, isLoading };
};

export { fetchProducts, fetchProductDetails };
