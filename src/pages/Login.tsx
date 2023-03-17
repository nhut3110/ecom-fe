import React, { useState } from "react";
import InputForm from "../components/InputForm";
import backgroundImage from "../assets/images/background-login.jpg";

const Login = () => {
  return (
    <div className="flex w-full h-full">
      <div className="flex flex-col h-screen items-start justify-center  w-1/3 px-10">
        <div className="my-6">
          <p className="text-3xl font-semibold mb-2">Welcome!</p>
          <p className="text-base font-normal text-gray-400">
            Let&quot;s get started with us.
          </p>
        </div>

        <InputForm title="username" id="username-login" type="text" />
        <InputForm title="password" id="password-login" type="password" />

        <button className="w-full h-10 bg-slate-900 text-white rounded-lg mt-8">
          Login
        </button>

        <p className=" w-full mt-5 text-sm font-normal text-gray-400 text-center">
          Not have an account?
          <a
            href=""
            className="w-full mt-5 text-sm font-semibold text-gray-400 text-center"
          >
            Register
          </a>
        </p>
      </div>
      <div className="h-screen w-2/3 flex justify-center items-center">
        <img
          src={backgroundImage}
          alt="background-login"
          className="object-cover h-2/3 "
        />
      </div>
    </div>
  );
};

export default Login;
