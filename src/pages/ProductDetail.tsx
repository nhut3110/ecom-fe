import React, { useContext, useState } from "react";
import QuantityButton from "../components/QuantityButton";
import RatingStar from "../components/RatingStar";
import SmallButton from "../components/SmallButton";
import { ProductDetails, testProduct } from "../constants/data";
import { GoodsIcon, TruckIcon } from "../assets/icons";
import { CartContext } from "../context/CartContext";

const ProductDetail = (): React.ReactElement => {
  const { addToCart, calculateCartValue } = useContext(CartContext);
  const [quantity, setQuantity] = useState<number>(1);
  const defaultQuantityChange = 1; // Only increase or decrease 1 when click

  const handleIncrement = () => {
    setQuantity(quantity + defaultQuantityChange);
  };

  const handleDecrement = () => {
    setQuantity((quantity) =>
      quantity - defaultQuantityChange < 0
        ? 0
        : quantity - defaultQuantityChange
    );
  };

  const handleAddToCart = () => {
    addToCart(quantity, testProduct[1]);
    calculateCartValue(quantity, testProduct[1]);
  };

  return (
    <div>
      {/* Product Detail */}
      <div className="w-full my-10 flex flex-col md:flex-row justify-center items-center gap-5">
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <img
            src={testProduct[1].image}
            alt="product-image"
            className="w-1/2 object-contain"
          />
        </div>

        <div className="flex flex-col max-w-[90%] md:w-2/5 gap-2 items-start mx-5 md:ml-0">
          <p className="text-xl md:text-2xl font-bold md:w-3/4">
            {testProduct[1].title}
          </p>

          <div className="flex items-center gap-1 px-1">
            <RatingStar rating={testProduct[1].rating.rate} />
            <p className="text-sm text-gray-500">
              ({testProduct[1].rating.count})
            </p>
          </div>

          <div className="md:w-3/4">
            <hr className="h-px my-5 bg-gray-200 border-0"></hr>

            <p className="text-2xl font-semibold">
              ${testProduct[1].price.toFixed(2)} or{" "}
              {(testProduct[1].price / 12).toFixed(2)}
              /month
            </p>

            <p className="text-xs w-full text-gray-500 my-3">
              Suggested payments with 6 or 12 months special financing
            </p>

            <hr className="h-px my-5 bg-gray-200 border-0"></hr>
          </div>

          <QuantityButton
            quantity={quantity}
            increment={handleIncrement}
            decrement={handleDecrement}
          />

          <div className="flex my-5">
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
        <p className="text-justify">{testProduct[1].description}</p>
        <hr className="h-px my-3 bg-gray-200 border-0"></hr>
      </div>
    </div>
  );
};

export default ProductDetail;
