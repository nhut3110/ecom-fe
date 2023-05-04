import { motion } from "framer-motion";
import React from "react";

type OpacityMotionWrapperType = {
  children: React.ReactElement[] | React.ReactElement;
  className?: string;
  loop?: boolean;
};

const opacityMotionWrapperVariants = {
  initial: {
    opacity: 0,
    transition: { duration: 0.4 },
  },
  onScreen: {
    opacity: 1,
    transition: { duration: 1, staggerChildren: 0.1 },
  },
};

const OpacityMotionWrapper = ({
  children,
  className,
  loop = false,
}: OpacityMotionWrapperType): React.ReactElement => {
  return (
    <motion.div
      className={className}
      variants={opacityMotionWrapperVariants}
      initial="initial"
      animate={!loop && "onScreen"}
      whileInView={loop ? "onScreen" : ""}
      layout
    >
      {children}
    </motion.div>
  );
};

export default OpacityMotionWrapper;
