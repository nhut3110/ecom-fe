import React, { useContext, useMemo } from "react";
import { getUserInfo } from "../services/auth.api";
import { getLocalStorageValue } from "../utils/localStorage";
import decodeEmailFromJWT from "../utils/decodeEmailFromJWT";
import { AuthContext } from "../context/AuthContext";
import { useNavigatePage } from "../hooks/useNavigatePage";

export const useValidateLoginExpiration = () => {
  const { authState, removeUserData } = useContext(AuthContext);

  const { redirect } = useNavigatePage();

  const isLogin = useMemo(() => {
    return !!Object.keys(getLocalStorageValue({ key: "tokens" })).length;
  }, [authState]);

  const userEmail =
    authState.email ||
    decodeEmailFromJWT(getLocalStorageValue({ key: "tokens" })?.accessToken);
  const { userInfo, isLoading } = getUserInfo({ email: userEmail! });

  const handleLogout = () => {
    removeUserData();
    localStorage.removeItem("tokens");
    redirect("/login");
  };

  return { isLogin, isLoading, userInfo, handleLogout };
};
