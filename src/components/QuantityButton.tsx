import React from "react";

type QuantityProps = {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
};
const QuantityButton = ({
  quantity,
  onIncrement,
  onDecrement,
}: QuantityProps): React.ReactElement => {
  return (
    <div className="flex max-w-[6.25rem] items-center justify-around gap-3 rounded-full p-2">
      <button
        onClick={onDecrement}
        className="select-none text-center text-2xl font-bold"
      >
        -
      </button>
      <p className="flex h-6 w-6 select-none items-center justify-center rounded-full bg-slate-200 text-xs font-medium md:h-8 md:w-8 md:text-lg">
        {quantity}
      </p>
      <button
        onClick={onIncrement}
        className="select-none text-center text-2xl font-bold"
      >
        +
      </button>
    </div>
  );
};

export default QuantityButton;
