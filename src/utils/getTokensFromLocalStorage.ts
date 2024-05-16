import { TokensType } from "../services";
import { getLocalStorageValue } from "./localStorageUtils";

export const getTokensFromLocalStorage = (): TokensType | null => {
  const user = getLocalStorageValue({ key: "tokens" });
  if (!user) {
    return null;
  }

  return {
    accessToken: user.accessToken,
    refreshToken: user.refreshToken,
  };
};
