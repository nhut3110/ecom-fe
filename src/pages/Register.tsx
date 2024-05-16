import Countdown, { CountdownRenderProps, zeroPad } from "react-countdown";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import React, { useCallback, useState } from "react";
import { useNavigatePage } from "../hooks";
import AvatarModal from "../components/shared/AvatarModal";
import GifLoading from "../components/shared/GifLoading";
import { LoginBackground, ShoppingArt } from "../assets/images";
import {
  register as registerFn,
  login,
  getOtp,
  validateOtp,
} from "../services/auth.api";
import { DELAY_OTP_TIME, OTP_LENGTH } from "../constants";
import { updateLocalStorageValue } from "../utils";
import { Button, Form, FormProps, Input, Typography, message } from "antd";
import { PasswordStrengthIndicator } from "../components/shared/PasswordStrengthIndicator";

const DELAY_BEFORE_REDIRECT = 3000;

export type RegisterFormType = {
  name: string;
  email: string;
  password: string;
};

const Register = (): React.ReactElement => {
  const [userAccount, setUserAccount] = useState<RegisterFormType>();
  const [openAvatarModal, setOpenAvatarModal] = useState<boolean>(false);
  const [openOtpBox, setOpenOtpBox] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [countdownTimeKey, setCountdownTimeKey] = useState<string>(
    crypto.randomUUID()
  );
  const [isOtpWrong, setIsOtpWrong] = useState<boolean>(false);
  const [countdownTime, setCountdownTime] = useState<number>(0);
  const [password, setPassword] = useState<string>("");

  const [form] = Form.useForm();

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

      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
        redirect("/");
      }, DELAY_BEFORE_REDIRECT);
    },
  });

  const { mutate } = useMutation(registerFn, {
    onSuccess: () => {
      message.success(`Register successfully`);

      mutateLogin({
        email: userAccount!.email,
        password: userAccount!.password,
      });
    },
    onError: () => {
      message.error(`Wrong credentials`);
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

  const handleMutating = useCallback(() => {
    if (userAccount)
      mutate({
        name: userAccount.name,
        email: userAccount.email,
        password: userAccount.password,
      });
  }, [userAccount]);

  const handleRegister = async () => {
    const isValidOtp = await handleValidateOtp();
    if (isValidOtp) handleMutating();
  };

  const handleValidateOtp = useCallback(async () => {
    setIsLoading(true);
    try {
      if (userAccount) await validateOtp(userAccount.email, otp);
      setIsOtpWrong(false);
      setIsLoading(false);

      return true;
    } catch (error) {
      message.error(`Wrong OTP`);

      setIsOtpWrong(true);
      setIsLoading(false);

      return false;
    }
  }, [userAccount, otp]);

  const handleOtpChange = (currentOtp: string) => {
    setOtp(() => currentOtp);
    setIsOtpWrong(false);
  };

  const onSubmit: FormProps["onFinish"] = async () => {
    try {
      const { confirmPassword, ...registerData } = await form.validateFields();
      setIsLoading(true);
      setUserAccount(registerData);

      await getOtp(registerData.email);
      setOpenOtpBox(true);
      setCountdownTime(Date.now() + DELAY_OTP_TIME);
    } catch (error) {
      message.error(`Cannot request OTP now`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const isValidOtp = await handleValidateOtp();
    isValidOtp && setOpenAvatarModal(true);
  };

  const handleResendOtp = async () => {
    try {
      setIsLoading(true);
      await getOtp(userAccount!.email);

      setIsOtpWrong(false);
      setCountdownTimeKey(() => crypto.randomUUID());
      setCountdownTime(Date.now() + DELAY_OTP_TIME);
    } catch (error) {
      message.error(`Too many requests`);
    } finally {
      setIsLoading(false);
    }
  };

  const renderCountdown = useCallback((props: CountdownRenderProps) => {
    return props.completed ? (
      <div
        className="cursor-pointer font-semibold underline"
        onClick={handleResendOtp}
      >
        resend OTP
      </div>
    ) : (
      <div className="flex items-center justify-center gap-1">
        <p className="h-8 w-8 rounded-lg border text-center text-lg font-medium">
          {zeroPad(props.minutes)}
        </p>
        <span>:</span>
        <p className="h-8 w-8 rounded-lg border text-center text-lg font-medium">
          {zeroPad(props.seconds)}
        </p>
      </div>
    );
  }, []);

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="relative flex h-screen w-screen items-center justify-center lg:px-10"
    >
      {isLoading && <GifLoading />}
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
          <p className="mb-2 text-3xl font-semibold text-red-400">
            Hello there!
          </p>
          <p className="text-base font-normal text-gray-400">
            Let's create new account.
          </p>
        </motion.div>
        {openOtpBox ? (
          <div className="flex w-full flex-col items-center justify-center gap-5">
            <Input.OTP
              autoFocus
              value={otp}
              onChange={handleOtpChange}
              size="large"
              length={OTP_LENGTH}
              status={isOtpWrong ? "error" : undefined}
            />
            <div className="flex w-full items-center justify-center gap-2">
              <p>Don't receive OTP, </p>
              <Countdown
                date={countdownTime}
                renderer={renderCountdown}
                key={countdownTimeKey}
                autoStart
              />
            </div>

            <div className="w-full">
              <Button
                onClick={handleRegister}
                block
                type="default"
                className="bg-red-400"
              >
                Register now
              </Button>
            </div>
          </div>
        ) : (
          <motion.div variants={leftAppearVariants} className="w-full">
            <Form form={form} layout="vertical" onFinish={onSubmit}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input placeholder="Name" size="large" variant="filled" />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Please input a valid email!",
                  },
                ]}
              >
                <Input placeholder="Email" size="large" variant="filled" />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  { required: true, message: "Please input your password!" },
                  {
                    min: 8,
                    message: "Password must be at least 8 characters long!",
                  },
                ]}
                tooltip="Password should have at least 8 characters"
              >
                <Input.Password
                  placeholder="Password"
                  size="large"
                  variant="filled"
                  onChange={(e) => {
                    form.setFieldsValue({ password: e.target.value });
                    setPassword(e.target.value);
                  }}
                />
                <PasswordStrengthIndicator password={password} />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  placeholder="Confirm Password"
                  size="large"
                  variant="filled"
                />
              </Form.Item>

              <Button
                block
                type="default"
                htmlType="submit"
                loading={isLoading}
                className="bg-red-400"
              >
                Register
              </Button>
            </Form>
          </motion.div>
        )}

        <Typography.Text className=" mt-5 w-full text-center text-sm font-normal text-gray-400">
          Already had an account?{" "}
          <Link
            to={"/login"}
            className="mt-5 w-full text-center text-sm font-semibold decoration-red-400 "
          >
            Login
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
      <AvatarModal
        open={openAvatarModal}
        onSubmit={handleRegister}
        onClose={() => setOpenAvatarModal(false)}
      />
    </motion.div>
  );
};

export default Register;
