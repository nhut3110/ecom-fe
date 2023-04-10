import React from "react";
import { UseFormRegister, Path } from "react-hook-form";
import {
  AddressType,
  InformationType,
  PaymentType,
} from "../../context/FormContext";
import { ErrorMessage } from "@hookform/error-message";

interface OutlineInputProps {
  label: string;
  name: Path<InformationType | AddressType | PaymentType>;
  error?: any;
  register: UseFormRegister<any>;
}

const OutlineInput = ({
  label,
  name,
  error,
  register,
}: OutlineInputProps): React.ReactElement => {
  return (
    <div className="flex w-full flex-col gap-2 pb-2">
      <label htmlFor={name} className="font-semibold first-letter:capitalize">
        {label}
      </label>
      <input
        id={name}
        {...register(name)}
        className="min-h-[1.5rem] rounded-lg bg-gray-100 p-3 focus:border-l focus:border-black"
      />
      {error && (
        <span className="text-md italic text-red-400">
          <ErrorMessage errors={error} name={name} />
        </span>
      )}
    </div>
  );
};

export default OutlineInput;
