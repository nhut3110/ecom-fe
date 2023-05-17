import axios from "axios";
import { checkIsTokenExpired } from "./checkIsTokenExpired";
import { getTokensFromLocalStorage } from "./getTokensFromLocalStorage";
import { refreshToken } from "./refreshToken";

type ApiInstanceType = { isPublic?: boolean; baseURL?: string };

const BASE_URL_API = "http://localhost:3000/";

let refreshTokenFn: any = null;

export function createApiInstance({ isPublic, baseURL }: ApiInstanceType) {
  const instance = axios.create({
    baseURL: baseURL ?? BASE_URL_API,
  });

  instance.interceptors.request.use(
    async (config: any) => {
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
    },

    (error: any) => {
      return Promise.reject(error);
    }
  );

  return instance;
}
