import { AnimatePresence, motion } from "framer-motion";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import NumberBadge from "../NumberBadge";
import { CartContext } from "../../context/CartContext";
import CartAnimatedLogo from "./CartAnimatedLogo";
import PortalWrapper from "../PortalWrapper";
import Cart from "../../pages/Cart";
import { getCart } from "../../services";

const miniCartContentVariants = {
  hidden: {
    clipPath: "inset(100% 0% 0% 100%)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
      bounce: 0,
      duration: 0.3,
    },
  },
  visible: {
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
  const [cartQuantity, setCartQuantity] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);

  const numberOfProducts = useMemo(() => {
    return Object.keys(cartState.cartList).length;
  }, [cartState.cartList]);

  const handleClick = () => {
    setOpenSmallCart(!openSmallCart);
  };

  const handleResize = () => {
    const positions = ref.current?.getBoundingClientRect();
    if (positions) {
      updateCartPositions({ cartX: positions?.x, cartY: positions?.y });
    }
  };

  const fetchCart = async () => {
    const data = await getCart();
    setCartQuantity(data.length);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [cartState]);

  useEffect(() => {
    handleResize();
    fetchCart();
  }, []);

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
              className="fixed bottom-24 right-0 h-96 w-full min-w-[25rem] max-w-xl overflow-auto rounded-xl border-2 bg-white p-5 shadow-xl scrollbar-hide md:right-10 md:w-auto"
            >
              <Cart />
            </motion.div>
          )}
        </AnimatePresence>
      </PortalWrapper>

      <NumberBadge
        value={numberOfProducts ?? cartQuantity}
        color="bg-red-200"
      />
      <div className="w-10">
        <CartAnimatedLogo />
      </div>
    </div>
  );
};

export default CartButton;
