import React from "react";
import { createPortal } from "react-dom";

type PortalWrapperType = {
  children: React.ReactElement | React.ReactElement[];
};

const PortalWrapper = ({ children }: PortalWrapperType) => {
  return createPortal(children, document.body);
};

export default PortalWrapper;
