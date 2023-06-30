import { useMutation } from "@tanstack/react-query";
import { BiTrash } from "react-icons/bi";
import { AnimatePresence } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { useValidateLoginExpiration } from "../hooks";
import GifLoading from "./GifLoading";
import Modal from "./Modal";
import SlideDownDisappearWrapper from "./Animation/SlideDownDisappearWrapper";
import { UserDataContext } from "../context/UserDataContext";
import { editAvatar } from "../services/auth.api";
import { UploadIcon } from "../assets/icons";

type AvatarModalProps = {
  open: boolean;
  onSubmit?: () => void;
  onClose?: () => void;
};

const AvatarModal = ({ open, onSubmit, onClose }: AvatarModalProps) => {
  const [openModal, setOpenModal] = useState<boolean>(open);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const { updateUserData } = useContext(UserDataContext);

  const { isLogin } = useValidateLoginExpiration();

  const { mutate, isLoading: isMutating } = useMutation(editAvatar, {
    onSuccess: (response) => {
      updateUserData({ picture: response.picture });
    },
  });

  const handleSubmitModal = () => {
    onSubmit?.();

    if (selectedImage && isLogin) {
      mutate(selectedImage);
    }

    setOpenModal(false);
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files && event.dataTransfer.files[0];

    if (file) {
      setSelectedImage(file);
    }
  };

  const handleCloseModal = () => {
    onClose?.();
    setOpenModal(false);
  };

  useEffect(() => {
    setOpenModal(open);
  }, [open]);

  useEffect(() => {
    if (selectedImage && isLogin) {
      mutate(selectedImage);
    }
  }, [isLogin]);

  return (
    <>
      {isMutating && (
        <AnimatePresence>
          <SlideDownDisappearWrapper>
            <div className="flex h-screen w-full items-center justify-center">
              <GifLoading />
            </div>
          </SlideDownDisappearWrapper>
        </AnimatePresence>
      )}
      <Modal
        open={openModal}
        title="Edit avatar"
        onClose={handleCloseModal}
        onSubmit={handleSubmitModal}
      >
        <div
          className={`flex w-full min-w-[19rem] items-center justify-center ${
            isDragging ? "bg-gray-200" : ""
          }`}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragEnter}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <label
            htmlFor="dropzone-file"
            className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
          >
            {selectedImage ? (
              <div className="relative">
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="uploaded"
                  className="mb-3 h-32 w-32 rounded-full object-contain"
                />
                <button
                  className="absolute -top-3 -right-3 rounded-full bg-white p-1 text-sm text-red-500 underline"
                  onClick={() => setSelectedImage(null)}
                >
                  <BiTrash size={20} />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <img
                  src={UploadIcon}
                  alt="upload"
                  className="mb-3 h-10 w-10 text-gray-400"
                />
                <p className="mb-2 text-sm text-gray-500">
                  {isDragging ? (
                    <span className="font-semibold">Drop the file here</span>
                  ) : (
                    <span className="font-semibold">Click to upload</span>
                  )}{" "}
                  or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG or JPG (MAX. 10MB)
                </p>
              </div>
            )}
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleFileInputChange}
            />
          </label>
        </div>
      </Modal>
    </>
  );
};

export default AvatarModal;
