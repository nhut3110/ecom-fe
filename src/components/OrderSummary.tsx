import React, { useContext, useMemo } from "react";
import { CartContext } from "../context/CartContext";

const OrderSummary = (): React.ReactElement => {
  const { cartState, removeAllFromCart } = useContext(CartContext);

  const cartValue = useMemo(() => {
    if (cartState.cartValue) return cartState.cartValue.toFixed(2);
    return "0.00";
  }, [cartState.cartValue]);

  return (
    <div className="mb-4 flex min-w-[18rem] flex-col gap-2 rounded-lg border border-gray-400 p-5 shadow-lg">
      <p className="text-lg font-bold">Order Summary</p>
      <div className="flex w-full justify-between">
        <p className="text-lg font-medium text-gray-400">Subtotal</p>
        <p className="text-xl font-semibold">${cartValue}</p>
      </div>
      <div className="flex w-full justify-between">
        <p className="text-lg font-medium text-gray-400">Discount</p>
        <p className="text-xl font-semibold">-$0.00</p>
      </div>
      <hr className="my-4 h-px border-0 bg-gray-200"></hr>
      <div className="flex w-full justify-between">
        <p className="text-xl font-bold">Total</p>
        <p className="text-2xl font-bold">${cartValue}</p>
      </div>
    </div>
  );
};

export default OrderSummary;
