import React, { useContext, useEffect } from "react";
import { useNavigatePage } from "../hooks";
import { getUserInfo } from "../services/auth.api";
import { UserDataContext } from "../context/UserDataContext";
import { getLocalStorageValue } from "../utils";

export const useValidateLoginExpiration = () => {
  const { updateUserData } = useContext(UserDataContext);

  const { redirect } = useNavigatePage();

  const isLogin = !!Object.keys(getLocalStorageValue({ key: "tokens" })).length;

  const { userInfo, isLoading } = getUserInfo();

  const handleLogout = () => {
    localStorage.removeItem("tokens");
    redirect("/login");
  };

  useEffect(() => {
    if (!isLoading && userInfo) updateUserData(userInfo);
  }, [isLoading, userInfo]);

  return { isLogin, isLoading, userInfo, handleLogout };
};
