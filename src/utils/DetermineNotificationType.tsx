import React from "react";
import { motion } from "framer-motion";

const icon = {
  hidden: {
    opacity: 0,
    pathLength: 0,
    fill: "rgba(0, 0, 0, 0)",
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    fill: "rgba(0, 0, 0, 1)",
  },
};

export const determineNotificationType = (type: string) => {
  switch (type) {
    case "error":
      return {
        style: "bg-red-400 text-white",
        icon: (
          <motion.svg
            className="MuiSvgIcon-root MuiSvgIcon-fontSizeInherit css-1cw4hi4"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="ReportProblemOutlinedIcon"
          >
            <motion.path
              variants={icon}
              initial="hidden"
              animate="visible"
              transition={{
                default: { duration: 0.5, ease: "easeInOut" },
                fill: { duration: 0.5, ease: [1, 0, 0.8, 1] },
              }}
              d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"
            ></motion.path>
          </motion.svg>
        ),
      };

    case "warning":
      return {
        style: "bg-yellow-400 text-black",
        icon: (
          <motion.svg
            fill="black"
            className="MuiSvgIcon-root MuiSvgIcon-fontSizeInherit css-1cw4hi4"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="ErrorOutlineIcon"
          >
            <motion.path
              variants={icon}
              initial="hidden"
              animate="visible"
              transition={{
                default: { duration: 0.5, ease: "easeInOut" },
                fill: { duration: 0.5, ease: [1, 0, 0.8, 1] },
              }}
              d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
            ></motion.path>
          </motion.svg>
        ),
      };

    case "success":
      return {
        style: "bg-green-400 text-black",
        icon: (
          <motion.svg
            className="MuiSvgIcon-root MuiSvgIcon-fontSizeInherit css-1cw4hi4"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="SuccessOutlinedIcon"
          >
            <motion.path
              variants={icon}
              initial="hidden"
              animate="visible"
              transition={{
                default: { duration: 0.5, ease: "easeInOut" },
                fill: { duration: 0.5, ease: [1, 0, 0.8, 1] },
              }}
              d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"
            ></motion.path>
          </motion.svg>
        ),
      };

    case "favorite":
      return {
        style: "bg-pink-400 text-black",
        icon: (
          <motion.svg
            className="h-auto w-5 fill-current text-red-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <motion.path
              variants={icon}
              initial="hidden"
              animate="visible"
              transition={{
                default: { duration: 0.5, ease: "easeInOut" },
                fill: { duration: 0.5, ease: [1, 0, 0.8, 1] },
              }}
              d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z"
            />
          </motion.svg>
        ),
      };

    case "info":
      return {
        style: "bg-blue-400 text-black",
        icon: (
          <motion.svg
            className="MuiSvgIcon-root MuiSvgIcon-fontSizeInherit css-1cw4hi4"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="InfoOutlinedIcon"
          >
            <motion.path
              variants={icon}
              initial="hidden"
              animate="visible"
              transition={{
                default: { duration: 0.5, ease: "easeInOut" },
                fill: { duration: 0.5, ease: [1, 0, 0.8, 1] },
              }}
              d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"
            ></motion.path>
          </motion.svg>
        ),
      };

    default:
      throw new Error("unknown type for notification");
  }
};
