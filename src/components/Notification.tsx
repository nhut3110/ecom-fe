import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type NotificationProps = {
  isOpen: boolean;
  onClose?: () => void;
  children?: React.ReactElement | React.ReactElement[];
  content?: string;
  isError: boolean;
};

const NOTIFICATION_DURATION = 1500; // appear 1.5s

const Notification = ({
  isOpen,
  onClose,
  children,
  content,
  isError = false,
}: NotificationProps): React.ReactElement => {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) {
          onClose();
        }
      }, NOTIFICATION_DURATION);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed top-0 right-0 z-50 p-6"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
        >
          <div
            className={`${
              isError ? "bg-red-400" : "bg-green-400"
            } rounded-lg  py-2 px-4 text-white shadow-lg`}
          >
            {children ? children : <p>{content}</p>}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;
