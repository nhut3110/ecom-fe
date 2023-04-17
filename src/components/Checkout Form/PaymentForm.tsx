import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useGetOrderFormFields } from "../../hooks/useGetOrderFormFields";
import { yupResolver } from "@hookform/resolvers/yup";
import SmallButton from "../SmallButton";
import OutlineInput from "./OutlineInput";
import { FormContext, PaymentType } from "../../context/FormContext";
import { validationPaymentSchema } from "../../constants/validate";

const PaymentForm = (): React.ReactElement => {
  const { formState, moveNextStep, movePreviousStep, setPayment } =
    useContext(FormContext);
  const [showForm, setShowForm] = useState<boolean>(true);

  const formData = formState.payment;

  const { paymentFormArray } = useGetOrderFormFields();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentType>({
    resolver: yupResolver(validationPaymentSchema),
    defaultValues: {
      owner: formData.owner,
      cvc: formData.cvc,
      cardNumber: formData.cardNumber,
    },
  });

  const onSubmit = (data: PaymentType) => {
    setPayment(data);
    setShowForm(false);
    moveNextStep();
  };

  return (
    <>
      {showForm && (
        <form>
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            {paymentFormArray.map((field, index) => (
              <OutlineInput
                label={field.label}
                name={field.name}
                register={register}
                error={errors}
                key={index}
              />
            ))}
          </motion.div>

          <div className="mt-4 flex w-full justify-between">
            <SmallButton name="Back" onClick={movePreviousStep} />
            <SmallButton name="Next" onClick={handleSubmit(onSubmit)} />
          </div>
        </form>
      )}
    </>
  );
};

export default PaymentForm;
