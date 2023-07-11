import { AnimatePresence, motion } from "framer-motion";
import Select, { SingleValue } from "react-select";
import images from "react-payment-inputs/images";
import Payment from "payment";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigatePage } from "../hooks";
import Modal from "../components/Modal";
import AddressCard from "../components/AddressCard";
import GifLoading from "../components/GifLoading";
import SmallButton from "../components/SmallButton";
import OrderSummary from "../components/OrderSummary";
import CartList from "../components/CartList";
import {
  AddressType,
  PaymentType,
  addOrder,
  fetchAddressList,
  fetchCartList,
  fetchPaymentList,
} from "../services";
import { CartContext } from "../context/CartContext";
import { NotificationContext } from "../context/NotificationContext";
import { transformCartResponse } from "../utils";
import { PaymentOptions, paymentOptions } from "../constants";

type SelectOptionType = ChangeEvent & {
  value: string;
  label: string;
};

const selectVariants = {
  initial: { x: -50, opacity: 0 },
  animate: { x: 0, opacity: 1 },
};

const Checkout = (): React.ReactElement => {
  const { cart, isLoading: isLoadingCart } = fetchCartList();
  const { addresses, isLoading: isLoadingAddress } = fetchAddressList();
  const { payment, isLoading: isLoadingPayment } = fetchPaymentList();

  const [addressId, setAddressId] = useState<string>("");
  const [paymentId, setPaymentId] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [paymentType, setPaymentType] = useState<PaymentOptions>();
  const [message, setMessage] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);

  const { importCart } = useContext(CartContext);
  const { notify } = useContext(NotificationContext);

  const { redirect } = useNavigatePage();

  const handleChoosePayment = (e: SingleValue<SelectOptionType>) => {
    setPaymentId(e?.value ?? "");
  };

  const handleChooseAddress = (e: SingleValue<SelectOptionType>) => {
    setAddressId(e?.value ?? "");
  };

  const handleChangeMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async () => {
    if (paymentType === PaymentOptions.CARD && !paymentId)
      return notify({
        id: crypto.randomUUID(),
        content: "Cannot checkout with an empty payment",
        open: true,
        type: "warning",
      });

    if (!addressId)
      return notify({
        id: crypto.randomUUID(),
        content: "Cannot checkout with an empty address",
        open: true,
        type: "warning",
      });

    if (!paymentType)
      return notify({
        id: crypto.randomUUID(),
        content: "Cannot checkout with an empty payment method",
        open: true,
        type: "warning",
      });

    await addOrder({
      addressId: addressId,
      paymentType: paymentType,
      paymentId: paymentId,
      description: message,
    });

    redirect("/orders");

    return notify({
      id: crypto.randomUUID(),
      content: "Order successfully",
      open: true,
      type: "success",
    });
  };

  useEffect(() => {
    if (!isLoadingCart) importCart(transformCartResponse(cart));
    setIsLoading(isLoadingAddress || isLoadingCart || isLoadingPayment);
  }, [isLoadingAddress, isLoadingCart, isLoadingPayment]);

  return (
    <div className="mx-5 flex w-full flex-col justify-around md:flex-row">
      {isLoading && <GifLoading />}
      <div className="my-5 mx-auto flex w-[90%] flex-col gap-5 px-5 md:mx-0 md:w-3/5">
        <div className="mb-10 mt-5">
          <p className="text-xl font-semibold md:text-2xl">
            Thank you for ordering with us,
          </p>
          <p className="text-xl font-semibold md:text-3xl">
            Fill Shipping info ✏️
          </p>
        </div>

        <div>
          <p className="mb-5 text-xl font-semibold underline md:text-2xl">
            Address Section
          </p>
          <Select
            required
            isSearchable={false}
            isLoading={isLoadingAddress}
            isDisabled={isLoadingAddress}
            onChange={handleChooseAddress}
            options={addresses?.map((item: AddressType) => ({
              value: item.id,
              label: (
                <div className="w-full p-2">
                  <AddressCard details={item} />
                </div>
              ),
            }))}
          />
        </div>

        <div>
          <p className="mb-5 text-xl font-semibold underline md:text-2xl">
            Payment Section
          </p>
          <div className="mb-5 grid grid-cols-1 gap-5 px-5 md:grid-cols-2">
            {paymentOptions.map((option, index) => (
              <div
                key={index}
                className="flex items-center rounded border border-gray-200 pl-4 dark:border-gray-700"
              >
                <input
                  checked={paymentType === option}
                  id={option}
                  onChange={() => setPaymentType(option)}
                  type="checkbox"
                  name="bordered-checkbox"
                  className="h-6 w-6 rounded border-gray-300 bg-gray-100 text-black"
                />
                <label
                  htmlFor={option}
                  className="ml-2 w-full py-4 font-semibold text-gray-900 first-letter:capitalize"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
          <AnimatePresence>
            {paymentType === PaymentOptions.CARD && (
              <motion.div
                variants={selectVariants}
                initial="initial"
                animate="animate"
                exit="initial"
              >
                <Select
                  required={paymentType === PaymentOptions.CARD}
                  isSearchable={false}
                  isLoading={isLoadingPayment}
                  isDisabled={isLoadingPayment}
                  onChange={handleChoosePayment}
                  options={payment?.map((item: PaymentType) => {
                    const cardType = Payment.fns.cardType(item.cardNumber);
                    const cardImage = (images as any)[cardType];

                    return {
                      value: item.id,
                      label: (
                        <div className="flex h-4 w-full items-center">
                          <svg className="h-4 w-10">{cardImage}</svg>
                          <p>{item.cardNumber}</p>
                        </div>
                      ),
                    };
                  })}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div>
          <p className="mb-5 text-xl font-semibold underline md:text-2xl">
            Message Section
          </p>
          <textarea
            onChange={handleChangeMessage}
            rows={4}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
            placeholder="Write your message..."
          />
        </div>

        <div>
          <p className="mb-5 text-xl font-semibold underline md:text-2xl">
            Product Section
          </p>
          <div className="flex max-h-96 w-full flex-col gap-4 overflow-x-hidden overflow-y-scroll rounded-lg border border-gray-500 p-3 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-thumb-rounded-full">
            {<CartList />}
          </div>
        </div>
      </div>
      <div className="mx-auto md:mt-20 md:h-full">
        <div className="top-28 bottom-0 w-full md:relative">
          <OrderSummary />
          <SmallButton onClick={() => setOpenModal(true)}>
            <p className="w-72 text-center">Place your Order</p>
          </SmallButton>
        </div>
      </div>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmit}
      >
        <p>Do you want to place order?</p>
      </Modal>
    </div>
  );
};

export default Checkout;
