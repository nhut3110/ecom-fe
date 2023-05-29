import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import DotsLoading from "../components/Animation/DotsLoading";
import { updateLocalStorageValue } from "../utils/localStorage";
import { NotificationContext } from "../context/NotificationContext";
import { useNavigatePage } from "../hooks/useNavigatePage";
import { loginFacebook } from "../services/auth.api";
import { AuthContext } from "../context/AuthContext";
import { facebookConstants } from "../constants/data";
import decodeIdFromJWT from "../utils/decodeIdFromJWT";
import GifLoading from "../components/GifLoading";

const DELAY_WHILE_LOADING = 2000;

const GetToken = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { notify } = useContext(NotificationContext);
  const { updateUserData } = useContext(AuthContext);
  const { redirect } = useNavigatePage();

  const { mutate, isLoading } = useMutation(loginFacebook, {
    onSuccess: (response) => {
      notify({
        content: `Login successfully`,
        type: "success",
        open: true,
        id: crypto.randomUUID(),
      });

      updateUserData({
        id: decodeIdFromJWT(response?.accessToken),
        accessToken: response?.accessToken,
        refreshToken: response?.refreshToken,
      });
    },
    onError: () => {
      notify({
        content: `Wrong credentials`,
        type: "error",
        open: true,
        id: crypto.randomUUID(),
      });
    },
  });

  useEffect(() => {
    const authCode = searchParams.get("code");
    if (authCode) {
      mutate({ code: authCode, callbackUrl: facebookConstants.callbackUrl });
    }

    if (!isLoading) {
      const timer = setTimeout(() => {
        isLoading ? redirect("/") : redirect("/login");
      }, DELAY_WHILE_LOADING);

      return () => clearTimeout(timer);
    }
  }, []);

  return <GifLoading />;
};

export default GetToken;
