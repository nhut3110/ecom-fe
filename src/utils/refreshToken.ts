import { getNewTokens } from "../services";
import { getTokensFromLocalStorage } from "./getTokensFromLocalStorage";
import { updateLocalStorageValue } from "./localStorage";

export const refreshToken = async () => {
  const user = getTokensFromLocalStorage();

  try {
    const data = await getNewTokens(user?.refreshToken);
    updateLocalStorageValue({
      key: "tokens",
      value: data,
    });

    return data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      localStorage.removeItem("tokens");
    }

    throw error;
  }
};
