import React from "react";
import { motion } from "framer-motion";

const verticalLineVariants = {
  hidden: {
    pathLength: 0,
    opacity: 0,
  },
  visible: {
    pathLength: 1,
    opacity: 1,
  },
};

const opacityVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1 },
};

const circleVariants = {
  hidden: { strokeDasharray: "0 113.09733552923254" },
  visible: { strokeDasharray: "113.09733552923254 113.09733552923254" },
};

const xSymbolVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1 },
};

const triangle = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1 },
};

export const determineNotificationType = (type: string) => {
  switch (type) {
    case "error":
      return {
        style: "bg-red-400 text-white",
        icon: (
          <motion.svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <motion.circle
              cx="20"
              cy="20"
              r="16"
              fill="none"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              variants={circleVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 1.3 }}
            />
            <motion.path
              d="M12,12 L28,28"
              fill="none"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              variants={xSymbolVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 1.3 }}
            />
            <motion.path
              d="M28,12 L12,28"
              fill="none"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              variants={xSymbolVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 1.3 }}
            />
          </motion.svg>
        ),
      };

    case "warning":
      return {
        style: "bg-yellow-400 text-black",
        icon: (
          <motion.svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <motion.path
              d="M20 5 L35 35 L5 35 Z"
              fill="none"
              stroke="black"
              strokeWidth="4"
              strokeLinejoin="round"
              strokeLinecap="round"
              variants={triangle}
              initial="hidden"
              animate="visible"
              transition={{ duration: 1.3 }}
            />
            <motion.path
              d="M20 15 L20 25"
              fill="none"
              stroke="black"
              strokeWidth="3"
              strokeLinecap="round"
              variants={opacityVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 1.3 }}
            />
            <motion.circle
              cx="20"
              cy="30"
              r="2"
              fill="black"
              variants={opacityVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 1.3 }}
            />
          </motion.svg>
        ),
      };

    case "success":
      return {
        style: "bg-green-400 text-black",
        icon: (
          <motion.svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <motion.circle
              cx="20"
              cy="20"
              r="18"
              fill="none"
              stroke="black"
              strokeWidth="4"
              strokeLinecap="round"
              variants={circleVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 1.3 }}
            />
            <motion.path
              d="M12,20 L17,27 L30,10"
              fill="none"
              stroke="black"
              strokeWidth="4"
              strokeLinecap="round"
              variants={opacityVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 1.3 }}
            />
          </motion.svg>
        ),
      };

    case "favorite":
      return {
        style: "bg-pink-400 text-black",
        icon: (
          <motion.svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
            <motion.path
              d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z"
              fill="none"
              stroke="#000"
              strokeWidth="30"
              strokeLinecap="round"
              variants={opacityVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 1.3 }}
            />
          </motion.svg>
        ),
      };

    case "info":
      return {
        style: "bg-sky-400 text-black",
        icon: (
          <motion.svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <motion.circle
              cx="20"
              cy="20"
              r="18"
              fill="none"
              stroke="#000"
              strokeWidth="4"
              strokeLinecap="round"
              variants={circleVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 1.3 }}
            />
            <motion.path
              d="M20,12 L20,28"
              fill="none"
              stroke="#000"
              strokeWidth="4"
              strokeLinecap="round"
              variants={verticalLineVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 1.3 }}
            />
          </motion.svg>
        ),
      };

    default:
      throw new Error("unknown type for notification");
  }
};
