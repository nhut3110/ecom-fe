import { AnimatePresence, motion } from "framer-motion";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { CartContext } from "../../context/CartContext";
import CartAnimatedLogo from "./CartAnimatedLogo";
import PortalWrapper from "../shared/PortalWrapper";
import { getCart } from "../../services";
import { FloatButton } from "antd";
import { FloatButtonElement } from "antd/es/float-button/interface";
import CartContent from "./CartContent";

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
  const ref = useRef<FloatButtonElement>(null);

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
    <div id="cart-button">
      <PortalWrapper>
        <AnimatePresence>
          {openSmallCart && (
            <motion.div
              variants={miniCartContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed bottom-32 z-50 max-h-96 w-full min-w-[25rem] max-w-xl overflow-auto rounded-xl border-2 bg-white p-5 shadow-xl scrollbar-hide md:right-10 md:w-auto"
            >
              <CartContent showSummary={false} />
            </motion.div>
          )}
        </AnimatePresence>
      </PortalWrapper>
      <FloatButton.Group shape="circle" style={{ bottom: 20 }}>
        <FloatButton
          icon={<CartAnimatedLogo />}
          ref={ref}
          type="primary"
          onClick={handleClick}
          badge={{ count: numberOfProducts || cartQuantity, color: "red" }}
        />
        <FloatButton.BackTop visibilityHeight={0} />
      </FloatButton.Group>
    </div>
  );
};

export default CartButton;
