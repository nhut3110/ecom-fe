import map from "lodash/map";
import { AnimatePresence } from "framer-motion";
import React, { useContext } from "react";
import OpacityMotionWrapper from "../Animation/OpacityMotionWrapper";
import SlideDownDisappearWrapper from "../Animation/SlideDownDisappearWrapper";
import ProductCart from "../Product/ProductCart";
import { CartContext } from "../../context/CartContext";

const CartList = (): React.ReactElement => {
  const { cartState } = useContext(CartContext);

  return (
    <div className="z-50">
      <OpacityMotionWrapper>
        <AnimatePresence>
          {map(cartState.cartList).map((data) => (
            <SlideDownDisappearWrapper key={data.product.id}>
              <ProductCart
                product={data.product}
                quantity={data.quantity}
                key={data.product.id}
              />
              <hr className="my-4 h-px border-0 bg-gray-200" />
            </SlideDownDisappearWrapper>
          ))}
        </AnimatePresence>
      </OpacityMotionWrapper>
    </div>
  );
};

export default CartList;
