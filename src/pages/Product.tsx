import React from "react";
import Carousel from "../components/Carousel";
import ProductCard from "../components/ProductCard";
import { testProduct } from "../constants/data";
import SelectSortMenu from "../utils/SelectSortMenu";

const Product = (): React.ReactElement => {
  return (
    <div className=" ">
      <Carousel />

      {/* Sort Option List */}
      <div className="m-10 grid grid-cols-2 justify-end gap-5 md:flex">
        {SelectSortMenu()}
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
