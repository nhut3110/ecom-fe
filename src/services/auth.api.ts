import { useQuery } from "@tanstack/react-query";
import { authApi, publicApi } from "./api";
import {
  FacebookLoginType,
  LoginType,
  TokensType,
  UserData,
} from "./types.api";
import { ChangePasswordFormType } from "../pages/ChangePassword";
import { checkIsTokenExpired } from "../utils";
import { EditProfileFormType } from "../constants";

const getNewTokens = async (
  refreshToken?: string
): Promise<TokensType | void> => {
  if (checkIsTokenExpired(refreshToken))
    return localStorage.removeItem("tokens");

  const { data } = await publicApi.post("/auth/refresh-token", {
    refreshToken: refreshToken,
  });

  return data;
};

const loginFacebook = async (loginData: FacebookLoginType) => {
  const { data } = await publicApi.post("/auth/facebook", loginData);

  return data;
};

const login = async (loginData: LoginType) => {
  const { data } = await publicApi.post("/auth/login", loginData);

  return data;
};

const editProfile = async (profileData: EditProfileFormType) => {
  const { data } = await authApi.patch("/users/me", profileData);

  return data;
};

const changePassword = async (passwordData: ChangePasswordFormType) => {
  const { data } = await authApi.patch("/auth/password", passwordData);

  return data;
};

const editAvatar = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await authApi.patch("/users/me/avatar", formData);

  return data;
};

const getUserById = async () => {
  const response = await authApi.get(`users/me`);
  const result: UserData = response.data;

  return result;
};

const getUserInfo = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserById,
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
