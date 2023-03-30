import React from "react";
import SelectMenu from "../components/SelectMenu";
import { SortOptions } from "../constants/data";

const SelectSortMenu = (): React.ReactElement => {
  return (
    <>
      {SortOptions.map((list, index) => (
        <SelectMenu
          options={list.options}
          key={index}
          defaultOption={list.name}
        />
      ))}
    </>
  );
};

export default SelectSortMenu;
