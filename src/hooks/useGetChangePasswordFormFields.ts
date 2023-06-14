import { ChangePasswordFormField } from "../pages/ChangePassword";

export const useGetChangePasswordFormFields = (isSocialUser?: boolean) => {
  let ChangePasswordFormFields: ChangePasswordFormField[] = [
    {
      label: "New Password",
      name: "newPassword",
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
    },
  ];

  if (!isSocialUser) {
    ChangePasswordFormFields = [
      {
        label: "Old Password",
        name: "oldPassword",
      },
      ...ChangePasswordFormFields,
    ];
  }

  return ChangePasswordFormFields;
};
