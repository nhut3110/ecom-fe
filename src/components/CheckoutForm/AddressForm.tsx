import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext, useState } from "react";
import { useGetOrderFormFields } from "../../hooks";
import SmallButton from "../SmallButton";
import OutlineInput from "./OutlineInput";
import { AddressType, FormContext } from "../../context/FormContext";
import { validationAddressSchema } from "../../constants";

const AddressForm = (): React.ReactElement => {
  const { formState, moveNextStep, movePreviousStep, setAddress } =
    useContext(FormContext);
  const [showForm, setShowForm] = useState<boolean>(true);

  const formData = formState.address;

  const { addressFormArray } = useGetOrderFormFields();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressType>({
    defaultValues: {
      number: formData.number,
      street: formData.street,
      ward: formData.ward,
      city: formData.city,
      country: formData.country,
    },
    resolver: yupResolver(validationAddressSchema),
  });

  const onSubmit = (data: AddressType) => {
    setAddress(data);
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
            <div className="grid-cols-2 gap-5 md:grid">
              {addressFormArray.map((field) => (
                <OutlineInput
                  label={field.label}
                  name={field.name}
                  register={register}
                  error={errors}
                  key={field.name}
                />
              ))}
            </div>
          </motion.div>

          <div className="mt-4 flex w-full justify-between">
            <SmallButton content="Back" onClick={movePreviousStep} />
            <SmallButton content="Next" onClick={handleSubmit(onSubmit)} />
          </div>
        </form>
      )}
    </>
  );
};

export default AddressForm;
