import { motion } from "framer-motion";
import React, { useState, useRef, useEffect } from "react";
import SelectMenu from "../components/SelectMenu";
import Tooltip from "../components/Tooltip";
import { CategoryType } from "../services/types.api";
import { FilterValue } from "./filterProducts";
import { getCategoryList } from "../services/products.api";

type SortOptionType = {
  name: string;
  options: string[];
};
type FilterOptionType = {
  name: string;
  options: CategoryType[];
};

const iconVariants = {
  hidden: {
    opacity: 0,
    pathLength: 0,
    fill: "rgba(0, 0, 0, 0)",
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    fill: "rgba(0, 0, 0, 1)",
  },
};

const sortOptions: SortOptionType[] = [
  {
    name: "Price",
    options: ["Low to High", "High to Low", "Default"],
  },
  {
    name: "Name",
    options: ["A to Z", "Z to A", "Default"],
  },
];

const filterOptions: SortOptionType[] = [
  {
    name: "Category",
    options: [
      "Electronics",
      "Jewelery",
      "Men's clothing",
      "Women's clothing",
      "Default",
    ],
  },
];

export const selectSortMenu = () => {
  const [selectedSort, setSelectedSort] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const lastChangedIndex = useRef(-1); // default value when no changes
  const [isReset, setIsReset] = useState(false);

  const handleSortChange = (selectedOption: string, index: number) => {
    setSelectedSort(selectedOption);

    if (lastChangedIndex.current !== -1) {
      const resetIndex =
        lastChangedIndex.current !== index ? lastChangedIndex.current : -1;
      lastChangedIndex.current = index;
      setIsReset(resetIndex !== -1);

      return resetIndex;
    }
    lastChangedIndex.current = index;

    return -1;
  };

  // this function is just a temporary function, will be replaced by sort and filter api in the next phase, same as above
  const handleFilterChange = async (selectedOption: string) => {
    const categories = await getCategoryList();
    if (categories) {
      const temp = categories.find(
        (category) => category.name === selectedOption.toLowerCase()
      );
      if (!temp) return setSelectedFilter(FilterValue.DEFAULT);

      return setSelectedFilter(temp.id);
    }
    return setSelectedFilter(FilterValue.DEFAULT);
  };

  const handleResetMenu = () => {
    setIsReset(false);
  };

  const renderSelectSortMenu = () => {
    return (
      <div className="flex flex-col gap-5 md:flex-row">
        <div>
          <div className="flex items-center gap-1">
            <Tooltip content="Only one sort type in a time">
              <motion.svg
                className="MuiSvgIcon-root MuiSvgIcon-fontSizeInherit css-1cw4hi4 w-4"
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
              >
                <motion.path
                  variants={iconVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{
                    default: { duration: 0.5, ease: "easeInOut" },
                    fill: { duration: 0.5, ease: [1, 0, 0.8, 1] },
                  }}
                  d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"
                ></motion.path>
              </motion.svg>
            </Tooltip>

            <p className="text-sm italic">Sorting options</p>
          </div>

          <div className="flex gap-5">
            {sortOptions.map((sortOption, index) => (
              <SelectMenu
                options={sortOption.options}
                defaultOption={sortOption.name}
                onSelectionChange={(selectedOption) =>
                  handleSortChange(selectedOption, index)
                }
                isReset={isReset && lastChangedIndex.current !== index}
                onReset={handleResetMenu}
                key={index}
              />
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm italic">Filtering options</p>
          <div>
            {filterOptions.map((filterOption, index) => (
              <SelectMenu
                options={filterOption.options}
                defaultOption={filterOption.name}
                onSelectionChange={handleFilterChange}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  return { selectedSort, selectedFilter, renderSelectSortMenu };
};
