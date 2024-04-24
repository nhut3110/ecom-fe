import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  useMenuAnimation,
  useNavigatePage,
  useValidateLoginExpiration,
} from "../hooks";
import SmallButton from "./SmallButton";
import { NavSideMenu } from "./Animation/NavSideMenu";
import HamburgerButton from "./Animation/HamburgerButton";
import SearchBar from "./SearchBar";
import { Logo, LogoTransparent } from "../assets/images";
import { UserDataContext } from "../context/UserDataContext";
import { COLORS, navList, userMenu } from "../constants";
import { getProductList } from "../services/products.api";
import { LogoutOutlined, SearchOutlined } from "@ant-design/icons";
import { Avatar, Button, Menu } from "antd";

const NavBar = (): React.ReactElement => {
  const [openUserBox, setOpenUserBox] = useState<boolean>(false);
  const [sticky, setSticky] = useState<boolean>(false);
  const [openMobileNav, setOpenMobileNav] = useState<boolean>(false);
  const [isSearch, setIsSearch] = useState<boolean>(false);

  const { userDataState } = useContext(UserDataContext);

  const navRef = useRef<HTMLDivElement>(null);
  const navMobileMenuRef = useRef<HTMLUListElement>(null);
  const navHamburgerButtonRef = useRef<HTMLDivElement>(null);

  const { redirect } = useNavigatePage();
  const { isLogin, isLoading, handleLogout } = useValidateLoginExpiration();
  const scope = useMenuAnimation(openMobileNav);

  const avatarVariants = {
    initial: {
      opacity: 0,
      y: -20,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const avatarMenuVariants = {
    open: {
      clipPath: "inset(0% 0% 0% 0%)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
        bounce: 0,
        duration: 0.7,
        delayChildren: 0.3,
        staggerChildren: 0.05,
      },
    },
    closed: {
      clipPath: "inset(0% 0% 100% 100%)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
        bounce: 0,
        duration: 0.3,
      },
    },
  };

  const itemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
  };

  const handleScroll = () => {
    const navPositions = navRef.current?.getBoundingClientRect().top;
    if (navPositions !== undefined)
      navPositions < window.scrollY ? setSticky(true) : setSticky(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navHamburgerButtonRef.current &&
        navHamburgerButtonRef.current.contains(event.target as Node)
      )
        return;

      if (
        navMobileMenuRef.current &&
        !navMobileMenuRef.current.contains(event.target as Node)
      ) {
        setOpenMobileNav(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpenMobileNav]);

  const renderUserAvatar = useCallback(() => {
    if (!userDataState)
      return (
        <div className="aspect-square h-8 rounded-full border bg-gray-300 shadow-lg" />
      );

    return (
      <motion.div variants={avatarVariants} initial="initial" animate="visible">
        <Avatar
          src={userDataState?.picture}
          alt="user-avatar"
          className="object-fit aspect-square h-10 w-10 rounded-full border shadow-lg"
          onClick={() => setOpenUserBox(!openUserBox)}
        />
      </motion.div>
    );
  }, [userDataState?.picture, openUserBox]);

  const renderLoggedInContent = useCallback(() => {
    return (
      <div>
        {!isLoading && (
          <motion.div className="relative">
            {renderUserAvatar()}

            <motion.div
              className="shadow-4xl absolute right-[80%] top-[120%] z-50 flex min-w-max flex-col rounded-md border-2 bg-white text-lg font-medium shadow-inner"
              variants={avatarMenuVariants}
              initial="closed"
              animate={openUserBox ? "open" : "closed"}
              style={{ pointerEvents: openUserBox ? "auto" : "none" }}
            >
              <Menu>
                {userMenu.map((item, index) => (
                  <Link to={`/${item.url}`} key={index}>
                    <motion.div
                      className="w-full cursor-pointer rounded-md text-gray-900 hover:bg-gray-100"
                      variants={itemVariants}
                      onClick={() => setOpenUserBox(!openUserBox)}
                    >
                      <Menu.Item icon={item.icon}>{item.name}</Menu.Item>
                    </motion.div>
                  </Link>
                ))}

                <motion.div
                  className="w-full cursor-pointer rounded-md text-gray-900 hover:bg-gray-100"
                  variants={itemVariants}
                  onClick={handleLogout}
                >
                  <Menu.Item icon={<LogoutOutlined />}>Log out</Menu.Item>
                </motion.div>
              </Menu>
            </motion.div>
          </motion.div>
        )}
      </div>
    );
  }, [isLoading, openUserBox]);

  const renderContent = useCallback(() => {
    if (isLogin) return renderLoggedInContent();

    return <Button onClick={() => redirect("/login")}>sign in</Button>;
  }, [isLogin, openUserBox, isLoading]);

  return (
    <div
      ref={navRef}
      className={`${
        sticky ? "fixed" : "relative"
      } z-50 flex w-full select-none justify-center bg-${
        COLORS.RED
      } pb-2 shadow-sm`}
    >
      <div ref={scope}>
        <NavSideMenu ref={navMobileMenuRef} />
      </div>

      <nav className="mt-3 flex w-[90%] flex-col gap-2 md:mx-auto">
        <div className="flex w-full items-center justify-between">
          {/* Login for big screen and hamburger button */}
          <div className="flex items-center justify-center">
            <div className="md:hidden" ref={navHamburgerButtonRef}>
              <HamburgerButton
                onClick={() => {
                  setOpenMobileNav(!openMobileNav);
                }}
                open={openMobileNav}
              />
            </div>

            <Link to="/">
              <img
                src={LogoTransparent}
                alt="logo"
                className="hidden h-12 md:block"
              />
            </Link>
          </div>
          {/* Logo for mobile screen */}
          <Link to="/" className="md:hidden">
            <img src={LogoTransparent} alt="logo" className="h-10 invert " />
          </Link>
          {/* Nav items */}
          <div className="z-30 hidden w-full items-center justify-center px-5 md:flex md:min-h-fit md:w-auto md:bg-transparent">
            <ul className="flex items-center gap-8 bg-transparent md:flex-row md:gap-[4vw]">
              {navList.map((item: string, index: number) => (
                <motion.li
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  key={index}
                  className="bg-transparent text-xl font-bold text-white no-underline first-letter:capitalize"
                >
                  <Link
                    className={`hover:text-${COLORS.YELLOW}`}
                    to={`/${item}`}
                  >
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
          {/* Avatar and User Dialog */}
          <div className="flex items-center gap-6">
            <div
              className={`hover:border-${COLORS.YELLOW} hover:text-${COLORS.YELLOW} flex h-8 w-8 items-center justify-center rounded-full border border-white`}
            >
              <SearchOutlined
                size={20}
                onClick={() => setIsSearch(!isSearch)}
                style={{ color: "white" }}
              />
            </div>
            {renderContent()}
          </div>
        </div>
        <AnimatePresence>
          {isSearch && (
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SearchBar queryFn={getProductList} />
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
};

export default NavBar;
