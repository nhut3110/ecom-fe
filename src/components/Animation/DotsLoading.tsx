import { motion } from "framer-motion";
import times from "lodash/times";
import React, { useMemo } from "react";

const NUMBER_OF_DOTS = 3; // 3 dots in loading screen

const DotsLoading = (): React.ReactElement => {
  const containerVariants = useMemo(() => {
    return {
      initial: {
        transition: {
          staggerChildren: 0.2,
        },
      },
      animate: {
        transition: {
          staggerChildren: 0.2,
        },
      },
    };
  }, []);

  const dotVariants = useMemo(() => {
    return {
      initial: {
        y: "0%",
      },
      animate: {
        y: "100%",
      },
    };
  }, []);

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="flex h-5 w-20 justify-around"
    >
      {times(NUMBER_OF_DOTS, (index) => (
        <motion.span
          variants={dotVariants}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          className="block h-5 w-5 rounded-full bg-black"
          key={index}
        />
      ))}
    </motion.div>
  );
};

export default DotsLoading;
