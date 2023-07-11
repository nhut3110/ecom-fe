import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { useValidateLoginExpiration } from "../hooks";

const ValidateLoginModal = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { isLogin, isLoading, userInfo, handleLogout } =
    useValidateLoginExpiration();

  const handleSubmitModal = () => {
    setOpenModal(false);
    handleLogout();
  };

  useEffect(() => {
    if (isLoading || !isLogin) return;

    if (!userInfo) {
      setOpenModal(true);
    }
  }, [isLoading, userInfo]);

  return (
    <Modal open={openModal} title="Warning" onSubmit={handleSubmitModal}>
      <p>Session expired, please login again!</p>
    </Modal>
  );
};

export default ValidateLoginModal;
