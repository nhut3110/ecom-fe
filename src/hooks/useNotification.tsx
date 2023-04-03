import React, { useState } from "react";
import Notification from "../components/Notification";

export const useNotification = () => {
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);

  const handleOpenNotification = () => {
    setShowNotification(true);
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  const renderNotification = () => {
    return (
      <Notification
        isOpen={showNotification}
        onClose={handleCloseNotification}
        content={content}
        isError={isError}
      ></Notification>
    );
  };

  return {
    renderNotification,
    setContent,
    setIsError,
    handleOpenNotification,
    handleCloseNotification,
  };
};
