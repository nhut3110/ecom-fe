import { useQuery } from "@tanstack/react-query";
import { authApi, publicApi } from "./api";

export type UserDataType = {
  email?: string;
  accessToken?: string;
  refreshToken?: string;
};

type LoginType = {
  email: string;
  password: string;
};

type FacebookLoginType = {
  code: string;
  callbackUrl: string;
};

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

const getUserById = async (id: string) => {
  const response = await authApi.get(`users/me/${id}`);

  return response.data;
};

const getUserInfo = ({ id }: { id: string }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => getUserById(id),
  });

  return { userInfo: data?.dataValues, error, isLoading };
};

export { login, getUserInfo, loginFacebook, getNewTokens };
