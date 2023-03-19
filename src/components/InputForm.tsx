import React, { useState } from "react";

const InputForm = (props: { title: string; id: string; type: string }) => {
  const [label, setLabel] = useState(true);
  const { title, id, type } = props;

  return (
    <div className="relative my-3 w-full ">
      <input
        id={id}
        type={type}
        onChange={(e) => setLabel(e.target.value == "" ? true : false)}
        className="peer w-full border-b bg-transparent py-1 transition-colors focus:border-b-2 focus:border-black focus:outline-none"
      />

      <label
        htmlFor={id}
        className={`absolute left-0 ${
          !label ? "-top-4" : "top-1"
        } cursor-text text-gray-500 transition-all duration-200 first-letter:capitalize peer-focus:-top-4 peer-focus:text-xs peer-focus:text-black ${
          !label ? "text-black-500 text-xs" : null
        }`}
      >
        {title}
      </label>
    </div>
  );
};

export default InputForm;
