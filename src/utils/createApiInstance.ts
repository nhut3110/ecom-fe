import { checkIsTokenExpired } from "./checkIsTokenExpired";
import { getTokensFromLocalStorage } from "./getTokensFromLocalStorage";
import { refreshToken } from "./refreshToken";
import { TokensType } from "../services";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

type ApiInstanceType = { isPublic?: boolean; baseURL?: string };

let refreshTokenFn: Promise<void | TokensType> | null = null;

export function createApiInstance({ isPublic, baseURL }: ApiInstanceType) {
  const BASE_URL_API = "http://localhost:3000/";
  const instance = axios.create({
    baseURL: baseURL ?? BASE_URL_API,
  });

  instance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      if (isPublic) return config;

      if (checkIsTokenExpired(getTokensFromLocalStorage()?.accessToken)) {
        refreshTokenFn = refreshTokenFn ?? refreshToken();
        await refreshTokenFn;
        refreshTokenFn = null;
      }

      const tokens = getTokensFromLocalStorage();
      if (tokens && tokens.accessToken) {
        config.headers.Authorization = `Bearer ${tokens.accessToken}`;
        return config;
      }

      return config;
    },

    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  return instance;
}
