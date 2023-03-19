import React from "react";
import { Link } from "react-router-dom";
import { FakeLogo } from "../assets/images/images";

const Footer = () => {
  return (
    <div className=" relative mt-5 flex  w-full flex-col items-center justify-center rounded-t-xl bg-black md:h-60">
      <div className="my-10 flex w-2/3 flex-col items-center justify-center gap-y-3 text-white md:flex-row md:items-start md:justify-around md:gap-5">
        <div className=" flex w-44 flex-col items-center justify-center gap-1 md:items-start">
          <img src={FakeLogo} alt="logo" className="mb-3 h-5" />
          <p className="text-[10px] text-slate-300">
            We provide the best experience.
          </p>
          <p className="text-[10px] text-slate-300">
            Call us: (+84) 931 910 JQK
          </p>
          <p className="text-[10px] text-slate-300">
            Email: fake.store@info.com
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-1 md:items-start">
          <p className="text-lg font-semibold">Useful Links</p>
          <Link
            to="/"
            className="text-sm text-slate-300 hover:text-white hover:underline"
          >
            Favorites
          </Link>
          <Link
            to="/"
            className="text-sm text-slate-300 hover:text-white hover:underline"
          >
            Cart
          </Link>
          <Link
            to="/"
            className="text-sm text-slate-300 hover:text-white hover:underline"
          >
            Order
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center gap-1 md:items-start">
          <p className="text-lg font-semibold">Information</p>
          <Link
            to="/"
            className="text-sm text-slate-300 hover:text-white hover:underline"
          >
            User Agreements
          </Link>
          <Link
            to="/"
            className="text-sm text-slate-300 hover:text-white hover:underline"
          >
            Policies
          </Link>
          <Link
            to="/"
            className="text-sm text-slate-300 hover:text-white hover:underline"
          >
            FAQ
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center gap-1 md:items-start">
          <p className="text-lg font-semibold">Social Media</p>
          <Link
            to="/"
            className="text-sm text-slate-300 hover:text-white hover:underline"
          >
            Facebook
          </Link>
          <Link
            to="/"
            className="text-sm text-slate-300 hover:text-white hover:underline"
          >
            Instagram
          </Link>
          <Link
            to="/"
            className="text-sm text-slate-300 hover:text-white hover:underline"
          >
            Twitter
          </Link>
        </div>
      </div>

      <p className="absolute bottom-1  w-full text-center text-sm font-semibold text-white">
        Fake Store Copyright 2023. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
