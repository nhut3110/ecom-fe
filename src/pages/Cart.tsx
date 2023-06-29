import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigatePage } from "../hooks";
import Modal from "../components/Modal";
import CartList from "../components/CartList";
import OrderSummary from "../components/OrderSummary";
import SmallButton from "../components/SmallButton";
import { CartContext } from "../context/CartContext";
import GifLoading from "../components/GifLoading";
import { NotificationContext } from "../context/NotificationContext";
import { clearCart, fetchCartList } from "../services/cart.api";
import { transformCartResponse } from "../utils/transformCartResponse";

const Cart = (): React.ReactElement => {
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
    <div onClick={handleButtonClick}>
      {isLoading && <GifLoading />}
      {/* Modal */}
      <Modal
        open={showModal}
        title="Warning"
        onSubmit={handleClearCart}
        onClose={handleCloseModal}
      >
        <p>Do you want to delete all?</p>
      </Modal>

      {/* Header */}
      <div className="mx-auto my-5 flex w-4/5 items-center justify-between">
        <p className="text-xl font-bold">Review your bag</p>
        <SmallButton content="Delete all" onClick={handleOpenModal} />
      </div>

      {/* Cart Content */}
      <div className="mx-auto w-4/5">
        <hr className="my-2 h-px border-0 bg-gray-200" />
        <p className="mb-5 text-sm italic">Free delivery and free returns.</p>

        {/* Test Product in Cart */}
        {isEmptyCart ? (
          <div className="h-10 w-full">
            <p className="w-full text-center text-lg font-semibold italic md:text-2xl">
              No products in cart
            </p>
          </div>
        ) : (
          <CartList />
        )}

        {/* Order Summary */}
        <OrderSummary />

        {/* Buttons */}
        <div className="flex w-full justify-between">
          <SmallButton onClick={() => redirect("/products")}>
            <p className="text-md md:text-lg">Back</p>
          </SmallButton>
          <SmallButton onClick={handleCheckout}>
            <p className="text-md md:text-lg">Checkout</p>
          </SmallButton>
        </div>
      </div>
    </div>
  );
};

export default Cart;
