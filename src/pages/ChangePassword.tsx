import { Path, useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext, useState } from "react";
import { useGetChangePasswordFormFields, useNavigatePage } from "../hooks";
import OutlineInput from "../components/CheckoutForm/OutlineInput";
import Modal from "../components/Modal";
import SmallButton from "../components/SmallButton";
import { changePassword } from "../services/auth.api";
import { NotificationContext } from "../context/NotificationContext";
import { ErrorResponseType } from "../services/types.api";
import { UserDataContext } from "../context/UserDataContext";
import { AccountType, validationChangePasswordSchema } from "../constants";

export type ChangePasswordFormType = {
  oldPassword: string;
  newPassword: string;
  confirmPassword?: string;
};

export type ChangePasswordFormField = {
  label: string;
  name: Path<any>;
};

const ChangePassword = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [newData, setNewData] = useState<ChangePasswordFormType>();

  const { redirect } = useNavigatePage();

  const { notify } = useContext(NotificationContext);

  const ChangePasswordFormFields = useGetChangePasswordFormFields();
  const { mutate } = useMutation(changePassword, {
    onSuccess: () => {
      notify({
        content: `Change password successfully`,
        type: "success",
        open: true,
        id: crypto.randomUUID(),
      });

      redirect("/profile");
    },
    onError: (axiosResponse: AxiosError) => {
      const { response } = axiosResponse;
      const messageData = response?.data as ErrorResponseType;
      notify({
        content: messageData.message,
        type: "error",
        open: true,
        id: crypto.randomUUID(),
      });
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormType>({
    resolver: yupResolver(validationChangePasswordSchema),
  });

  const onSubmit = ({ oldPassword, newPassword }: ChangePasswordFormType) => {
    setOpenModal(true);
    setNewData({
      oldPassword,
      newPassword,
    });
  };

  const handleSubmitEditProfile = () => {
    if (newData) mutate(newData);
    setOpenModal(false);
  };

  return (
    <div className="mx-auto my-5 w-4/5">
      <p className="text-xl font-bold">Change your password</p>
      <hr className="my-2 h-px border-0 bg-gray-200" />
      <div className="mx-auto my-10 flex w-full flex-col rounded-lg border-2 p-5 shadow-lg md:w-2/3">
        <form>
          {ChangePasswordFormFields.map((field, index) => (
            <OutlineInput
              label={field.label}
              name={field.name}
              register={register}
              error={errors}
              key={index}
              type="password"
            />
          ))}
        </form>
        <div className="flex self-end">
          <SmallButton content="Back" onClick={() => redirect("/profile")} />
          <SmallButton content="Edit" onClick={handleSubmit(onSubmit)} />
        </div>
      </div>
      <Modal
        open={openModal}
        title="Change password"
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmitEditProfile}
      >
        <p>Are you sure to change your password?</p>
      </Modal>
    </div>
  );
};

export default ChangePassword;
