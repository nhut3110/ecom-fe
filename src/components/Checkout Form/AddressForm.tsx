import React, { useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import SmallButton from "../SmallButton";
import OutlineInput from "./OutlineInput";
import { rules } from "../../constants/form";
import { AddressType, FormContext } from "../../context/FormContext";

const AddressForm = (): React.ReactElement => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressType>();

  const { formState, nextStep, previousStep, setAddress } =
    useContext(FormContext);

  const formData = formState.address;

  const onSubmit = (data: AddressType) => {
    setAddress(data);
    nextStep();
  };

  return (
    <form>
      <div className="grid-cols-2 gap-5 md:grid">
        <Controller
          name="number"
          control={control}
          rules={rules.apartmentNumber}
          defaultValue={formData.number}
          render={({ field, fieldState }) => (
            <OutlineInput
              label="apartment number"
              field={field}
              fieldState={fieldState}
              error={errors.number}
              type="text"
            />
          )}
        />

        <Controller
          name="street"
          control={control}
          rules={rules.street}
          defaultValue={formData.street}
          render={({ field, fieldState }) => (
            <OutlineInput
              label="street"
              field={field}
              fieldState={fieldState}
              error={errors.street}
              type="text"
            />
          )}
        />

        <Controller
          name="ward"
          control={control}
          defaultValue={formData.ward}
          render={({ field, fieldState }) => (
            <OutlineInput
              label="ward"
              field={field}
              fieldState={fieldState}
              error={errors.ward}
              type="text"
            />
          )}
        />

        <Controller
          name="city"
          control={control}
          rules={rules.city}
          defaultValue={formData.city}
          render={({ field, fieldState }) => (
            <OutlineInput
              label="city"
              field={field}
              fieldState={fieldState}
              error={errors.city}
              type="text"
            />
          )}
        />
      </div>

      <Controller
        name="country"
        control={control}
        rules={rules.country}
        defaultValue={formData.country}
        render={({ field, fieldState }) => (
          <OutlineInput
            label="country"
            field={field}
            fieldState={fieldState}
            error={errors.country}
            type="text"
          />
        )}
      />

      <div className="mt-4 flex w-full justify-between">
        <SmallButton name="Back" onClick={previousStep} />
        <SmallButton name="Next" onClick={handleSubmit(onSubmit)} />
      </div>
    </form>
  );
};

export default AddressForm;
