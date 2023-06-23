import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { useNavigatePage } from "../hooks";
import AvatarModal from "../components/AvatarModal";
import OutlineInput from "../components/CheckoutForm/OutlineInput";
import {
  LoginBackground,
  LogoTransparent,
  ShoppingArt,
} from "../assets/images";
import { register as registerFn, login } from "../services/auth.api";
import { NotificationContext } from "../context/NotificationContext";
import { registerFields, validationRegisterSchema } from "../constants";
import { updateLocalStorageValue } from "../utils";

const DELAY_BEFORE_REDIRECT = 1500;

export type RegisterFormType = {
  name: string;
  email: string;
  password: string;
};

const Register = (): React.ReactElement => {
  const [userAccount, setUserAccount] = useState<RegisterFormType>();
  const [openAvatarModal, setOpenAvatarModal] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormType>({
    resolver: yupResolver(validationRegisterSchema),
  });

  const { notify } = useContext(NotificationContext);
  const { redirect } = useNavigatePage();

  const { mutate: mutateLogin } = useMutation(login, {
    onSuccess: (response) => {
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

  const { mutate } = useMutation(registerFn, {
    onSuccess: () => {
      notify({
        content: `Register successfully`,
        type: "success",
        open: true,
        id: crypto.randomUUID(),
      });

      mutateLogin({
        email: userAccount!.email,
        password: userAccount!.password,
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

  const leftAppearVariants = {
    initial: { x: -200, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.5, type: "easeIn" },
  };

  const onSubmit = (registerData: RegisterFormType) => {
    mutate({
      name: registerData.name,
      email: registerData.email,
      password: registerData.password,
    });
    setUserAccount(registerData);
    console.log(registerData);
  };

  const handleOpenModal = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setOpenAvatarModal(true);
  };

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
        <img src={LogoTransparent} alt="logo" className="h-9 invert" />

        <motion.div
          className="my-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, type: "easeIn" }}
        >
          <p className="mb-2 text-3xl font-semibold">Hello there!</p>
          <p className="text-base font-normal text-gray-400">
            Let's create new account.
          </p>
        </motion.div>

        <motion.form
          variants={leftAppearVariants}
          className="w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          {registerFields.map((field, index) => (
            <OutlineInput
              label={field.name}
              name={field.name}
              register={register}
              error={errors}
              type={field?.type}
              key={index}
            />
          ))}

          <motion.button
            onClick={handleOpenModal}
            whileHover={{ background: "gray" }}
            whileTap={{ scale: 0.8 }}
            className="mt-8 h-10 w-full rounded-lg border-2 bg-white font-semibold text-black"
          >
            Register with avatar
          </motion.button>
          <motion.button
            whileHover={{ background: "gray" }}
            whileTap={{ scale: 0.8 }}
            className="mt-4 h-10 w-full rounded-lg border-2 bg-black font-semibold text-white"
          >
            Register now
          </motion.button>
        </motion.form>

        <p className=" mt-5 w-full text-center text-sm font-normal text-gray-400">
          Already had an account?
          <Link
            to={"/login"}
            className="mt-5 w-full text-center text-sm font-semibold text-gray-500"
          >
            Login
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
      <AvatarModal
        open={openAvatarModal}
        onSubmit={handleSubmit(onSubmit)}
        onClose={() => setOpenAvatarModal(false)}
      />
    </motion.div>
  );
};

export default Register;
