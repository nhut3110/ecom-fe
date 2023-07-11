import { motion } from "framer-motion";
import React, { useState, useRef, useEffect } from "react";
import SelectMenu from "../components/SelectMenu";
import Tooltip from "../components/Tooltip";
import { getCategoryList, CategoryType } from "../services";
import { SortOptionType } from "../constants";

type SortListType = {
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

const sortOptions: SortListType[] = [
  {
    name: "price",
    options: ["Ascending", "Descending", "Default"],
  },
  {
    name: "rate",
    options: ["Ascending", "Descending", "Default"],
  },
];

const DEFAULT_CATEGORY_FILTER = "Default";

export const selectSortMenu = () => {
  const [selectedSort, setSelectedSort] = useState<SortOptionType>();
  const [selectedFilter, setSelectedFilter] = useState<string | undefined>("");
  const [isReset, setIsReset] = useState<boolean>(false);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [categoryNameList, setCategoryNameList] = useState<string[]>([]);
  const lastChangedIndex = useRef(-1);

  const handleSortChange = (
    optionName: string,
    selectedOption: string,
    index: number
  ) => {
    setSelectedSort({ sortBy: optionName, sortDirection: selectedOption });

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

  const handleFilterChange = async (selectedOption: string) => {
    if (categories) {
      const temp = categories.find(
        (category: CategoryType) =>
          category.name === selectedOption.toLowerCase()
      );

      if (!temp) return setSelectedFilter(undefined);

      return setSelectedFilter(temp.id);
    }

    return setSelectedFilter(undefined);
  };

  const fetchCategoryList = async () => {
    const list: CategoryType[] = await getCategoryList();
    setCategories(list);
    const nameList = list.map((category) => category.name);

    setCategoryNameList((prevNameList) => [
      ...prevNameList,
      ...nameList,
      DEFAULT_CATEGORY_FILTER,
    ]);
  };

  useEffect(() => {
    fetchCategoryList();
  }, []);

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
                  handleSortChange(sortOption.name, selectedOption, index)
                }
                isReset={isReset && lastChangedIndex.current !== index}
                onReset={() => setIsReset(false)}
                key={index}
              />
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm italic">Filtering options</p>
          <div>
            <SelectMenu
              options={categoryNameList}
              defaultOption={"Category"}
              onSelectionChange={handleFilterChange}
            />
          </div>
        </div>
      </div>
    );
  };

  return { selectedSort, selectedFilter, renderSelectSortMenu };
};
