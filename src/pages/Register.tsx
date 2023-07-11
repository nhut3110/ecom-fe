import Countdown, { CountdownRenderProps, zeroPad } from "react-countdown";
import OTPInput from "react-otp-input";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import React, { useCallback, useContext, useState } from "react";
import { useNavigatePage } from "../hooks";
import AvatarModal from "../components/AvatarModal";
import OutlineInput from "../components/CheckoutForm/OutlineInput";
import GifLoading from "../components/GifLoading";
import {
  LoginBackground,
  LogoTransparent,
  ShoppingArt,
} from "../assets/images";
import {
  register as registerFn,
  login,
  getOtp,
  validateOtp,
} from "../services/auth.api";
import { NotificationContext } from "../context/NotificationContext";
import {
  DELAY_OTP_TIME,
  OTP_LENGTH,
  registerFields,
  validationRegisterSchema,
} from "../constants";
import { updateLocalStorageValue } from "../utils";

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
    try {
      setIsLoading(true);
      if (userAccount) await validateOtp(userAccount.email, otp);
      setIsOtpWrong(false);

      return true;
    } catch (error) {
      notify({
        content: `Wrong OTP`,
        type: "error",
        open: true,
        id: crypto.randomUUID(),
      });

      setIsOtpWrong(true);

      return false;
    } finally {
      setIsLoading(false);
    }
  }, [userAccount]);

  const handleOtpChange = (otp: string) => {
    setOtp(otp);
    setIsOtpWrong(false);
  };

  const onSubmit = async (registerData: RegisterFormType) => {
    setIsLoading(true);
    setUserAccount(registerData);

    await getOtp(registerData.email);

    setIsLoading(false);
    setOpenOtpBox(true);
    setCountdownTime(Date.now() + DELAY_OTP_TIME);
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
      notify({
        content: `Too many requests`,
        type: "error",
        open: true,
        id: crypto.randomUUID(),
      });
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
        {openOtpBox ? (
          <div className="flex w-full flex-col items-center justify-center gap-5">
            <OTPInput
              shouldAutoFocus
              value={otp}
              onChange={handleOtpChange}
              numInputs={OTP_LENGTH}
              renderSeparator={<span className="mx-2" />}
              renderInput={(props) => (
                <input
                  {...props}
                  style={{}}
                  className={`aspect-square w-1/6 rounded-lg border-2 ${
                    isOtpWrong ? "border-red-400" : "border-black"
                  } select-none text-center text-lg font-semibold md:text-xl`}
                  maxLength={1}
                  type="number"
                  inputMode="numeric"
                  disabled={isLoading}
                />
              )}
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
              <motion.button
                onClick={handleOpenModal}
                whileTap={{ scale: 0.8 }}
                className="h-10 w-full rounded-lg border-2 bg-white font-semibold text-black hover:bg-gray-300"
              >
                Register with avatar
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.8 }}
                className="mt-4 h-10 w-full rounded-lg border-2 bg-black font-semibold text-white hover:bg-gray-300"
                onClick={handleRegister}
              >
                Register now
              </motion.button>
            </div>
          </div>
        ) : (
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
              whileTap={{ scale: 0.8 }}
              className="mt-4 h-10 w-full rounded-lg border-2 bg-black font-semibold text-white hover:bg-gray-300"
            >
              Confirm
            </motion.button>
          </motion.form>
        )}

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
        onSubmit={handleMutating}
        onClose={() => setOpenAvatarModal(false)}
      />
    </motion.div>
  );
};

export default Register;
