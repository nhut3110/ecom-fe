import { useQuery } from "@tanstack/react-query";
import { authApi, publicApi } from "./api";
import { FacebookLoginType, LoginType, UserData } from "./types.api";
import { EditProfileFormType } from "../pages/EditProfile";
import { ChangePasswordFormType } from "../pages/ChangePassword";

const getNewTokens = async (refreshToken?: string) => {
  if (!refreshToken) return;

  const { data } = await publicApi.post("/auth/refresh-token", {
    refreshToken: refreshToken,
  });

  return data;
};

const loginFacebook = async (loginData: FacebookLoginType) => {
  const response = await publicApi.post("/auth/facebook", loginData);

  return response.data;
};

const login = async (loginData: LoginType) => {
  const response = await publicApi.post("/auth/login", loginData);

  return response.data;
};

const editProfile = async (profileData: EditProfileFormType) => {
  const response = await authApi.patch("/users/me", profileData);

  return response.data;
};

const changePassword = async (passwordData: ChangePasswordFormType) => {
  const response = await authApi.patch("/auth/password", passwordData);

  return response.data;
};

const editAvatar = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await authApi.patch("/users/me/avatar", formData);

  return response.data;
};

const getUserById = async () => {
  const response = await authApi.get(`users/me`);
  const result: UserData = response.data;

  return result;
};

const getUserInfo = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => getUserById(),
  });

  return { userInfo: data, error, isLoading };
};

export {
  login,
  getUserInfo,
  loginFacebook,
  getNewTokens,
  editProfile,
  changePassword,
  editAvatar,
};
