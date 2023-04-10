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
    setQuantity((quantity) => quantity + defaultQuantityChange);
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
      <div className="my-10 flex w-full flex-col items-center justify-center gap-5 md:flex-row">
        <div className="flex w-full items-center justify-center md:w-1/2">
          <img
            src={testProduct[1].image}
            alt="product-image"
            className="w-1/2 object-contain"
          />
        </div>

        <div className="mx-5 flex max-w-[90%] flex-col items-start gap-2 md:ml-0 md:w-2/5">
          <p className="text-xl font-bold md:w-3/4 md:text-2xl">
            {testProduct[1].title}
          </p>

          <div className="flex items-center gap-1 px-1">
            <RatingStar rating={testProduct[1].rating.rate} />
            <p className="text-sm text-gray-500">
              ({testProduct[1].rating.count})
            </p>
          </div>

          <div className="md:w-3/4">
            <hr className="my-5 h-px border-0 bg-gray-200" />

            <p className="text-2xl font-semibold">
              ${testProduct[1].price.toFixed(2)} or{" "}
              {(testProduct[1].price / 12).toFixed(2)}
              /month
            </p>

            <p className="my-3 w-full text-xs text-gray-500">
              Suggested payments with 6 or 12 months special financing
            </p>

            <hr className="my-5 h-px border-0 bg-gray-200" />
          </div>

          <QuantityButton
            quantity={quantity}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
          />

          <div className="my-5 flex">
            <SmallButton name="Add to Cart" onClick={handleAddToCart} />
          </div>

          <div>
            <div className="flex items-start gap-2 rounded-t-lg border  border-gray-300 p-4">
              <img src={TruckIcon} alt="truck" className="w-5" />
              <div>
                <p className="text-md font-bold">Free Delivery</p>
                <p className="mt-1 w-full text-xs text-gray-500">
                  Just Enter your Postal code for Delivery Availability
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2 rounded-b-lg border  border-gray-300 p-4">
              <img src={GoodsIcon} alt="truck" className="w-5" />
              <div>
                <p className="text-md font-bold">Return Delivery</p>
                <p className="mt-1 w-full text-xs text-gray-500">
                  Free 30 days Delivery Returns
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Description */}
      <div className="mx-10 md:mx-20">
        <p className="text-2xl font-semibold md:text-3xl">About the Product</p>
        <hr className="my-3 h-px border-0 bg-gray-200" />
        <p className="text-justify">{testProduct[1].description}</p>
        <hr className="my-3 h-px border-0 bg-gray-200" />
      </div>
    </div>
  );
};

export default ProductDetail;
