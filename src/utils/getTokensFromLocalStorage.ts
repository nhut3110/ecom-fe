import { UserDataType } from "../services/auth.api";
import { getLocalStorageValue } from "./localStorage";

export const getTokensFromLocalStorage = (): UserDataType | null => {
  const user = getLocalStorageValue({ key: "tokens" });
  if (!user) {
    return null;
  }

  return {
    accessToken: user.accessToken,
    refreshToken: user.refreshToken,
  };
};
