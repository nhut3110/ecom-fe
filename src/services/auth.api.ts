import { useQuery } from "@tanstack/react-query";
import { api } from "./api";

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

const loginFacebook = async (loginData: FacebookLoginType) => {
  const response = await api.post("/auth/facebook", loginData);

  return response.data;
};

const login = async (loginData: LoginType) => {
  const response = await api.post("/auth/login", loginData);

  return response.data;
};

const getUserByEmail = async (email: string) => {
  const response = await api.get(`users/${email}`);

  return response.data;
};

const getUserInfo = ({ email }: { email: string }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => getUserByEmail(email),
  });

  return { userInfo: data, error, isLoading };
};

export { login, getUserInfo, loginFacebook };
