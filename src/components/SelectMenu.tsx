import React from "react";

const SelectMenu = (props: {
  options: string[];
  defaultOption: string;
}): React.ReactElement => {
  const { options, defaultOption } = props;
  return (
    <select className="  border-2 rounded-full p-2  focus:border-black ">
      <option selected>{defaultOption}</option>
      {options.map((option) => (
        <option key={option} className="text-sm">
          {option}
        </option>
      ))}
    </select>
  );
};

export default SelectMenu;
