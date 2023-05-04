import React from "react";
import ClosedEye from "./ClosedEye";
import OpenedEye from "./OpenedEye";

type EyeButtonType = {
  isEyeClosed: boolean;
  onClick?: () => void;
  className?: string;
};

const EyeButton = ({ isEyeClosed, onClick, className }: EyeButtonType) => {
  return (
    <button onClick={onClick} className={className} type="button">
      {isEyeClosed ? <ClosedEye /> : <OpenedEye />}
    </button>
  );
};

export default EyeButton;
