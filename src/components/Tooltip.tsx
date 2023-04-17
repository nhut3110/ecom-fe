import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type TooltipType = {
  content: string;
  children: React.ReactNode[] | React.ReactNode;
};

const Tooltip = ({ content, children }: TooltipType) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative">
      <div
        onMouseEnter={() => {
          setShowTooltip(true);
        }}
        onMouseLeave={() => {
          setShowTooltip(false);
        }}
      >
        {children}
      </div>
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full left-1/2 z-10 min-w-max -translate-x-1/2 -translate-y-2 transform rounded-md bg-gray-700 p-2 text-sm text-white"
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;
