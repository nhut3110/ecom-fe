import { ProductDetails } from "../constants";

enum SortValue {
  AZ = "A to Z",
  ZA = "Z to A",
  PRICE_ASC = "Low to High",
  PRICE_DESC = "High to Low",
}

const sortByPriceAsc = (a: ProductDetails, b: ProductDetails) =>
  a.price - b.price;

const sortByPriceDesc = (a: ProductDetails, b: ProductDetails) =>
  b.price - a.price;

const sortByTitleAsc = (a: ProductDetails, b: ProductDetails) =>
  a.title.localeCompare(b.title);

const sortByTitleDesc = (a: ProductDetails, b: ProductDetails) =>
  b.title.localeCompare(a.title);

const sortFunctions: Record<
  string,
  (a: ProductDetails, b: ProductDetails) => number
> = {
  [SortValue.PRICE_ASC]: sortByPriceAsc,
  [SortValue.PRICE_DESC]: sortByPriceDesc,
  [SortValue.AZ]: sortByTitleAsc,
  [SortValue.ZA]: sortByTitleDesc,
};

export const sortProducts = (
  products: ProductDetails[],
  sortOption: string
) => {
  const sortFunction = sortFunctions[sortOption];
  return sortFunction ? [...products].sort(sortFunction) : products;
};
