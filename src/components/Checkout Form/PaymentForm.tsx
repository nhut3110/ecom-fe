import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useGetOrderFormFields } from "../../hooks/useGetOrderFormFields";
import SmallButton from "../SmallButton";
import OutlineInput from "./OutlineInput";
import { FormContext, PaymentType } from "../../context/FormContext";

const PaymentForm = (): React.ReactElement => {
  const { formState, moveNextStep, movePreviousStep, setPayment } =
    useContext(FormContext);

  const formData = formState.payment;

  const { paymentFormArray } = useGetOrderFormFields();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentType>();

  const onSubmit = (data: PaymentType) => {
    setPayment(data);
    moveNextStep();
  };

  return (
    <form>
      {paymentFormArray.map((field, index) => (
        <OutlineInput
          label={field.label}
          name={field.name}
          register={register}
          error={errors}
          key={index}
        />
      ))}

      <div className="mt-4 flex w-full justify-between">
        <SmallButton name="Back" onClick={movePreviousStep} />
        <SmallButton name="Next" onClick={handleSubmit(onSubmit)} />
      </div>
    </form>
  );
};

export default PaymentForm;
