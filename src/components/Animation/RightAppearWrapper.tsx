import { motion } from "framer-motion";
import React from "react";

type RightAppearWrapperType = {
  children: React.ReactElement[] | React.ReactElement;
  className?: string;
  loop?: boolean;
};

const RightAppearWrapperVariants = {
  initial: {
    opacity: 0,
    x: 100,
    transition: { duration: 0.4 },
  },
  onScreen: {
    opacity: 1,
    x: 0,
    transition: { duration: 2, staggerChildren: 0.1 },
  },
};

const RightAppearWrapper = ({
  children,
  className,
  loop = false,
}: RightAppearWrapperType): React.ReactElement => {
  return (
    <motion.div
      className={className}
      variants={RightAppearWrapperVariants}
      initial="initial"
      animate={!loop && "onScreen"}
      whileInView={loop ? "onScreen" : ""}
    >
      {children}
    </motion.div>
  );
};

export default RightAppearWrapper;
