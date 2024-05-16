import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigatePage } from "../hooks";
import GifLoading from "../components/shared/GifLoading";
import { updateLocalStorageValue } from "../utils";
import { message } from "antd";

const DELAY_WHILE_LOADING = 2000;

const GetGoogleToken = () => {
  const [searchParams] = useSearchParams();
  const { redirect } = useNavigatePage();
  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");

    updateLocalStorageValue({
      key: "tokens",
      value: {
        accessToken,
        refreshToken,
      },
    });

    message.success("Login successfully");

    const timer = setTimeout(() => {
      redirect("/");
    }, DELAY_WHILE_LOADING);

    return () => clearTimeout(timer);
  }, []);

  return <GifLoading />;
};

export default GetGoogleToken;
