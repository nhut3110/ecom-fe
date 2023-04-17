import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";

type BadgeType = {
  value: number;
  color: string;
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.2 },
  visible: { opacity: 1, scale: [1, 1.5, 1] },
};

const NumberBadge = ({ color, value }: BadgeType) => {
  const [visibility, setVisibility] = useState<boolean>(!!value);

  const badgeVariants = useMemo(() => {
    return {
      hidden: { opacity: 0, scale: 0.2 },
      visible: { opacity: 1, scale: [1, 1.5, 1] },
    };
  }, []);

  useEffect(() => {
    setVisibility(!!value);
  }, [value]);

  return (
    <AnimatePresence>
      {visibility && (
        <motion.div
          className={`h-5 w-5 rounded-full ${color} absolute top-0 right-0 flex items-center justify-center`}
          variants={badgeVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{
            duration: 1,
            type: "easeInOut",
          }}
        >
          <motion.span className="text-sm font-medium">
            {value < 100 ? value : "99+"}
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NumberBadge;
