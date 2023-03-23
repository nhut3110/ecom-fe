import React, { useState } from "react";
import { TrashIcon } from "../assets/icons";
import { ProductDetails } from "../constants/data";
import QuantityButton from "./QuantityButton";
import SmallButton from "./SmallButton";

const ProductCart = (props: {
  product: ProductDetails;
}): React.ReactElement => {
  const { product } = props;
  const [quantity, setQuantity] = useState<number>(product.quantity || 1);

  return (
    <div className="h-40 w-full flex gap-10 border border-gray-400 p-3 rounded-xl">
      <img
        src={product.image}
        alt={product.title}
        className="h-4/5 self-center"
      />

      <div className="flex w-full justify-between ">
        <div className="flex flex-col justify-around p-2">
          <p className="text-xs md:text-lg font-semibold">{product.title}</p>
          <p className="text-xs md:text-md font-semibold">
            ${(product.price * quantity).toFixed(2)}
          </p>
          <QuantityButton quantity={quantity} setQuantity={setQuantity} />
        </div>

        <img src={TrashIcon} alt="trash" className="w-3 md:w-5 self-start" />
      </div>
    </div>
  );
};

export default ProductCart;
