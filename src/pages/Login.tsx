import React, { useState } from "react";
import InputForm from "../components/InputForm";
import { ShoppingArt } from "../assets/images";

const Login = () => {
  return (
    <div className="flex h-full w-full">
      <div className="flex h-screen w-full flex-col items-start justify-center  px-10 lg:w-1/3">
        <div className="my-6">
          <p className="mb-2 text-3xl font-semibold">Welcome!</p>
          <p className="text-base font-normal text-gray-400">
            Let&quot;s get started with us.
          </p>
        </div>

        <InputForm title="username" id="username-login" type="text" />
        <InputForm title="password" id="password-login" type="password" />

        <button className="mt-8 h-10 w-full rounded-lg bg-black text-white hover:bg-black">
          Login
        </button>

        <p className=" mt-5 w-full text-center text-sm font-normal text-gray-400">
          Not have an account?
          <a
            href=""
            className="mt-5 w-full text-center text-sm font-semibold text-gray-400"
          >
            Register
          </a>
        </p>
      </div>

      <div className="hidden h-screen items-center justify-center lg:flex lg:w-2/3">
        <img
          src={ShoppingArt}
          alt="background-login"
          className="h-2/3 object-cover "
        />
      </div>
    </div>
  );
};

export default Login;
