import React, { useState } from "react";
import { FakeLogo } from "../assets/images";
import { navList } from "../constants/data";
import SmallButton from "./SmallButton";
import { Link } from "react-router-dom";
import { HamburgerIcon, CloseIcon } from "../assets/icons";

const NavBar = (): React.ReactElement => {
  const [openNav, setOpenNav] = useState(false);

  const toggleNav = () => {
    setOpenNav(!openNav);
  };

  return (
    <div className="">
      <nav className="mx-auto mt-3 flex w-[90%] items-center justify-between">
        <div>
          <Link to="/">
            <img src={FakeLogo} alt="logo" className="h-5" />
          </Link>
        </div>

        <div
          className={`absolute left-0 duration-1000 ${
            openNav ? "top-12" : "top-[-100%]"
          } z-30 flex min-h-[60vh] w-full items-center justify-center px-5 backdrop-blur-sm md:static md:min-h-fit md:w-auto md:bg-white`}
        >
          <ul className="flex flex-col items-center gap-8 md:flex-row md:gap-[4vw]">
            {navList.map((item: string, index: number) => (
              <li
                key={index}
                className="text-xl no-underline first-letter:capitalize hover:text-slate-700 hover:underline"
              >
                <Link to={`/${item}`}>{item}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-6">
          <SmallButton name="sign in" />
          <img
            src={openNav ? CloseIcon : HamburgerIcon}
            alt="menu"
            className="h-8 cursor-pointer duration-1000 md:hidden"
            onClick={toggleNav}
          />
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
