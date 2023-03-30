import React from "react";

type OutlineInputType = {
  label: string;
  type: string;
  field: any;
  fieldState: any;
  error: any;
};

const OutlineInput = ({
  label,
  type,
  field,
  fieldState,
  error,
}: OutlineInputType): React.ReactElement => {
  return (
    <div className="flex w-full flex-col gap-2 pb-2">
      <label
        htmlFor={field.name}
        className="font-semibold first-letter:capitalize"
      >
        {label}
      </label>
      <input
        id={field.name}
        type={type}
        {...field}
        className="min-h-[1.5rem] rounded-lg bg-gray-100 p-3 focus:border-l focus:border-black"
      />
      {error && (
        <span className="text-md italic text-red-400">{error?.message}</span>
      )}
    </div>
  );
};

export default OutlineInput;
