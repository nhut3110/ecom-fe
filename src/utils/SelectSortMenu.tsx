import React, { useState } from "react";
import SelectMenu from "../components/SelectMenu";

type SortOptionType = {
  name: string;
  options: string[];
};

const sortOptions: SortOptionType[] = [
  {
    name: "Price",
    options: ["From Low to High", "From High to Low"],
  },
  {
    name: "Name",
    options: ["From A to Z", "From Z to A"],
  },
];

const filterOptions: SortOptionType[] = [
  {
    name: "Category",
    options: ["Electronics", "Jewelery", "Men's clothing", "Women's clothing"],
  },
];

export const selectSortMenu = () => {
  const [selectedSort, setSelectedSort] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");

  const handleSortChange = (selectedOption: string) => {
    setSelectedSort(selectedOption);
  };

  const handleFilterChange = (selectedOption: string) => {
    setSelectedFilter(selectedOption);
  };

  const renderSelectSortMenu = () => {
    return (
      <React.Fragment>
        {sortOptions.map((sortOption, index) => (
          <SelectMenu
            options={sortOption.options}
            defaultOption={sortOption.name}
            onSelectionChange={handleSortChange}
            key={index}
          />
        ))}

        {filterOptions.map((filterOption, index) => (
          <SelectMenu
            options={filterOption.options}
            defaultOption={filterOption.name}
            onSelectionChange={handleFilterChange}
            key={index}
          />
        ))}
      </React.Fragment>
    );
  };

  return { selectedSort, selectedFilter, renderSelectSortMenu };
};
