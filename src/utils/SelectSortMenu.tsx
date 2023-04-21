import { motion } from "framer-motion";
import React, { useState, useRef } from "react";
import SelectMenu from "../components/SelectMenu";
import Tooltip from "../components/Tooltip";

type SortOptionType = {
  name: string;
  options: string[];
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

    // just in case for the review, if the value is not -1, it mean that some menu have change value
    if (lastChangedIndex.current !== -1) {
      // if the change value is the same as the current value, set it to -1 to mean that we don't need to reset anything, otherwise set it to the new value that is the index of changed menu
      const resetIndex =
        lastChangedIndex.current !== index ? lastChangedIndex.current : -1;
      // after that, set value to the ref
      lastChangedIndex.current = index;
      // if the change value i not -1, it means that other menu have change value so we need to reset the rest
      setIsReset(resetIndex !== -1);
      // just return
      return resetIndex;
    }
    // if the index is -1 and not pass the condition above, we set it to the index of the menu to compare later when something changes
    lastChangedIndex.current = index;
    // just return
    return -1;
  };

  const handleFilterChange = (selectedOption: string) => {
    setSelectedFilter(selectedOption);
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
                data-testid="InfoOutlinedIcon"
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
