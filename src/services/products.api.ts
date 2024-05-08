import { useQuery } from "@tanstack/react-query";
import { authApi, publicApi } from "./api";
import { FindProductType } from "./types.api";
import { PaginatedResponse } from "./types.api";
import { Category } from "../constants";

const getProductList = async (params: FindProductType) => {
  const { data } = await publicApi.get("/products", { params });

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

const getCategoryListWithCount = async () => {
  const { data } = await publicApi.get("/categories/count-product");

  return data;
};

const getFavorites = async (params: FindProductType) => {
  const { data } = await authApi.get("/my-favorites", { params });

  return data;
};

const checkFavorite = async (productId: string) => {
  const { data } = await authApi.get(`/my-favorites/check/${productId}`);

  return data;
};

const addFavorite = async (productId: string) => {
  return await authApi.post("/my-favorites", { productId });
};

const removeFavorite = async (productId: string) => {
  return await authApi.delete(`/my-favorites/${productId}`);
};

const getCategoryById = async (categoryId: string) => {
  const { data } = await publicApi.get(`/categories/${categoryId}`);

  return data;
};

const fetchProducts = (params: FindProductType) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProductList(params),
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

const fetchCategoryListWithCount = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["categories-count-product"],
    queryFn: () => getCategoryListWithCount(),
  });

  return { categories: data as Category[], error, isLoading };
};

const fetchCategoryById = ({ categoryId }: { categoryId: string }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["categories", categoryId],
    queryFn: () => getCategoryById(categoryId),
  });

  return { data, error, isLoading };
};

const fetchFavoriteList = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["favorites"],
    queryFn: () => getFavorites({}),
  });

  return { favorites: data as PaginatedResponse, error, isLoading };
};

export {
  fetchProducts,
  fetchProductDetails,
  fetchCategoryList,
  fetchCategoryById,
  fetchCategoryListWithCount,
  getProductList,
  getProductDetails,
  getCategoryList,
  getCategoryById,
  getFavorites,
  addFavorite,
  removeFavorite,
  fetchFavoriteList,
  checkFavorite,
  getCategoryListWithCount,
};
