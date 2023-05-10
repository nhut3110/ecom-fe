import React from "react";
import { ProductDetails } from "../constants/data";

enum SortValue {
  AZ = "A to Z",
  ZA = "Z to A",
  PRICE_ASC = "Low to High",
  PRICE_DESC = "High to Low",
}

export const sortProducts = (
  products: ProductDetails[],
  sortOption: string
) => {
  let sortedProducts = [...products];
  switch (sortOption) {
    case SortValue.PRICE_ASC:
      return sortedProducts.sort((a, b) => a.price - b.price);

    case SortValue.PRICE_DESC:
      return sortedProducts.sort((a, b) => b.price - a.price);

    case SortValue.AZ:
      return sortedProducts.sort((a, b) => a.title.localeCompare(b.title));

    case SortValue.ZA:
      return sortedProducts.sort((a, b) => b.title.localeCompare(a.title));

    default:
      return sortedProducts;
  }
};
