import { useQuery } from "@tanstack/react-query";
import { publicApi } from "./api";
import { CategoryType } from "./types.api";

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

const getCategoryList = async () => {
  return await publicApi.get("/categories").then((response) => {
    return response.data as CategoryType[];
  });
};

const getCategoryById = async (categoryId: string) => {
  return await publicApi.get(`/categories/${categoryId}`).then((response) => {
    return response.data as CategoryType;
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

const fetchCategoryList = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategoryList(),
  });

  return { categories: data, error, isLoading };
};

const fetchCategoryById = ({ categoryId }: { categoryId: string }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["categories", categoryId],
    queryFn: () => getCategoryById(categoryId),
  });

  return { data, error, isLoading };
};

export {
  fetchProducts,
  fetchProductDetails,
  fetchCategoryList,
  fetchCategoryById,
  getProductList,
  getProductDetails,
  getCategoryList,
  getCategoryById,
};
