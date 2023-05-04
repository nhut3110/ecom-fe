import { motion } from "framer-motion";
import React from "react";

type LeftAppearWrapperType = {
  children: React.ReactElement[] | React.ReactElement;
  className?: string;
  loop?: boolean;
};

const leftAppearWrapperVariants = {
  initial: {
    opacity: 0,
    x: -100,
    transition: { duration: 0.4 },
  },
  onScreen: {
    opacity: 1,
    x: 0,
    transition: { duration: 2, staggerChildren: 0.1 },
  },
};

const LeftAppearWrapper = ({
  children,
  className,
  loop = false,
}: LeftAppearWrapperType): React.ReactElement => {
  return (
    <motion.div
      className={className}
      variants={leftAppearWrapperVariants}
      initial="initial"
      animate={!loop && "onScreen"}
      whileInView={loop ? "onScreen" : ""}
    >
      {children}
    </motion.div>
  );
};

export default LeftAppearWrapper;
