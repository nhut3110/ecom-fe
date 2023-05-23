import { Path, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext, useState } from "react";
import OutlineInput from "../components/CheckoutForm/OutlineInput";
import Modal from "../components/Modal";
import { validationChangePasswordSchema } from "../constants/validate";
import SmallButton from "../components/SmallButton";
import { useNavigatePage } from "../hooks/useNavigatePage";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../services/auth.api";
import { NotificationContext } from "../context/NotificationContext";

export type ChangePasswordFormType = {
  oldPassword: string;
  newPassword: string;
  confirmPassword?: string;
};

type ChangePasswordFormField = {
  label: string;
  name: Path<any>;
};

const ChangePasswordFormFields: ChangePasswordFormField[] = [
  {
    label: "Old Password",
    name: "oldPassword",
  },
  {
    label: "New Password",
    name: "newPassword",
  },
  {
    label: "Confirm Password",
    name: "confirmPassword",
  },
];

const ChangePassword = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [newData, setNewData] = useState<ChangePasswordFormType>();
  const { redirect } = useNavigatePage();
  const { notify } = useContext(NotificationContext);
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
    onError: (axiosResponse: any) => {
      const message = axiosResponse.response.data.message;
      notify({
        content: message,
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

  const onSubmit = (data: ChangePasswordFormType) => {
    setOpenModal(true);
    setNewData({
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    });
  };

  const handleCloseModal = () => setOpenModal(false);

  const handleSubmitEditProfile = () => {
    if (newData) mutate(newData);
    handleCloseModal();
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
          <SmallButton name="Back" onClick={() => redirect("/profile")} />
          <SmallButton name="Edit" onClick={handleSubmit(onSubmit)} />
        </div>
      </div>
      <Modal
        open={openModal}
        title="Change password"
        onClose={handleCloseModal}
        onSubmit={handleSubmitEditProfile}
      >
        <p>Are you sure to change your password?</p>
      </Modal>
    </div>
  );
};

export default ChangePassword;
