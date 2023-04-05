import React, { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NotificationContext } from "../context/NotificationContext";
import { determineNotificationType } from "../utils/DetermineNotificationType";

export type NotificationProps = {
  id?: string;
  isOpen: boolean;
  onClose?: () => void;
  children?: React.ReactElement | React.ReactElement[];
  content?: string;
  type: string;
  timeout?: number;
};

type NotificationStyle = {
  style: string;
  icon: React.ReactElement;
};

const NOTIFICATION_DURATION = 1500; // appear 1.5s

const Notification = ({
  timeout = NOTIFICATION_DURATION,
  id = crypto.randomUUID(),
  ...props
}: NotificationProps): React.ReactElement => {
  const { isOpen, onClose, children, content, type } = props;
  const [visible, setVisible] = useState<boolean>(false);
  const [style, setStyle] = useState<NotificationStyle>(() =>
    determineNotificationType(type)
  );
  const { dismiss } = useContext(NotificationContext);
  const [timerId, setTimerId] = useState<number | undefined>();

  const handleHoverStart = () => {
    clearTimeout(timerId);
  };
  console.log(children);

  const handleHoverEnd = () => {
    const newTimerId = setTimeout(() => {
      setVisible(false);
      if (onClose) {
        onClose();
        dismiss(props);
      }
    }, timeout);
    setTimerId(newTimerId);
  };

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      const newTimerId = setTimeout(() => {
        setVisible(false);
        if (onClose) {
          onClose();
          dismiss(props);
        }
      }, timeout);
      setTimerId(newTimerId);
      return () => clearTimeout(newTimerId);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ x: 50 }}
          animate={{ x: 0 }}
          exit={{ x: 500 }}
          onMouseEnter={handleHoverStart}
          onMouseLeave={handleHoverEnd}
        >
          <div
            className={`my-4 rounded-lg shadow-xl ${style.style} overflow-hidden`}
          >
            <div className="mx-4 flex items-center gap-3 py-2 font-semibold">
              <div className="w-5">{style.icon}</div>
              {children ?? <p>{content}</p>}
            </div>

            {/* Progress bar here */}
            <div className={`h-1 bg-transparent`}>
              <motion.div
                className="h-full bg-gradient-to-r from-white to-gray-600"
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: timeout / 1000, ease: "linear" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;
