import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useNavigatePage } from "../hooks";
import FacebookButton from "../components/Animation/FacebookButton";
import OutlineInput from "../components/CheckoutForm/OutlineInput";
import { LoginBackground, ShoppingArt } from "../assets/images";
import { login } from "../services";
import { getLocalStorageValue, updateLocalStorageValue } from "../utils";
import { facebookConstants, validationLoginSchema } from "../constants";
import { Button, Form, Input, Typography, message } from "antd";
import { useBoolean } from "usehooks-ts";
import GifLoading from "../components/shared/GifLoading";
import { FacebookOutlined, GoogleOutlined } from "@ant-design/icons";

const DELAY_BEFORE_REDIRECT = 1500;

export type LoginFormType = {
  email: string;
  password: string;
};

const Login = (): React.ReactElement => {
  const loading = useBoolean(false);
  const [form] = Form.useForm();

  const { redirect } = useNavigatePage();

  const { mutate } = useMutation(login, {
    onSuccess: (response) => {
      message.success(`Login successfully`);

      updateLocalStorageValue({
        key: "tokens",
        value: {
          accessToken: response?.accessToken,
          refreshToken: response?.refreshToken,
        },
      });

      setTimeout(() => {
        loading.setFalse();
        redirect("/");
      }, DELAY_BEFORE_REDIRECT);
    },
    onError: () => {
      message.error("An error occurred while login");
      loading.setFalse();
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
    loading.setTrue();
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
      {loading.value && <GifLoading />}
      <img
        src={LoginBackground}
        alt="login-background"
        className="object-fit absolute -z-0 h-full w-full lg:hidden"
      />
      <motion.div
        variants={leftAppearVariants}
        className="z-10 mx-3 my-auto flex h-fit w-full flex-col items-start justify-center rounded-lg border-2 bg-white px-10 py-10 shadow-2xl md:w-1/2 lg:w-1/3"
      >
        <motion.div
          className="my-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, type: "easeIn" }}
        >
          <p className="mb-2 text-3xl font-semibold text-red-400">Welcome!</p>
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
            <Link
              to={`https://www.facebook.com/v16.0/dialog/oauth?client_id=${facebookConstants.clientID}&redirect_uri=${facebookConstants.callbackUrl}`}
            >
              <Button
                type="text"
                shape="circle"
                icon={<FacebookOutlined style={{ fontSize: "1.5rem" }} />}
                size="large"
              />
            </Link>
          </motion.div>
          <motion.div variants={buttonVariants}>
            {/* <Link to={"http://localhost:3000/auth/google"}> */}
            <Link to={`${import.meta.env.VITE_SERVER_URL}/auth/google`}>
              <Button
                type="text"
                shape="circle"
                icon={<GoogleOutlined style={{ fontSize: "1.5rem" }} />}
                size="large"
              />
            </Link>
          </motion.div>
        </motion.div>

        <div className="flex w-full items-center justify-center">
          <hr className="border-1 my-2 h-px w-full bg-gray-200" />
          <div className="mx-2 flex items-center justify-center">
            <p className="text-sm font-semibold italic text-gray-600">or</p>
          </div>
          <hr className="border-1 my-2 h-px w-full bg-gray-200" />
        </div>

        <motion.div variants={leftAppearVariants} className="w-full">
          <Form
            form={form}
            layout="vertical"
            onFinish={onSubmit}
            className="w-full"
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please enter a valid email!",
                },
              ]}
            >
              <Input size="large" variant="filled" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please enter your password!" },
              ]}
            >
              <Input.Password size="large" variant="filled" />
            </Form.Item>
            <Button
              type="text"
              htmlType="submit"
              className="mt-4 w-full bg-red-400"
            >
              Login
            </Button>
          </Form>
        </motion.div>

        <Typography.Text className=" mt-5 w-full text-center text-sm font-normal text-gray-400">
          Not have an account?{" "}
          <Link
            to={"/register"}
            className="mt-5 w-full text-center text-sm font-semibold text-gray-500"
          >
            Register
          </Link>
        </Typography.Text>
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
