import React from "react";

type QuantityProps = {
  quantity: number;
  increment: () => void;
  decrement: () => void;
};
const QuantityButton = (props: QuantityProps): React.ReactElement => {
  const { quantity, increment, decrement } = props;

  return (
    <div className="flex items-center justify-around rounded-full p-2 gap-3 max-w-[100px]">
      <button
        onClick={decrement}
        className="text-2xl font-bold text-center select-none"
      >
        -
      </button>
      <p className="w-6 h-6 text-xs md:text-lg font-medium flex justify-center items-center select-none md:w-8 md:h-8 rounded-full bg-slate-200">
        {quantity}
      </p>
      <button
        onClick={increment}
        className="text-2xl font-bold text-center select-none"
      >
        +
      </button>
    </div>
  );
};

export default QuantityButton;
