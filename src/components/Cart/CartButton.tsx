import { AnimatePresence, motion } from "framer-motion";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import NumberBadge from "../NumberBadge";
import { CartContext } from "../../context/CartContext";
import CartAnimatedLogo from "./CartAnimatedLogo";
import PortalWrapper from "../PortalWrapper";
import Cart from "../../pages/Cart";

const miniCartContentVariants = {
  hidden: { opacity: 0, scale: 0, x: "100%", y: "100%" },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
    originX: 1,
    originY: 1,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
  exit: {
    opacity: 0,
    scale: 0,
    x: "100%",
    y: "100%",
    originX: 0,
    originY: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

const CartButton = () => {
  const { cartState, updateCartPositions } = useContext(CartContext);
  const [openSmallCart, setOpenSmallCart] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const numberOfProducts = useMemo(() => {
    return Object.keys(cartState.cartList).length;
  }, [cartState.cartList]);

  const handleClick = () => {
    setOpenSmallCart(!openSmallCart);
  };

  useEffect(() => {
    const handleResize = () => {
      const positions = ref.current?.getBoundingClientRect();
      if (positions) {
        updateCartPositions({ cartX: positions?.x, cartY: positions?.y });
      }
    };

    handleResize(); // call once to update initial position
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [updateCartPositions]);

  return (
    <div
      id="cart-button"
      className="fixed bottom-4 right-4 z-50 flex h-16 w-16 items-center justify-center rounded-full border bg-gray-100 shadow-lg"
      ref={ref}
      onClick={handleClick}
    >
      <PortalWrapper>
        <AnimatePresence>
          {openSmallCart && (
            <motion.div
              variants={miniCartContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="scrollbar-rounded-md fixed bottom-24 right-0 h-96 w-full min-w-[25rem] max-w-xl overflow-auto rounded-xl border bg-white shadow-xl scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-700 scrollbar-hide md:right-10 md:w-auto md:scrollbar-default"
            >
              <Cart />
            </motion.div>
          )}
        </AnimatePresence>
      </PortalWrapper>

      <NumberBadge value={numberOfProducts} color="bg-red-200" />
      <div className="w-10">
        <CartAnimatedLogo />
      </div>
    </div>
  );
};

export default CartButton;
