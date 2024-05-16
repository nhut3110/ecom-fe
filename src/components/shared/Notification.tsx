import { motion, AnimatePresence } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { NotificationContext } from "../../context/NotificationContext";
import { determineNotificationType } from "../../utils";

export type NotificationType = {
  id?: string;
  open: boolean;
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
}: NotificationType): React.ReactElement => {
  const { open, onClose, children, content, type } = props;
  const [visible, setVisible] = useState<boolean>(false);
  const [style, setStyle] = useState<NotificationStyle>(() =>
    determineNotificationType(type)
  );
  const { dismiss } = useContext(NotificationContext);
  const [timerId, setTimerId] = useState<any>();

  const handleHoverStart = () => {
    clearTimeout(timerId);
  };

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
    if (open) {
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
  }, [open]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ x: 50 }}
          animate={{ x: -10 }}
          exit={{ x: "100vw" }}
          onMouseEnter={handleHoverStart}
          onMouseLeave={handleHoverEnd}
        >
          <div
            className={`my-4 rounded-lg shadow-xl ${style.style} overflow-hidden`}
          >
            <div className="mx-4 flex items-center gap-3 py-2 font-semibold">
              <div className="w-5">{style.icon}</div>
              {children ?? (
                <p className="line-clamp-2 max-w-[16rem]">{content}</p>
              )}
            </div>

            {/* Progress bar here */}
            <div className={`h-1 bg-transparent`}>
              <motion.div
                className="h-full bg-gray-200"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
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
