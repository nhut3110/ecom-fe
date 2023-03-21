import React from "react";
import Carousel from "../components/Carousel";
import Footer from "../components/Footer";
import MailSubscription from "../components/MailSubscription";
import NavBar from "../components/NavBar";
import ProductCard from "../components/ProductCard";
import SelectMenu from "../components/SelectMenu";
import {
  SortCategoryOptions,
  SortNameOptions,
  SortPriceOptions,
  testProduct,
} from "../constants/data";

const Product = () => {
  return (
    <div className="h-screen ">
      <NavBar />

      <Carousel />

      {/* Sort Option List */}
      <div className="md:flex justify-end m-10 gap-5 grid grid-cols-2">
        <SelectMenu options={SortPriceOptions} defaultOption="Price" />
        <SelectMenu options={SortNameOptions} defaultOption="Name" />
        <SelectMenu options={SortCategoryOptions} defaultOption="Category" />
      </div>

      {/* Product List */}
      <div className="mt-10 grid w-auto grid-cols-1 justify-items-center gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-fluid">
        <ProductCard product={testProduct} />
        <ProductCard product={testProduct} />
        <ProductCard product={testProduct} />
        <ProductCard product={testProduct} />
        <ProductCard product={testProduct} />
        <ProductCard product={testProduct} />
        <ProductCard product={testProduct} />
      </div>

      <MailSubscription />

      <Footer />
    </div>
  );
};

export default Product;
