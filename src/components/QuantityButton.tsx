import React from "react";

type QuantityProps = {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
};
const QuantityButton = (props: QuantityProps) => {
  const { quantity, setQuantity } = props;
  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };
  const handleDecrement = () => {
    setQuantity((quantity) => (quantity - 1 < 0 ? 0 : quantity - 1));
  };
  return (
    <div className="flex items-center justify-around rounded-full p-2 gap-3 max-w-[100px]">
      <button
        onClick={handleDecrement}
        className="text-2xl font-bold text-center select-none"
      >
        -
      </button>
      <p className="w-6 h-6 text-xs md:text-lg font-medium flex justify-center items-center select-none md:w-8 md:h-8 rounded-full bg-slate-200">
        {quantity}
      </p>
      <button
        onClick={handleIncrement}
        className="text-2xl font-bold text-center select-none"
      >
        +
      </button>
    </div>
  );
};

export default QuantityButton;
