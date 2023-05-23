import React, { useContext, useMemo, useEffect } from "react";
import { getUserInfo } from "../services/auth.api";
import { getLocalStorageValue } from "../utils/localStorage";
import { AuthContext } from "../context/AuthContext";
import { useNavigatePage } from "../hooks/useNavigatePage";
import { UserDataContext } from "../context/UserDataContext";

export const useValidateLoginExpiration = () => {
  const { authState, removeUserData } = useContext(AuthContext);

  const { updateUserData } = useContext(UserDataContext);

  const { redirect } = useNavigatePage();

  const isLogin = useMemo(() => {
    return !!Object.keys(getLocalStorageValue({ key: "tokens" })).length;
  }, [authState]);

  const { userInfo, isLoading } = getUserInfo();

  const handleLogout = () => {
    removeUserData();
    localStorage.removeItem("tokens");
    redirect("/login");
  };

  useEffect(() => {
    if (!isLoading && userInfo) updateUserData(userInfo);
  }, [isLoading]);

  return { isLogin, isLoading, userInfo, handleLogout };
};
