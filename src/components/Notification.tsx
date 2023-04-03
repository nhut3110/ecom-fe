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
};

type NotificationStyle = {
  style: string;
  icon: React.ReactElement;
};

const NOTIFICATION_DURATION = 1500; // appear 1.5s

const Notification = (props: NotificationProps): React.ReactElement => {
  const { id, isOpen, onClose, children, content, type } = props;
  const [visible, setVisible] = useState<boolean>(false);
  const [style, setStyle] = useState<NotificationStyle>(() =>
    determineNotificationType(type)
  );
  const { removeNotification } = useContext(NotificationContext);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) {
          onClose();
          removeNotification(props);
        }
      }, NOTIFICATION_DURATION);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div initial={{ x: 50 }} animate={{ x: 0 }} exit={{ x: 500 }}>
          <div
            className={`my-4 rounded-lg p-6 py-2 px-4 shadow-xl ${style.style} flex items-center justify-center gap-3`}
          >
            <div className="w-5">{style.icon}</div>
            {children ?? <p>{content}</p>}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;
