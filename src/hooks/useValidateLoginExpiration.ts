import React, { useContext, useMemo } from "react";
import { getUserInfo } from "../services/auth.api";
import { getLocalStorageValue } from "../utils/localStorage";
import { AuthContext } from "../context/AuthContext";
import { useNavigatePage } from "../hooks/useNavigatePage";
import decodeIdFromJWT from "../utils/decodeIdFromJWT";

export const useValidateLoginExpiration = () => {
  const { authState, removeUserData } = useContext(AuthContext);

  const { redirect } = useNavigatePage();

  const isLogin = useMemo(() => {
    return !!Object.keys(getLocalStorageValue({ key: "tokens" })).length;
  }, [authState]);

  const userId =
    authState.id ||
    decodeIdFromJWT(getLocalStorageValue({ key: "tokens" })?.accessToken);
  const { userInfo, isLoading } = getUserInfo({ id: userId! });

  const handleLogout = () => {
    removeUserData();
    localStorage.removeItem("tokens");
    redirect("/login");
  };

  return { isLogin, isLoading, userInfo, handleLogout };
};
