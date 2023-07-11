import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion } from "framer-motion";
import { useGetOrderFormFields } from "../../hooks";
import OutlineInput from "./OutlineInput";
import SmallButton from "../SmallButton";
import { FormContext, InformationType } from "../../context/FormContext";
import { validationInformationSchema } from "../../constants";

const InformationForm = (): React.ReactElement => {
  const { formState, moveNextStep, setInformation } = useContext(FormContext);
  const [showForm, setShowForm] = useState<boolean>(true);

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
    resolver: yupResolver(validationInformationSchema),
  });

  const onSubmit = (data: InformationType) => {
    setInformation(data);
    setShowForm(false);
    moveNextStep();
  };

  return (
    <>
      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            {informationFormArray.map((field, index) => (
              <OutlineInput
                label={field.label}
                name={field.name}
                register={register}
                error={errors}
                key={index}
              />
            ))}
          </motion.div>
          <div className="mt-4 flex w-full justify-end">
            <SmallButton content="Next" />
          </div>
        </form>
      )}
    </>
  );
};

export default InformationForm;
