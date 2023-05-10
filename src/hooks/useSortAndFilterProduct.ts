import { ProductDetails } from "../constants/data";
import { sortProducts } from "../utils/SortProducts";

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
  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const filterProducts = (products: ProductDetails[], filterOption: string) => {
    if (filterOption === "Category") return products;

    return products.filter(
      (product) => capitalizeFirstLetter(product.category) === filterOption
    );
  };

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
