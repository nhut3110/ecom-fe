import React, { useContext, useMemo } from "react";
import { getUserInfo } from "../services/auth.api";
import { getLocalStorageValue } from "../utils/localStorage";
import DecodeEmailFromJWT from "../utils/decodeJWT";
import { AuthContext } from "../context/AuthContext";
import { useNavigatePage } from "../hooks/useNavigatePage";

export const useValidateLoginExpiration = () => {
  const { authState, removeUserData } = useContext(AuthContext);

  const { redirect } = useNavigatePage();

  const isLogin = useMemo(() => {
    return !!Object.keys(getLocalStorageValue({ key: "key" })).length;
  }, [authState]);

  const userEmail =
    getLocalStorageValue({ key: "key" }).email ||
    DecodeEmailFromJWT(getLocalStorageValue({ key: "key" })?.accessToken);
  const { userInfo, isLoading } = getUserInfo({ email: userEmail });

  const handleLogout = () => {
    removeUserData();
    localStorage.removeItem("key");
    redirect("/login");
  };

  return { isLogin, isLoading, userInfo, handleLogout };
};
