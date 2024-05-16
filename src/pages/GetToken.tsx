import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import { useNavigatePage } from "../hooks";
import { NotificationContext } from "../context/NotificationContext";
import { loginFacebook } from "../services";
import GifLoading from "../components/shared/GifLoading";
import { updateLocalStorageValue } from "../utils";
import { facebookConstants } from "../constants";
import { message } from "antd";

const DELAY_WHILE_LOADING = 2000;

const GetToken = () => {
  const [searchParams] = useSearchParams();
  const { redirect } = useNavigatePage();

  const { mutate, isLoading } = useMutation(loginFacebook, {
    onSuccess: (response) => {
      message.success(`Login successfully`);

      updateLocalStorageValue({
        key: "tokens",
        value: {
          accessToken: response?.accessToken,
          refreshToken: response?.refreshToken,
        },
      });

      const timer = setTimeout(() => {
        isLoading ? redirect("/") : redirect("/login");
      }, DELAY_WHILE_LOADING);

      return () => clearTimeout(timer);
    },
    onError: () => {
      message.error(`Wrong credentials`);
    },
  });

  useEffect(() => {
    const authCode = searchParams.get("code");
    if (authCode) {
      mutate({ code: authCode, callbackUrl: facebookConstants.callbackUrl });
    }
  }, []);

  return <GifLoading />;
};

export default GetToken;
