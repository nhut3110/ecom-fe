import React from "react";
import Carousel from "../components/Carousel";
import Footer from "../components/Footer";
import MailSubscription from "../components/MailSubscription";
import NavBar from "../components/NavBar";
import ProductCard from "../components/ProductCard";
import { testProduct } from "../constants/data";

const Product = () => {
  return (
    <div className="h-screen ">
      <NavBar />
      <Carousel />
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
