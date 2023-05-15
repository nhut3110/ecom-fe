import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import {
  getLocalStorageValue,
  updateLocalStorageValue,
} from "../utils/localStorage";
import { UserDataType } from "./auth.api";
import { checkIsTokenExpired } from "../utils/checkIsTokenExpired";

const BASE_URL_API = "http://localhost:3000/";
const publicApiRoutes: string[] = [
  "/auth/login",
  "/auth/facebook",
  "/auth/refresh-token",
];

export const api = axios.create({
  baseURL: BASE_URL_API,
});

const getUserData = (): UserDataType | null => {
  const user = getLocalStorageValue({ key: "key" });
  if (!user) {
    return null;
  }

  return {
    accessToken: user.accessToken,
    refreshToken: user.refreshToken,
    email: user.email,
  };
};

const refreshToken = async () => {
  const user = getUserData();

  try {
    const { data } = await api.post("/auth/refresh-token", {
      refreshToken: user?.refreshToken,
    });
    updateLocalStorageValue({
      key: "key",
      value: { ...data, email: user?.email },
    });

    return data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      localStorage.removeItem("key");
    }

    throw error;
  }
};

const checkPublicRoute = (route?: string): boolean => {
  if (!route) return false;

  return publicApiRoutes.includes(route);
};

let refreshTokenFn: any = null;

api.interceptors.request.use(
  async (config) => {
    if (checkPublicRoute(config.url)) return config;

    if (checkIsTokenExpired(getUserData()?.accessToken)) {
      refreshTokenFn = refreshTokenFn ?? refreshToken();
      await refreshTokenFn;
      refreshTokenFn = null;
    }

    const user = getUserData();
    if (user && user.accessToken) {
      config.headers.Authorization = `Bearer ${user.accessToken}`;

      return config;
    }

    throw new Error("Invalid authorization");
  },

  (error) => {
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let requestsQueue: ((token: string) => void)[] = [];

const processQueue = (token: string) => {
  requestsQueue.forEach((callback) => callback(token));
  requestsQueue = [];
};

api.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const originalRequest = error.config;

    if (checkPublicRoute(originalRequest.url)) return Promise.reject(error);

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          requestsQueue.push((token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          });
        });
      }

      originalRequest._retry = true;

      try {
        isRefreshing = true;
        const tokens = await refreshToken();
        if (tokens.accessToken) {
          originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;

          const originalResponse = await api(originalRequest);

          processQueue(tokens.accessToken);

          return originalResponse;
        }
      } catch (error) {
        throw error;
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
