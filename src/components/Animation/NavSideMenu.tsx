import {
  FiClipboard,
  FiDollarSign,
  FiGrid,
  FiShoppingCart,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import React from "react";

type NavDataType = {
  image: React.ReactElement;
  name: string;
};

const navData: NavDataType[] = [
  { image: <FiGrid />, name: "themes" },
  { image: <FiShoppingCart />, name: "products" },
  { image: <FiDollarSign />, name: "discounts" },
  { image: <FiClipboard />, name: "orders" },
];

export const NavSideMenu = React.forwardRef<HTMLUListElement>((props, ref) => {
  return (
    <nav
      className={`absolute top-[100%] z-50 my-5 rounded-xl border bg-gray-100 shadow-xl md:hidden`}
    >
      <ul className="flex flex-col gap-10 p-5" ref={ref}>
        {navData.map((item: NavDataType, index: number) => (
          <motion.li
            key={index}
            className="flex flex-col items-center gap-3 text-xl no-underline first-letter:capitalize"
          >
            <Link to={`/${item.name}`}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{
                  scale: [0.8, 1.2],
                  background: "gray",
                  transition: { duration: 0.5 },
                }}
                className="rounded-full bg-white p-2 shadow-md"
              >
                {item.image}
              </motion.div>
            </Link>
          </motion.li>
        ))}
      </ul>
    </nav>
  );
});
