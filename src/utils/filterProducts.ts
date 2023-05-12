import { ProductDetails } from "../constants/data";
import { capitalizeFirstLetter } from "./capitalizeFirstLetter";

enum FilterValue {
  DEFAULT = "Category",
}

export const filterProducts = (
  products: ProductDetails[],
  filterOption: string
) => {
  if (filterOption === FilterValue.DEFAULT) return products;

  return products.filter(
    (product) => capitalizeFirstLetter(product.category) === filterOption
  );
};
