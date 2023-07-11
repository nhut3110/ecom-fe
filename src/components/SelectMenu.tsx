import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

type SelectMenuType = {
  options: string[];
  defaultOption: string;
  onSelectionChange: (selectedOption: string) => void;
  isReset?: boolean;
  onReset?: () => void;
};

const menuVariants = {
  open: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
      bounce: 0,
      duration: 0.7,
      delayChildren: 0.3,
      staggerChildren: 0.05,
    },
  },
  closed: {
    clipPath: "inset(10% 50% 90% 50%)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
      bounce: 0,
      duration: 0.3,
    },
  },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

const SelectMenu = ({
  options,
  defaultOption,
  onSelectionChange,
  isReset,
  onReset,
}: SelectMenuType) => {
  const [selectedOption, setSelectedOption] = useState(defaultOption);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleSelectionChange = (value: string) => {
    const selectedValue = value === "Default" ? defaultOption : value;
    setSelectedOption(selectedValue);
    onSelectionChange(selectedValue);
    setIsOpen(false);
  };

  const toggleMenu = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const handleResetMenu = () => {
    setSelectedOption(defaultOption);
    setIsOpen(false);
    onReset?.();
  };

  useEffect(() => {
    if (isReset) handleResetMenu();
  }, [isReset]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsOpen]);

  return (
    <div className="relative min-w-[8rem]" ref={ref}>
      <motion.div
        className="mb-2 flex cursor-pointer items-center justify-between rounded-lg border-2 p-2 shadow-md focus:border-black"
        onClick={toggleMenu}
        whileTap={{ scale: 0.97 }}
      >
        <div className="text-sm font-semibold first-letter:capitalize">
          {selectedOption}
        </div>
        <motion.svg
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
          variants={iconVariants}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
        >
          <path
            fillRule="evenodd"
            d="M10 13a1 1 0 01-.71-.29l-3.01-3a1 1 0 011.42-1.42L10 10.59l2.29-2.3a1 1 0 011.42 1.42l-3.01 3A1 1 0 0110 13z"
            clipRule="evenodd"
          />
        </motion.svg>
      </motion.div>
      <motion.div
        className="absolute z-10 w-full rounded-md border-2 bg-white shadow-2xl"
        variants={menuVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
      >
        {options.map((option, index) => (
          <div key={option}>
            <motion.div
              className="cursor-pointer rounded-md py-2 px-3 text-gray-900 hover:bg-gray-100"
              variants={itemVariants}
              onClick={() => handleSelectionChange(option)}
            >
              {option}
            </motion.div>
            {index !== options.length - 1 && (
              <motion.div
                className="mx-1 h-px bg-gray-300"
                variants={itemVariants}
              />
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default SelectMenu;
