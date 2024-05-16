import React, { useEffect, useState } from "react";
import { useValidateLoginExpiration } from "../../hooks";
import { Modal } from "antd";

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
    <Modal open={openModal} title="Warning" onOk={handleSubmitModal}>
      <p>Session expired, please login again!</p>
    </Modal>
  );
};

export default ValidateLoginModal;
