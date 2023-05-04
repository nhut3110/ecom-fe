import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import DotsLoading from "../components/Animation/DotsLoading";
import { updateLocalStorageValue } from "../utils/LocalStorage";
import { NotificationContext } from "../context/NotificationContext";
import { useNavigatePage } from "../hooks/useNavigatePage";

const DELAY_WHILE_LOADING = 2000;

const GetToken = () => {
  const { token } = useParams();
  const { notify } = useContext(NotificationContext);
  const { redirect } = useNavigatePage();

  useEffect(() => {
    token && updateLocalStorageValue({ key: "key", value: atob(token) });
    notify({
      content: `Redirecting...`,
      type: token ? "success" : "error",
      open: true,
      id: crypto.randomUUID(),
    });
    const timer = setTimeout(() => {
      token ? redirect("/") : redirect("/login");
    }, DELAY_WHILE_LOADING);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <DotsLoading />
    </div>
  );
};

export default GetToken;
