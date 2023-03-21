import React, { useState } from "react";
import { GoodsIcon, TruckIcon } from "../assets/icons/icons";
import Footer from "../components/Footer";
import MailSubscription from "../components/MailSubscription";
import NavBar from "../components/NavBar";
import QuantityButton from "../components/QuantityButton";
import RatingStar from "../components/RatingStar";
import SmallButton from "../components/SmallButton";
import { ProductDetail, testProduct } from "../constants/data";

const ProductDetail = () => {
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddToCart = () => {
    const addedProduct: ProductDetail = { ...testProduct, quantity: quantity };
    console.log(addedProduct);
  };

  return (
    <div>
      <NavBar />

      {/* Product Detail */}
      <div className="w-full my-10 flex flex-col md:flex-row justify-center items-center gap-5">
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <img
            src={testProduct.image}
            alt="product-image"
            className="w-1/2 object-contain"
          />
        </div>

        <div className="flex flex-col max-w-[90%] md:w-2/5 gap-2 items-start mx-5 md:ml-0">
          <p className="text-xl md:text-2xl font-bold md:w-3/4">
            {testProduct.title}
          </p>

          <div className="flex items-center gap-1 px-1">
            <RatingStar rating={testProduct.rating.rate} />
            <p className="text-sm text-gray-500">
              ({testProduct.rating.count})
            </p>
          </div>

          <div className="md:w-3/4">
            <hr className="h-px my-5 bg-gray-200 border-0"></hr>

            <p className="text-2xl font-semibold">
              ${testProduct.price} or {(testProduct.price / 12).toFixed(2)}
              /month
            </p>

            <p className="text-xs w-full text-gray-500 my-3">
              Suggested payments with 6 or 12 months special financing
            </p>

            <hr className="h-px my-5 bg-gray-200 border-0"></hr>
          </div>

          <QuantityButton quantity={quantity} setQuantity={setQuantity} />

          <div className="flex my-5">
            <SmallButton name="Buy Now" />
            <SmallButton name="Add to Cart" onClick={handleAddToCart} />
          </div>

          <div>
            <div className="flex gap-2 items-start border border-gray-300  p-4 rounded-t-lg">
              <img src={TruckIcon} alt="truck" className="w-5" />
              <div>
                <p className="text-md font-bold">Free Delivery</p>
                <p className="text-xs w-full text-gray-500 mt-1">
                  Just Enter your Postal code for Delivery Availability
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-start border border-gray-300  p-4 rounded-b-lg">
              <img src={GoodsIcon} alt="truck" className="w-5" />
              <div>
                <p className="text-md font-bold">Return Delivery</p>
                <p className="text-xs w-full text-gray-500 mt-1">
                  Free 30 days Delivery Returns
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Description */}
      <div className="mx-10 md:mx-20">
        <p className="text-2xl md:text-3xl font-semibold">About the Product</p>
        <hr className="h-px my-3 bg-gray-200 border-0"></hr>
        <p className="text-justify">{testProduct.description}</p>
        <hr className="h-px my-3 bg-gray-200 border-0"></hr>
      </div>

      <MailSubscription />

      <Footer />
    </div>
  );
};

export default ProductDetail;
