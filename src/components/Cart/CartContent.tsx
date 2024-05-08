import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigatePage } from "../../hooks";
import Modal from "../shared/Modal";
import CartList from "./CartList";
import OrderSummary from "../Order/OrderSummary";
import { CartContext } from "../../context/CartContext";
import GifLoading from "../shared/GifLoading";
import { NotificationContext } from "../../context/NotificationContext";
import { clearCart, fetchCartList } from "../../services";
import { transformCartResponse } from "../../utils/transformCartResponse";
import { Button, Empty, Typography } from "antd";
import { FrownOutlined } from "@ant-design/icons";
import { Detective } from "../../assets/images";

interface CartContentProps {
  showSummary?: boolean;
  showCheckoutButton?: boolean;
}

const CartContent = ({
  showSummary = true,
  showCheckoutButton = true,
}: CartContentProps): React.ReactElement => {
  const { cartState, removeAllFromCart, importCart } = useContext(CartContext);
  const { notify } = useContext(NotificationContext);
  const [showModal, setShowModal] = useState<boolean>(false);

  const { redirect } = useNavigatePage();

  const { cart, isLoading } = fetchCartList();

  const isEmptyCart = useMemo(() => {
    return !Object.keys(cartState.cartList).length;
  }, [cartState.cartList]);

  const handleCheckout = () => {
    if (cartState.cartValue > 0) redirect("/checkout");
    else {
      notify({
        id: crypto.randomUUID(),
        content: "Cannot checkout with an empty cart",
        open: true,
        type: "warning",
      });
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleButtonClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.stopPropagation();
    },
    []
  );

  const handleClearCart = async () => {
    try {
      await clearCart();
      removeAllFromCart();
    } catch (error) {
      notify({
        id: crypto.randomUUID(),
        content: "Failed",
        open: true,
        type: "error",
      });
    }
  };

  useEffect(() => {
    if (!isLoading) importCart(transformCartResponse(cart));
  }, [isLoading, cart]);

  return (
    <div onClick={handleButtonClick} className="h-full w-full">
      {/* Modal */}
      <Modal
        open={showModal}
        title="Warning"
        onSubmit={handleClearCart}
        onClose={handleCloseModal}
      >
        <p>Do you want to delete all?</p>
      </Modal>

      {/* Cart Content */}
      <div>
        {/* Test Product in Cart */}
        {isEmptyCart ? (
          <div className="flex h-full w-full flex-col justify-center align-middle">
            <img
              src={Detective}
              alt="detective"
              className="mx-auto h-36 w-28"
            />
            <Typography.Title level={5} className="text-center">
              Look like it's empty here
            </Typography.Title>
          </div>
        ) : (
          <CartList />
        )}

        {/* Order Summary */}
        {showSummary && !isEmptyCart && <OrderSummary />}

        {/* Buttons */}
        {!isEmptyCart && (
          <div className="mb-5 flex w-full justify-between">
            <Button danger onClick={handleOpenModal}>
              Delete all
            </Button>

            {showCheckoutButton && (
              <Button onClick={handleCheckout}>Checkout</Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartContent;
