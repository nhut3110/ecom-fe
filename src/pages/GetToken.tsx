import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import { useNavigatePage } from "../hooks";
import { NotificationContext } from "../context/NotificationContext";
import { loginFacebook } from "../services";
import GifLoading from "../components/GifLoading";
import { updateLocalStorageValue } from "../utils";
import { facebookConstants } from "../constants";

const DELAY_WHILE_LOADING = 2000;

const GetToken = () => {
  const [searchParams] = useSearchParams();
  const { notify } = useContext(NotificationContext);
  const { redirect } = useNavigatePage();

  const { mutate, isLoading } = useMutation(loginFacebook, {
    onSuccess: (response) => {
      notify({
        content: `Login successfully`,
        type: "success",
        open: true,
        id: crypto.randomUUID(),
      });

      updateLocalStorageValue({
        key: "tokens",
        value: {
          accessToken: response?.accessToken,
          refreshToken: response?.refreshToken,
        },
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
