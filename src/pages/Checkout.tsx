import React, { useContext } from "react";
import OrderSummary from "../components/OrderSummary";
import { FormContext } from "../context/FormContext";

const Checkout = (): React.ReactElement => {
  const { formState } = useContext(FormContext);

  const CurrentForm = formState.forms[formState.step];

  return (
    <div className=" mx-auto flex w-full flex-col items-center justify-around md:flex-row">
      <div className=" my-5 w-[90%] px-5 md:w-3/5">
        <div className="my-10">
          <p className="text-xl font-semibold md:text-2xl">
            Thank you for ordering with us,
          </p>
          <p className="text-xl font-semibold md:text-3xl">
            Fill Shipping info ✏️
          </p>
        </div>
        <CurrentForm />
      </div>
      <OrderSummary />
    </div>
  );
};

export default Checkout;
