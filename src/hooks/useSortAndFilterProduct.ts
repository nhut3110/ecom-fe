import { ProductDetails } from "../constants/data";

type SortAndFilterProductType = {
  selectedSort: string;
  selectedFilter: string;
  products: ProductDetails[];
};

enum SortValue {
  AZ = "A to Z",
  ZA = "Z to A",
  PRICE_ASC = "Low to High",
  PRICE_DESC = "High to Low",
}

export const useSortAndFilterProduct = ({
  selectedSort,
  selectedFilter,
  products,
}: SortAndFilterProductType) => {
  const sortProducts = (products: ProductDetails[], sortOption: string) => {
    let sortedProducts = [...products];
    switch (sortOption) {
      case SortValue.PRICE_ASC:
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case SortValue.PRICE_DESC:
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case SortValue.AZ:
        sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case SortValue.ZA:
        sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    return sortedProducts;
  };

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const filterProducts = (products: ProductDetails[], filterOption: string) => {
    if (filterOption === "Category") return products;

    return products.filter(
      (product) => capitalizeFirstLetter(product.category) === filterOption
    );
  };

  let sortedProducts = selectedSort
    ? sortProducts(products, selectedSort)
    : products;

  let filteredProducts = selectedFilter
    ? filterProducts(sortedProducts, selectedFilter)
    : sortedProducts;

  return {
    sortProducts,
    capitalizeFirstLetter,
    sortedProducts,
    filteredProducts,
  };
};
