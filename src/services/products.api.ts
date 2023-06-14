import { useQuery } from "@tanstack/react-query";
import { publicApi } from "./api";
import { CategoryType } from "./types.api";

const getProductList = async () => {
  const { data } = await publicApi.get("/products");

  return data;
};

const getProductDetails = async (productId: string) => {
  const { data } = await publicApi.get(`/products/${productId}`);

  return data;
};

const getCategoryList = async () => {
  const { data } = await publicApi.get("/categories");

  return data;
};

const getCategoryById = async (categoryId: string) => {
  const { data } = await publicApi.get(`/categories/${categoryId}`);

  return data;
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
