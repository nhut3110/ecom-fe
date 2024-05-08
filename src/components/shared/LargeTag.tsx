import styled from "@emotion/styled";
import { Tag, TagProps } from "antd";
import React from "react";

const StyledTag = styled(Tag)`
  span {
    font-size: 1rem;
    padding: 5px 10px;
  }
`;

export const LargeTag = (props: TagProps) => {
  return <StyledTag {...props} />;
};
