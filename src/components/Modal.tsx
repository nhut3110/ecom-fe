import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PortalWrapper from "./PortalWrapper";

type ModalProps = {
  isOpen: boolean;
  onClose?: () => void;
  onSubmit?: () => void;
  title?: string;
  children: React.ReactElement | React.ReactElement[];
};

const modalVariants = {
  hidden: {
    y: "100vh",
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 50,
    },
  },
};

const Modal = ({ isOpen, onClose, onSubmit, title, children }: ModalProps) => {
  const [visibility, setVisibility] = useState<boolean>(isOpen);

  const handleSubmit = () => {
    setVisibility(false);
    onSubmit?.();
    onClose?.();
  };
  const handleClose = () => {
    setVisibility(false);
    onClose?.();
  };

  useEffect(() => {
    if (isOpen) setVisibility(true);
  }, [isOpen]);

  return (
    <PortalWrapper>
      <AnimatePresence>
        {visibility && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
            <motion.div
              className="mx-3 rounded-lg bg-white p-6 shadow-lg"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <h2 className="mb-4 text-lg font-medium">{title}</h2>
              <div className="mb-4">{children}</div>
              <div className="flex justify-end">
                <button
                  className="mr-2 rounded-md bg-gray-200 px-4 py-2 text-gray-800"
                  onClick={handleClose}
                >
                  Cancel
                </button>
                <button
                  className="rounded-md bg-black px-4 py-2 text-white"
                  onClick={handleSubmit}
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PortalWrapper>
  );
};

export default Modal;
