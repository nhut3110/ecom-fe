import React, { useContext, useEffect, useState, useMemo } from "react";
import { useNavigatePage } from "../hooks";
import { UserDataContext } from "../context/UserDataContext";
import { getLocalStorageValue } from "../utils";
import { UserData, getUserById } from "../services";

export const useValidateLoginExpiration = () => {
  const { updateUserData } = useContext(UserDataContext);
  const { redirect } = useNavigatePage();

  const isLogin = !!Object.keys(getLocalStorageValue({ key: "tokens" })).length;

  const [userInfo, setUserInfo] = useState<UserData>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleLogout = () => {
    localStorage.removeItem("tokens");
    redirect("/login");
  };

  const fetchData = useMemo(
    () => async () => {
      try {
        setIsLoading(true);

        const response = await getUserById();

        setUserInfo(response);
        setIsLoading(false);

        if (response) {
          updateUserData(response);
        }
      } catch (error) {
        setIsLoading(false);
      }
    },
    [updateUserData]
  );

  useEffect(() => {
    if (isLogin) {
      fetchData();
    }
  }, [isLogin, fetchData]);

  return { isLogin, userInfo, isLoading, handleLogout };
};
