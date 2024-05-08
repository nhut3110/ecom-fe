import { map } from "lodash";
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { useNavigatePage } from "../../hooks";
import SmallButton from "../shared/SmallButton";
import { CartContext } from "../../context/CartContext";
import { FormContext } from "../../context/FormContext";
import { OrderContext } from "../../context/OrderContext";
import { NotificationContext } from "../../context/NotificationContext";
import { OrderType } from "../../constants";

const DELAY_BEFORE_REDIRECT = 3000; // After 3s, user will be redirected to home page

const ConfirmForm = (): React.ReactElement => {
  const { formState, movePreviousStep, resetForm } = useContext(FormContext);
  const { cartState, removeAllFromCart } = useContext(CartContext);
  const { notify } = useContext(NotificationContext);
  const { addOrder, storeOrder } = useContext(OrderContext);
  const { redirect } = useNavigatePage();

  const { information, address, payment } = formState;

  const userContact = [information.name, information.phone].join(" | ");
  const userAddress = map(address).join(", ");
  const userPayment = [payment.cardNumber, payment.cvc].join(" | ");

  const handleSubmit = () => {
    const orderData: OrderType = {
      ...information,
      ...address,
      ...payment,
      ...cartState,
      date: Date.now(),
      uuid: crypto.randomUUID(),
    };
    addOrder(orderData);
    storeOrder();
    notify({
      id: crypto.randomUUID(),
      content: "Order successfully, check your order history",
      open: true,
      type: "success",
      timeout: DELAY_BEFORE_REDIRECT,
    });
    setTimeout(() => {
      redirect("/orders");
      resetForm();
      removeAllFromCart();
    }, DELAY_BEFORE_REDIRECT);
  };

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
    >
      <div className="rounded-lg border border-gray-400 p-5">
        <p className="text-xl font-bold xl:text-2xl">Shipping Summary</p>
        <div className="flex w-full flex-col">
          <div className="flex flex-col justify-between md:flex-row">
            <div className="p-2">
              <p className="font-semibold underline xl:text-lg xl:font-bold">
                Contact Detail
              </p>
              <p>{userContact}</p>
              <p>{information.email}</p>
              <p>{userAddress}</p>
            </div>
            <div className="p-2">
              <p className="font-semibold underline xl:text-lg xl:font-bold">
                Payment Detail
              </p>
              <p>{payment.owner}</p>
              <p>{userPayment}</p>
            </div>
          </div>

          <div className="p-2">
            <p className="font-semibold underline xl:text-lg xl:font-bold">
              Cart List
            </p>
            {map(cartState.cartList).map((item) => (
              <div className="flex justify-between">
                <p className="max-w-[90%] truncate font-semibold">
                  {item.product.title}
                </p>
                <strong>x{item.quantity}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="my-2 flex w-full justify-between">
        <SmallButton content="back" onClick={movePreviousStep} />
        <SmallButton content="confirm" onClick={handleSubmit} />
      </div>
    </motion.div>
  );
};

export default ConfirmForm;
