import React from "react";
import InputForm from "../components/InputForm";
import backgroundImage from "../assets/images/background-login.jpg";

const Register = () => {
  return (
    <div className="flex w-full h-full">
      <div className="h-screen w-2/3 flex justify-center items-center">
        <img
          src={backgroundImage}
          alt="background-login"
          className="object-cover h-2/3 "
        />
      </div>
      <div className="flex flex-col h-screen items-start justify-center  w-1/3 px-10">
        <div className="my-6">
          <p className="text-3xl font-semibold mb-2">Create an account!</p>
          <p className="text-base font-normal text-gray-400">
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

        <button className="w-full h-10 bg-slate-900 text-white rounded-lg mt-8">
          Create account
        </button>

        <p className=" w-full mt-5 text-sm font-normal text-gray-400 text-center">
          Already have an account?
          <a
            href=""
            className="w-full mt-5 text-sm font-semibold text-gray-400 text-center"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
