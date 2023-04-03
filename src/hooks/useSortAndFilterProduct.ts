import { ProductDetails } from "../constants/data";

type SortAndFilterProductProps = {
  selectedSort: string;
  selectedFilter: string;
  products: ProductDetails[];
};

enum SortValue {
  AZ = "From A to Z",
  ZA = "From Z to A",
  PRICE_ASC = "From Low to High",
  PRICE_DESC = "From High to Low",
}

export const useSortAndFilterProduct = ({
  selectedSort,
  selectedFilter,
  products,
}: SortAndFilterProductProps) => {
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
