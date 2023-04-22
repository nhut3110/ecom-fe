import React from "react";
import { UseFormRegister, Path } from "react-hook-form";
import {
  AddressType,
  InformationType,
  PaymentType,
} from "../../context/FormContext";
import { ErrorMessage } from "@hookform/error-message";

interface OutlineInputType {
  label: string;
  name: Path<any>;
  error?: any;
  type?: string;
  register: UseFormRegister<any>;
}

const OutlineInput = ({
  label,
  name,
  error,
  register,
  type,
}: OutlineInputType): React.ReactElement => {
  return (
    <div className="flex w-full flex-col gap-2 pb-2">
      <label htmlFor={name} className="font-semibold first-letter:capitalize">
        {label}
      </label>
      <input
        type={type ? type : "text"}
        id={name}
        {...register(name)}
        className="min-h-[1.5rem] rounded-lg bg-gray-50 p-3 focus:border-l focus:border-black"
      />
      {error && (
        <span className="text-sm italic text-red-400">
          <ErrorMessage errors={error} name={name} />
        </span>
      )}
    </div>
  );
};

export default OutlineInput;
