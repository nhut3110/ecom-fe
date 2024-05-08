import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

type ChildrenType = {
  children: React.ReactElement | React.ReactElement[];
};

const ScrollToTopWrapper = ({ children }: ChildrenType) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <div>{children}</div>;
};

export default ScrollToTopWrapper;
