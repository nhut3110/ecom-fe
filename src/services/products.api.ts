import { useQuery } from "@tanstack/react-query";
import { publicApi } from "./api";
import { FindProductType } from "./types.api";

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
