import { useMutation } from "@tanstack/react-query";
import { BiTrash } from "react-icons/bi";
import { AnimatePresence } from "framer-motion";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useValidateLoginExpiration } from "../../hooks";
import GifLoading from "./GifLoading";
import SlideDownDisappearWrapper from "../Animation/SlideDownDisappearWrapper";
import { UserDataContext } from "../../context/UserDataContext";
import { editAvatar } from "../../services/auth.api";
import { UploadIcon } from "../../assets/icons";
import { Button, Flex, Image, Modal, Upload, UploadFile } from "antd";
import ImgCrop from "antd-img-crop";
import { DeleteOutlined, InboxOutlined } from "@ant-design/icons";
import { UploadProps } from "antd/lib";
import { FileType, getBase64 } from "../Product/FanMoment";
import { getLocalStorageValue } from "../../utils";

type AvatarModalProps = {
  open: boolean;
  onSubmit?: () => void;
  onClose?: () => void;
  onChange?: (data: any) => void;
};

const AvatarModal = ({ open, onSubmit, onClose }: AvatarModalProps) => {
  const [openModal, setOpenModal] = useState<boolean>(open);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const { updateUserData } = useContext(UserDataContext);

  const isLogin = useMemo(
    () => !!Object.keys(getLocalStorageValue({ key: "tokens" })).length,
    []
  );

  const { mutate, isLoading: isMutating } = useMutation(editAvatar, {
    onSuccess: (response) => {
      updateUserData({ picture: response.picture });
    },
  });

  const handleFileChange: UploadProps["onChange"] = async ({
    fileList: newFileList,
  }) => {
    const doneFileList = newFileList.map((file) => ({
      ...file,
      status: "done",
    }));

    setFileList(doneFileList as UploadFile[]);
  };

  const onPreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleSubmitModal = () => {
    onSubmit?.();

    if (isLogin && fileList.length) {
      mutate(fileList[0].originFileObj as File, {
        onSuccess: (data) => {
          handleCloseModal();
          updateUserData({ picture: data.picture });
        },
      });
    }
  };

  const handleCloseModal = () => {
    onClose?.();
    setOpenModal(false);
  };

  useEffect(() => {
    setOpenModal(open);
  }, [open]);

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
        title="Change avatar"
        onCancel={handleCloseModal}
        onOk={handleSubmitModal}
        confirmLoading={isMutating}
      >
        <ImgCrop rotationSlider showReset cropShape="round">
          <Upload.Dragger
            name="files"
            onChange={handleFileChange}
            multiple={true}
            accept="image/*"
            maxCount={1}
            onPreview={onPreview}
            listType="picture"
            fileList={fileList}
          >
            <>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag files to this area to upload
              </p>
            </>
          </Upload.Dragger>
        </ImgCrop>
      </Modal>
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default AvatarModal;
