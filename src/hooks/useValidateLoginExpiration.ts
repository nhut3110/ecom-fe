import React, { useContext, useEffect, useState } from "react";
import { useNavigatePage } from "../hooks";
import { getUserById } from "../services/auth.api";
import { UserDataContext } from "../context/UserDataContext";
import { getLocalStorageValue } from "../utils";
import { UserData } from "../services/types.api";

export const useValidateLoginExpiration = () => {
  const { updateUserData } = useContext(UserDataContext);
  const { redirect } = useNavigatePage();

  const isLogin = !!Object.keys(getLocalStorageValue({ key: "tokens" })).length;

  const [userInfo, setUserInfo] = useState<UserData>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogout = () => {
    localStorage.removeItem("tokens");
    redirect("/login");
  };

  useEffect(() => {
    if (isLogin) {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const response = await getUserById();
          setUserInfo(response);
          setIsLoading(false);
          if (response) {
            updateUserData(response);
          }
        } catch (error) {}
      };

      fetchData();
    }
  }, [isLogin, updateUserData]);

  return { isLogin, userInfo, isLoading, handleLogout };
};
