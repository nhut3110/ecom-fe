import React, { useState } from "react";
import { FakeLogo } from "../assets/images/images";
import { NavList } from "../constants/data";
import SmallButton from "./SmallButton";
import { Link } from "react-router-dom";
import { HamburgerIcon, CloseIcon } from "../assets/icons/icons";

const NavBar = () => {
  const [openNav, setOpenNav] = useState(false);

  const toggleNav = () => {
    setOpenNav(!openNav);
  };

  return (
    <div>
      <nav className="mx-auto flex w-[90%] items-center justify-between">
        <div>
          <img src={FakeLogo} alt="logo" className="h-5" />
        </div>

        <div
          className={`absolute left-0 duration-1000 top-${
            openNav ? "[10%]" : "[-100%]"
          } flex min-h-[60vh] w-full items-center justify-center px-5 backdrop-blur-sm md:static md:min-h-fit md:w-auto md:bg-white`}
        >
          <ul className="flex flex-col items-center gap-8 md:flex-row md:gap-[4vw]">
            {NavList.map((item: string, index: number) => (
              <li
                key={index}
                className="text-xl no-underline first-letter:capitalize hover:text-violet-400 hover:underline"
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
