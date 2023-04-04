import React from "react";
import Carousel from "../components/Carousel";
import ProductCard from "../components/ProductCard";
import SelectMenu from "../components/SelectMenu";
import {
  sortCategoryOptions,
  sortNameOptions,
  sortPriceOptions,
  testProduct,
} from "../constants/data";

const Product = (): React.ReactElement => {
  return (
    <div className=" ">
      <Carousel />

      {/* Sort Option List */}
      <div className="md:flex justify-end m-10 gap-5 grid grid-cols-2">
        <SelectMenu options={sortPriceOptions} defaultOption="Price" />
        <SelectMenu options={sortNameOptions} defaultOption="Name" />
        <SelectMenu options={sortCategoryOptions} defaultOption="Category" />
      </div>

      {/* Product List */}
      <div className="mt-10 grid w-auto grid-cols-1 justify-items-center gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-fluid">
        {testProduct.map((product, index) => (
          <ProductCard product={product} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Product;
