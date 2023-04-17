import { useParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import OpacityMotionWrapper from "../components/Animation/OpacityMotionWrapper";
import SlideDownDisappearWrapper from "../components/Animation/SlideDownDisappearWrapper";
import DotsLoading from "../components/Animation/DotsLoading";
import QuantityButton from "../components/QuantityButton";
import RatingStar from "../components/RatingStar";
import SmallButton from "../components/SmallButton";
import { fetchProductDetails } from "../services/api";
import { GoodsIcon, TruckIcon } from "../assets/icons";
import { NotificationContext } from "../context/NotificationContext";
import { CartContext } from "../context/CartContext";

const DEFAULT_QUANTITY_CHANGE = 1; // Only increase or decrease 1 when click

const ProductDetail = (): React.ReactElement => {
  const { productId = "" } = useParams();
  const { data, isLoading } = fetchProductDetails({ productId });

  const { notify } = useContext(NotificationContext);
  const { addToCart, calculateCartValue } = useContext(CartContext);
  const [quantity, setQuantity] = useState<number>(1);

  const handleIncrement = () => {
    setQuantity((quantity) => quantity + DEFAULT_QUANTITY_CHANGE);
  };

  const handleDecrement = () => {
    setQuantity((preQuantity) => {
      if (preQuantity <= 1) return 1;

      return --preQuantity;
    });
  };

  const handleAddToCart = () => {
    addToCart(quantity, data);
    calculateCartValue(quantity, data);
    notify({
      content: `Successfully add ${data.title} to cart`,
      type: "success",
      open: true,
      id: crypto.randomUUID(),
    });
  };

  return (
    <>
      {isLoading ? (
        <AnimatePresence>
          <SlideDownDisappearWrapper>
            <div className="flex h-screen w-full items-center justify-center">
              <DotsLoading />
            </div>
          </SlideDownDisappearWrapper>
        </AnimatePresence>
      ) : (
        <OpacityMotionWrapper>
          <div className="my-10 flex w-full flex-col items-center justify-center gap-5 md:flex-row">
            <div className="flex w-full items-center justify-center md:w-1/2">
              <img
                src={data.image}
                alt="product-image"
                className="w-1/2 object-contain"
              />
            </div>

            <div className="mx-5 flex max-w-[90%] flex-col items-start gap-2 md:ml-0 md:w-2/5">
              <p className="text-xl font-bold md:w-3/4 md:text-2xl">
                {data.title}
              </p>

              <div className="flex items-center gap-1 px-1">
                <RatingStar rating={data.rating.rate} />
                <p className="text-sm text-gray-500">({data.rating.count})</p>
              </div>

              <div className="md:w-3/4">
                <hr className="my-5 h-px border-0 bg-gray-200" />

                <p className="text-2xl font-semibold">
                  ${data.price.toFixed(2)} or {(data.price / 12).toFixed(2)}
                  /month
                </p>

                <p className="my-3 w-full text-xs text-gray-500">
                  Suggested payments with 6 or 12 months special financing
                </p>

                <hr className="my-2 h-px border-0 bg-gray-200 md:my-5" />
              </div>
              <div className="mx-5 scale-150 md:mx-0 md:scale-100">
                <QuantityButton
                  quantity={quantity}
                  onIncrement={handleIncrement}
                  onDecrement={handleDecrement}
                />
              </div>

              <div className="my-2 flex md:my-5">
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

          <div className="mx-10 md:mx-20">
            <p className="text-2xl font-semibold md:text-3xl">
              About the Product
            </p>
            <hr className="my-3 h-px border-0 bg-gray-200" />
            <p className="text-justify">{data.description}</p>
            <hr className="my-3 h-px border-0 bg-gray-200" />
          </div>
        </OpacityMotionWrapper>
      )}
    </>
  );
};

export default ProductDetail;
