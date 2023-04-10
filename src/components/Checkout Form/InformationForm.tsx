import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import OutlineInput from "./OutlineInput";
import SmallButton from "../SmallButton";
import { useGetOrderFormFields } from "../../hooks/useGetOrderFormFields";
import { FormContext, InformationType } from "../../context/FormContext";

const InformationForm = (): React.ReactElement => {
  const { formState, moveNextStep, setInformation } = useContext(FormContext);

  const formData = formState.information;

  const { informationFormArray } = useGetOrderFormFields();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InformationType>({
    defaultValues: {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    },
  });

  const onSubmit = (data: InformationType) => {
    setInformation(data);
    moveNextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {informationFormArray.map((field, index) => (
        <OutlineInput
          label={field.label}
          name={field.name}
          register={register}
          error={errors}
          key={index}
        />
      ))}
      <div className="mt-4 flex w-full justify-end">
        <SmallButton name="Next" />
      </div>
    </form>
  );
};

export default InformationForm;
