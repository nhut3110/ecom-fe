import React from "react";
import { motion } from "framer-motion";

const SmallButton = (props: {
  content?: string;
  onClick?: () => void;
  children?: JSX.Element;
}): React.ReactElement => {
  const { content, onClick, children } = props;

  return (
    <div>
      <motion.button
        whileTap={{ scale: 0.8 }}
        onClick={onClick}
        className="m-1 rounded-md bg-slate-700 py-2 px-5 text-[0.6875rem] text-white first-letter:capitalize hover:bg-black sm:text-sm "
      >
        {content ? content : children}
      </motion.button>
    </div>
  );
};

export default SmallButton;
