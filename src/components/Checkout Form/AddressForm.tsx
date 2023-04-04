import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGetOrderFormFields } from "../../hooks/useGetOrderFormFields";
import SmallButton from "../SmallButton";
import { AddressType, FormContext } from "../../context/FormContext";
import OutlineInput from "./OutlineInput";
import { validationAddressSchema } from "../../constants/validate";

const AddressForm = (): React.ReactElement => {
  const { formState, moveNextStep, movePreviousStep, setAddress } =
    useContext(FormContext);

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
    moveNextStep();
  };

  return (
    <form>
      <div className="grid-cols-2 gap-5 md:grid">
        {addressFormArray.map((field, index) => (
          <OutlineInput
            label={field.label}
            name={field.name}
            register={register}
            error={errors}
            key={index}
          />
        ))}
      </div>

      <div className="mt-4 flex w-full justify-between">
        <SmallButton name="Back" onClick={movePreviousStep} />
        <SmallButton name="Next" onClick={handleSubmit(onSubmit)} />
      </div>
    </form>
  );
};

export default AddressForm;
