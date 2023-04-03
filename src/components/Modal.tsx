import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  children: React.ReactElement | React.ReactElement[];
};

const modalVariant = {
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
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    onSubmit();
    setIsLoading(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div
            className="mx-3 rounded-lg bg-white p-6 shadow-lg"
            variants={modalVariant}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <h2 className="mb-4 text-lg font-medium">{title}</h2>
            <div className="mb-4">{children}</div>
            <div className="flex justify-end">
              <button
                className="mr-2 rounded-md bg-gray-200 px-4 py-2 text-gray-800"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="rounded-md bg-black px-4 py-2 text-white"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                Confirm
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
