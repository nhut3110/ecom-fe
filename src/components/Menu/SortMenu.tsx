import React, { useState, useEffect, useCallback } from "react";
import { Select, Typography } from "antd";
import { SelectProps } from "antd/es/select";

interface SortMenuType extends Omit<SelectProps<string>, "options"> {
  options: string[];
  onSelectionChange: (selectedOption: string) => void;
  isReset?: boolean;
  onReset?: () => void;
  label?: string;
}

const SortMenu = ({
  options,
  onSelectionChange,
  isReset,
  onReset,
  label,
  ...props
}: SortMenuType) => {
  const [selectedOption, setSelectedOption] = useState("Default");

  const handleChange = useCallback(
    (value: string) => {
      const selectedValue = value === "Default" ? "Default" : value;
      setSelectedOption(selectedValue);
      onSelectionChange(selectedValue);
    },
    [onSelectionChange]
  );

  useEffect(() => {
    if (isReset) {
      setSelectedOption("Default");
      onReset?.();
    }
  }, [isReset, onReset]);

  return (
    <div className="flex flex-col">
      {label && (
        <Typography.Title level={5} style={{ marginRight: 8 }}>
          {label}
        </Typography.Title>
      )}
      <Select
        {...props}
        size="large"
        value={selectedOption}
        onChange={handleChange}
        popupMatchSelectWidth
      >
        {options.map((option, index) => (
          <Select.Option key={option} value={option}>
            {option}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};

export default SortMenu;
