import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Button, InputNumber, InputNumberProps } from "antd";
import React from "react";

interface QuantityType extends Omit<InputNumberProps, "value"> {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const StyledInput = styled(InputNumber)`
  .ant-input-number-input-wrap input {
    text-align: center !important;
  }
`;

const QuantityButton = ({
  quantity,
  onIncrement,
  onDecrement,
  ...props
}: QuantityType): React.ReactElement => {
  return (
    <StyledInput
      {...props}
      style={{
        ...props.style,
        maxWidth: "170px",
        textAlign: "center",
        margin: "10px 0px",
      }}
      controls={false}
      addonBefore={
        <Button
          icon={<MinusOutlined />}
          onClick={onDecrement}
          type="text"
          disabled={quantity === 1}
          size="small"
        />
      }
      addonAfter={
        <Button
          icon={<PlusOutlined />}
          onClick={onIncrement}
          type="text"
          size="small"
          disabled={props?.max ? quantity === props.max : false}
        />
      }
      value={quantity}
    />
  );
};

export default QuantityButton;
