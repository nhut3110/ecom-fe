import { motion } from "framer-motion";
import React, { useCallback, useContext, useMemo, useState } from "react";
import QuantityButton from "../shared/QuantityButton";
import Modal from "../shared/Modal";
import { CartContext } from "../../context/CartContext";
import { NotificationContext } from "../../context/NotificationContext";
import { TrashIcon } from "../../assets/icons";
import {
  CartProduct,
  deleteProductFromCart,
  updateQuantity,
} from "../../services";
import { formatVNDPrice } from "../../utils/formatVNDPrice";

const DEFAULT_QUANTITY_CHANGE = 1; // Only increase or decrease 1 unit in cart page

type ProductCartType = {
  product: CartProduct;
  quantity: number;
};

const trashButtonVariants = {
  hover: {
    scale: 1.2,
  },
  tap: {
    scale: 0.9,
  },
};

const ProductCart = ({
  product,
  quantity,
}: ProductCartType): React.ReactElement => {
  const {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    calculateCartValue,
    cartState,
  } = useContext(CartContext);
  const { notify } = useContext(NotificationContext);

  const [quantities, setQuantities] = useState<number>(quantity);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleIncrement = useCallback(async () => {
    try {
      await updateQuantity(product.id, 1); // Only increase or decrease 1 unit in cart page

      setQuantities((quantities) => quantities + DEFAULT_QUANTITY_CHANGE);
      if (cartState.cartValue) {
        increaseQuantity(DEFAULT_QUANTITY_CHANGE, product);
        calculateCartValue(DEFAULT_QUANTITY_CHANGE, product);
      }
    } catch (error) {
      notify({
        id: crypto.randomUUID(),
        content: "Failed",
        open: true,
        type: "error",
      });
    }
  }, [quantities, product]);

  const [totalPrice] = useMemo(() => {
    const price = (product.price * quantities).toFixed(2);

    return [price];
  }, [quantities]);

  const handleDecrement = useCallback(async () => {
    try {
      await updateQuantity(product.id, -1); // Only increase or decrease 1 unit in cart page

      if (cartState.cartValue) {
        if (quantities - 1 === 0) {
          removeFromCart(product);
        } else {
          setQuantities((quantities) => quantities - DEFAULT_QUANTITY_CHANGE);
          decreaseQuantity(DEFAULT_QUANTITY_CHANGE, product);
        }

        calculateCartValue(-DEFAULT_QUANTITY_CHANGE, product);
      }
    } catch (error) {
      notify({
        id: crypto.randomUUID(),
        content: "Failed",
        open: true,
        type: "error",
      });
    }
  }, [quantities]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleRemove = useCallback(async () => {
    try {
      await deleteProductFromCart(product.id);

      removeFromCart(product);
      calculateCartValue(-quantities, product);
    } catch (error) {
      notify({
        id: crypto.randomUUID(),
        content: "Failed",
        open: true,
        type: "error",
      });
    }
  }, [product, quantities]);

  return (
    <div className="flex h-40 w-full gap-10 rounded-xl border border-gray-400 bg-white p-3">
      <img
        src={product.image}
        alt={product.title}
        className="h-4/5 min-w-[5.6rem] max-w-[6rem] self-center object-contain"
      />

      <div className="flex w-full justify-between ">
        <div className="flex flex-col justify-around p-2">
          <p className="line-clamp-2 max-w-[5.5rem] text-xs font-semibold md:max-w-none md:text-base lg:text-lg">
            {product.title}
          </p>
          <p className="md:text-md text-xs font-semibold">
            {formatVNDPrice(Number(totalPrice))}đ
          </p>
          <QuantityButton
            quantity={quantities}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
          />
        </div>

        <motion.img
          variants={trashButtonVariants}
          whileHover="hover"
          src={TrashIcon}
          alt="trash"
          className="w-3 cursor-pointer self-start rounded-full md:w-5"
          onClick={() => setShowModal(true)}
        />
      </div>

      <Modal
        open={showModal}
        title="Warning"
        onSubmit={handleRemove}
        onClose={handleCloseModal}
      >
        <p>
          Do you want to delete <strong>{product.title}</strong> from the cart?
        </p>
      </Modal>
    </div>
  );
};

export default ProductCart;
