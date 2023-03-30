import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import QuantityButton from "./QuantityButton";
import { CartContext } from "../context/CartContext";
import { TrashIcon } from "../assets/icons";
import { ProductDetails } from "../constants/data";

const DEFAULT_QUANTITY_CHANGE = 1; // Only increase or decrease 1 unit in cart page

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
  const [isDecreasing, setIsDecreasing] = useState<boolean>(false);

  const handleIncrement = useCallback(() => {
    setQuantities(quantities + DEFAULT_QUANTITY_CHANGE);
    increaseQuantity(DEFAULT_QUANTITY_CHANGE, product);
    calculateCartValue(DEFAULT_QUANTITY_CHANGE, product);
  }, [quantities, product]);

  const [totalPrice] = useMemo(() => {
    const price = (product.price * quantities).toFixed(2);

    return [price];
  }, [quantities]);

  const handleDecrement = useCallback(() => {
    if (quantities - 1 === 0) {
      removeFromCart(product);
    } else {
      setQuantities((quantities) =>
        quantities - DEFAULT_QUANTITY_CHANGE < 0
          ? 0
          : quantities - DEFAULT_QUANTITY_CHANGE
      );
      decreaseQuantity(DEFAULT_QUANTITY_CHANGE, product);
    }

    calculateCartValue(-DEFAULT_QUANTITY_CHANGE, product);
  }, [quantities]);

  const handleRemove = useCallback(() => {
    removeFromCart(product);
    calculateCartValue(-quantities, product);
  }, [product, quantities]);

  return (
    <div className="flex h-40 w-full gap-10 rounded-xl border border-gray-400 p-3">
      <img
        src={product.image}
        alt={product.title}
        className="h-4/5 min-w-[5.625rem] self-center object-contain"
      />

      <div className="flex w-full justify-between ">
        <div className="flex flex-col justify-around p-2">
          <p className="text-xs font-semibold md:text-lg">{product.title}</p>
          <p className="md:text-md text-xs font-semibold">${totalPrice}</p>
          <QuantityButton
            quantity={quantities}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
          />
        </div>

        <img
          src={TrashIcon}
          alt="trash"
          className="w-3 cursor-pointer self-start md:w-5"
          onClick={handleRemove}
        />
      </div>
    </div>
  );
};

export default ProductCart;
