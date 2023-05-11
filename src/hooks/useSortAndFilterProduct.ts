import { ProductDetails } from "../constants/data";
import { filterProducts } from "../utils/filterProducts";
import { sortProducts } from "../utils/sortProducts";

type SortAndFilterProductType = {
  selectedSort: string;
  selectedFilter: string;
  products: ProductDetails[];
};

export const useSortAndFilterProduct = ({
  selectedSort,
  selectedFilter,
  products,
}: SortAndFilterProductType) => {
  const sortedProducts = selectedSort
    ? sortProducts(products, selectedSort)
    : products;

  const filteredProducts = selectedFilter
    ? filterProducts(sortedProducts, selectedFilter)
    : sortedProducts;

  return {
    sortedProducts,
    filteredProducts,
  };
};
