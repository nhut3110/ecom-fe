import React, { useContext, useState } from "react";
import QuantityButton from "./QuantityButton";
import { CartContext } from "../context/CartContext";
import { TrashIcon } from "../assets/icons";
import { ProductDetails } from "../constants/data";

const ProductCart = (props: {
  product: ProductDetails;
  quantity: number;
}): React.ReactElement => {
  const { product, quantity } = props;
  const {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    calculateCartValue,
  } = useContext(CartContext);
  const [quantities, setQuantities] = useState<number>(quantity);
  const defaultQuantityChange = 1; // Only increase or decrease 1 unit in cart page

  const handleIncrement = () => {
    setQuantities(quantities + defaultQuantityChange);
    increaseQuantity(defaultQuantityChange, product);
    calculateCartValue(defaultQuantityChange, product);
  };

  const handleDecrement = () => {
    setQuantities((quantities) =>
      quantities - defaultQuantityChange < 0
        ? 0
        : quantities - defaultQuantityChange
    );
    quantities > 0
      ? decreaseQuantity(defaultQuantityChange, product)
      : removeFromCart(product);
    calculateCartValue(-defaultQuantityChange, product);
  };

  const handleRemove = () => {
    removeFromCart(product);
    calculateCartValue(-quantities, product);
  };

  return (
    <div className="h-40 w-full flex gap-10 border border-gray-400 p-3 rounded-xl">
      <img
        src={product.image}
        alt={product.title}
        className="h-4/5 self-center min-w-[90px] object-contain"
      />

      <div className="flex w-full justify-between ">
        <div className="flex flex-col justify-around p-2">
          <p className="text-xs md:text-lg font-semibold">{product.title}</p>
          <p className="text-xs md:text-md font-semibold">
            ${(product.price * quantities).toFixed(2)}
          </p>
          <QuantityButton
            quantity={quantities}
            increment={handleIncrement}
            decrement={handleDecrement}
          />
        </div>

        <img
          src={TrashIcon}
          alt="trash"
          className="w-3 md:w-5 self-start cursor-pointer"
          onClick={handleRemove}
        />
      </div>
    </div>
  );
};

export default ProductCart;
