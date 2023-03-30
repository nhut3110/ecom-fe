import React, { useCallback, useContext, useMemo } from "react";
import ProductCart from "../components/ProductCart";
import { CartContext } from "../context/CartContext";
import map from "lodash/map";

export const renderCartList = () => {
  const { cartState } = useContext(CartContext);

  return map(cartState.cartList).map((data, index) => (
    <div key={index}>
      <ProductCart product={data.product} quantity={data.quantity} />
      <hr className="my-4 h-px border-0 bg-gray-200"></hr>
    </div>
  ));
};
