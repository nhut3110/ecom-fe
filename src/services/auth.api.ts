import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  getLocalStorageValue,
  updateLocalStorageValue,
} from "../utils/LocalStorage";

export type UserDataType = {
  accessToken: string;
  refreshToken?: string;
};

type LoginType = {
  email: string;
  password: string;
};

const authApi = axios.create({
  baseURL: "http://localhost:3000/auth",
});

const getUserData = (): UserDataType | null => {
  const user = getLocalStorageValue({ key: "key" });
  if (!user) {
    return null;
  }

  return { accessToken: user.accessToken, refreshToken: user.refreshToken };
};

const refreshToken = async () => {
  try {
    const { data } = await authApi.post("/refresh-token", {
      refreshToken: getUserData()?.refreshToken,
    });
    updateLocalStorageValue({ key: "key", value: data });

    return data.accessToken;
  } catch (error: any) {
    if (error.response?.status === 401) {
      localStorage.removeItem("key");
    }
    throw error;
  }
};

authApi.interceptors.request.use(
  (config) => {
    const user = getUserData();
    if (user && user.accessToken) {
      config.headers.Authorization = `Bearer ${user.accessToken}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

authApi.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const originalRequest = error.config;

    if (originalRequest.url === "/auth/login") return Promise.reject(error);

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const accessToken = await refreshToken();
        if (accessToken) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;

          return authApi(originalRequest);
        }
      } catch (error) {
        throw error;
      }
    }

    return Promise.reject(error);
  }
);

const login = (loginData: LoginType) => {
  return authApi.post("/login", loginData).then((response) => {
    updateLocalStorageValue({
      key: "key",
      value: {
        accessToken: response.data?.accessToken,
        refreshToken: response.data?.refreshToken,
      },
    });

    return response.data;
  });
};

export { authApi as api, login };
