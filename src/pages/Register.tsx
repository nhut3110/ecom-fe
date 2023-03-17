import React from "react";
import InputForm from "../components/InputForm";
import { ShoppingArt } from "../assets/images/images";

const Register = () => {
  return (
    <div className="flex h-full w-full">
      <div className="hidden h-screen lg:flex lg:w-2/3 lg:items-center lg:justify-center">
        <img
          src={ShoppingArt}
          alt="background-login"
          className="h-2/3 object-cover "
        />
      </div>
      <div className="flex h-screen w-full flex-col items-start justify-center  px-10 lg:w-1/3">
        <div className="my-6">
          <p className="mb-1 w-full text-xl font-semibold lg:text-3xl">
            Create an account!
          </p>
          <p className=" text-xs font-normal text-gray-400 lg:text-base">
            Let&quot;s get started with us.
          </p>
        </div>

        <InputForm title="name" id="name-register" type="text" />
        <InputForm title="username" id="username-register" type="text" />
        <InputForm title="password" id="password-register" type="password" />
        <InputForm
          title="confirm password"
          id="confirm-password-register"
          type="password"
        />

        <button className="mt-8 h-10 w-full rounded-lg bg-violet-400 text-white hover:bg-violet-700">
          Create account
        </button>

        <p className=" mt-5 w-full text-center text-sm font-normal text-gray-400">
          Already have an account?
          <a
            href=""
            className="mt-5 w-full text-center text-sm font-semibold text-gray-400"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
