import { Path, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { useNavigatePage } from "../hooks";
import OutlineInput from "../components/CheckoutForm/OutlineInput";
import Modal from "../components/Modal";
import SmallButton from "../components/SmallButton";
import { editProfile } from "../services";
import { NotificationContext } from "../context/NotificationContext";
import { deleteEmptyStringKeys } from "../utils";
import { UserDataContext } from "../context/UserDataContext";
import { EditProfileFormType, validationEditProfileSchema } from "../constants";

type EditProfileFormField = {
  label: string;
  name: Path<any>;
};

const EditProfileFormFields: EditProfileFormField[] = [
  {
    label: "Name",
    name: "name",
  },
  {
    label: "Phone Number",
    name: "phoneNumber",
  },
];

const EditProfile = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [newData, setNewData] = useState<EditProfileFormType>();
  const { redirect } = useNavigatePage();
  const { notify } = useContext(NotificationContext);
  const { userDataState } = useContext(UserDataContext);
  const { mutate } = useMutation(editProfile, {
    onSuccess: () => {
      notify({
        content: `Edited successfully`,
        type: "success",
        open: true,
        id: crypto.randomUUID(),
      });

      redirect("/profile");
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileFormType>({
    resolver: yupResolver(validationEditProfileSchema),
    defaultValues: {
      name: userDataState.name,
      phoneNumber: userDataState.phoneNumber,
    },
  });

  const onSubmit = (data: EditProfileFormType) => {
    const temp = deleteEmptyStringKeys(data);
    setNewData(temp);
    setOpenModal(true);
  };

  const handleSubmitEditProfile = () => {
    if (newData) mutate(newData);
    setOpenModal(false);
  };

  return (
    <div className="mx-auto my-5 w-4/5">
      <p className="text-xl font-bold">Edit your personal info</p>
      <hr className="my-2 h-px border-0 bg-gray-200" />
      <div className="mx-auto my-10 flex w-full flex-col rounded-lg border-2 p-5 shadow-lg md:w-2/3">
        <form>
          {EditProfileFormFields.map((field, index) => (
            <OutlineInput
              label={field.label}
              name={field.name}
              register={register}
              error={errors}
              key={index}
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
        title="Edit Profile"
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmitEditProfile}
      >
        <p>Are you sure to edit?</p>
      </Modal>
    </div>
  );
};

export default EditProfile;
