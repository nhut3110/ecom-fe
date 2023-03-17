import React, { useState } from "react";

const InputForm = (props: { title: string; id: string; type: string }) => {
  const [label, setLabel] = useState(true);
  const { title, id, type } = props;

  return (
    <div className="relative my-3 w-full ">
      <input
        id={id}
        type={type}
        onChange={(e) => setLabel(e.target.value === "" ? true : false)}
        className="w-full peer border-b py-1 transition-colors focus:border-b-2 focus:border-black focus:outline-none"
      />

      <label
        htmlFor={id}
        className={`absolute text-gray-500 left-0 top-1 cursor-text transition-all duration-200 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-black first-letter:capitalize ${
          !label ? "-top-4 text-xs text-black" : null
        }`}
      >
        {title}
      </label>
    </div>
  );
};

export default InputForm;
