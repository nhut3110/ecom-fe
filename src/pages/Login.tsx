import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import React, { useContext, useEffect } from "react";
import { useNavigatePage } from "../hooks";
import FacebookButton from "../components/Animation/FacebookButton";
import OutlineInput from "../components/CheckoutForm/OutlineInput";
import {
  LoginBackground,
  LogoTransparent,
  ShoppingArt,
} from "../assets/images";
import { login } from "../services";
import { NotificationContext } from "../context/NotificationContext";
import { getLocalStorageValue, updateLocalStorageValue } from "../utils";
import { validationLoginSchema } from "../constants";

const DELAY_BEFORE_REDIRECT = 1500;

export type LoginFormType = {
  email: string;
  password: string;
};

const Login = (): React.ReactElement => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: yupResolver(validationLoginSchema),
  });

  const { notify } = useContext(NotificationContext);
  const { redirect } = useNavigatePage();

  const { mutate } = useMutation(login, {
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

      setTimeout(() => {
        redirect("/");
      }, DELAY_BEFORE_REDIRECT);
    },
  });

  const containerVariants = {
    initial: {
      transition: {
        staggerChildren: 0.5,
      },
    },
    animate: {
      transition: {
        staggerChildren: 0.5,
        delay: 1.5,
      },
    },
  };

  const buttonVariants = {
    initial: { y: -30, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 1, type: "easeIn" },
  };

  const leftAppearVariants = {
    initial: { x: -200, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.5, type: "easeIn" },
  };

  const onSubmit = (loginData: LoginFormType) => {
    mutate(loginData);
  };

  useEffect(() => {
    const localStg = !!Object.keys(getLocalStorageValue({ key: "tokens" }))
      .length;

    if (localStg) redirect("/");
  }, []);

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="relative flex h-screen w-screen items-center justify-center lg:px-10"
    >
      <img
        src={LoginBackground}
        alt="login-background"
        className="object-fit absolute -z-0 h-full w-full lg:hidden"
      />
      <motion.div
        variants={leftAppearVariants}
        className="z-10 mx-3 my-auto flex h-fit w-full flex-col items-start justify-center rounded-lg border-2 bg-white px-10 py-10 shadow-2xl md:w-1/2 lg:w-1/3"
      >
        <img src={LogoTransparent} alt="logo" className="h-12" />

        <motion.div
          className="my-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, type: "easeIn" }}
        >
          <p className="mb-2 text-3xl font-semibold">Welcome!</p>
          <p className="text-base font-normal text-gray-400">
            Let&quot;s get started with us.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="mb-2 flex w-full items-center justify-center gap-3"
          transition={{ staggerChildren: 1 }}
        >
          <motion.div variants={buttonVariants}>
            <FacebookButton />
          </motion.div>
        </motion.div>

        <div className="flex w-full items-center justify-center">
          <hr className="border-1 my-2 h-px w-full bg-gray-200" />
          <div className="mx-2 flex items-center justify-center">
            <p className="text-sm font-semibold italic text-gray-600">or</p>
          </div>
          <hr className="border-1 my-2 h-px w-full bg-gray-200" />
        </div>

        <motion.form
          variants={leftAppearVariants}
          className="w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <OutlineInput
            label={"email"}
            name={"email"}
            register={register}
            error={errors}
          />

          <OutlineInput
            label={"password"}
            name={"password"}
            register={register}
            error={errors}
            type="password"
          />

          <motion.button
            whileHover={{ background: "gray" }}
            whileTap={{ scale: 0.8 }}
            className="mt-8 h-10 w-full rounded-lg border-2 bg-black font-semibold text-white "
          >
            Login
          </motion.button>
        </motion.form>

        <p className=" mt-5 w-full text-center text-sm font-normal text-gray-400">
          Not have an account?
          <Link
            to={"/register"}
            className="mt-5 w-full text-center text-sm font-semibold text-gray-500"
          >
            Register
          </Link>
        </p>
      </motion.div>

      <div className="hidden h-screen items-center justify-center lg:flex lg:w-2/3">
        <motion.img
          variants={leftAppearVariants}
          src={ShoppingArt}
          alt="background-login"
          className="h-2/3 object-cover "
        />
      </div>
    </motion.div>
  );
};

export default Login;
