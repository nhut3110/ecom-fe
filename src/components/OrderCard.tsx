import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { motion } from "framer-motion";
import Payment from "payment";
import React, { useMemo } from "react";
import { useNavigatePage } from "../hooks";
import { Order } from "../services";
import { convertTimestampToDate, transformCartResponse } from "../utils";
import { OrderStatus, PaymentOptions } from "../constants";

const OrderCard = ({ order }: { order: Order }): React.ReactElement => {
  const { redirect } = useNavigatePage();

  const orderDate = useMemo(() => {
    return convertTimestampToDate(new Date(order.createdAt).getTime());
  }, [order.createdAt]);

  const orderValue = transformCartResponse(order.orderDetails).cartValue;

  const determinePaymentType = () => {
    if (order.paymentType === PaymentOptions.CASH) return order.paymentType;

    const cardType = Payment.fns.cardType(order.payment!.cardNumber);
    const cardNumber = order.payment?.cardNumber.split(" ")[3]; // 4 number at the end

    return cardType + "-" + cardNumber;
  };

  const isCancel = order.orderStatus === OrderStatus.CANCELED;

  return (
    <div className="flex w-full flex-col gap-4 rounded-lg border border-gray-500 p-5 shadow-xl">
      <div className="relative">
        <p
          className={`my-4 text-2xl font-semibold first-letter:capitalize ${
            isCancel ? "bg-red-300" : "bg-green-300"
          } max-w-fit rounded-full px-5`}
        >
          {order.orderStatus}!
        </p>
        <p className="text-md font-medium">{`Hi, ${order.address.name}`}</p>
        <p className="text-sm text-gray-400">
          Your order general details displayed below.
        </p>
        <motion.div
          whileHover={{ scale: 1.2 }}
          onClick={() => redirect(`/orders/${order.id}`)}
          className="absolute top-0 right-0"
        >
          <BsFillArrowRightCircleFill size={25} />
        </motion.div>
      </div>
      <hr className="my-2 h-px border-0 bg-gray-200" />
      <div className="grid grid-cols-2 gap-2 overflow-hidden md:grid-cols-4">
        <div>
          <p className="text-sm italic text-gray-400">Order Date</p>
          <p className="text-sm">{orderDate}</p>
        </div>

        <div>
          <p className="text-sm italic text-gray-400">Phone Number</p>
          <p className="text-sm">{order.address.phoneNumber}</p>
        </div>

        <div>
          <p className="text-sm italic text-gray-400">Payment</p>
          <p className="text-sm first-letter:capitalize">
            {determinePaymentType()}
          </p>
        </div>

        <div>
          <p className="text-sm italic text-gray-400">Email</p>
          <p className="text-sm">{order.address.email}</p>
        </div>
      </div>
      <hr className="my-2 h-px border-0 bg-gray-200" />
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">Total</p>
        <p className="text-xl font-bold">${orderValue}</p>
      </div>
      <hr className="my-2 h-px border-0 bg-gray-200" />
      <p className="text-xs">Shipping address: {order.address.address}</p>
      <p className="font-semibold">Thank you!</p>
      <p className="self-end text-sm text-gray-400">Order ID: {order.id}</p>
    </div>
  );
};

export default OrderCard;
