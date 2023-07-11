import images from "react-payment-inputs/images";
import { motion } from "framer-motion";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import Payment from "payment";
import { useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { useNavigatePage } from "../hooks";
import GifLoading from "../components/GifLoading";
import Modal from "../components/Modal";
import { NotificationContext } from "../context/NotificationContext";
import { CartType, cancelOrder, fetchSingleOrder } from "../services";
import { convertTimestampToDate, transformCartResponse } from "../utils";
import { OrderStatus } from "../constants";

const OrderDetail = () => {
  const [cardLogo, setCardLogo] = useState<React.ReactElement>();
  const [country, setCountry] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [isCancelOrder, setIsCancelOrder] = useState<boolean>(false);
  const [isCanceling, setIsCanceling] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const { notify } = useContext(NotificationContext);

  const { id } = useParams();

  const { redirect } = useNavigatePage();

  const { order, isLoading } = fetchSingleOrder(id ?? "");

  const handleCancelOrder = async () => {
    setIsCanceling(true);
    if (id) {
      try {
        await cancelOrder(id);
        setIsCancelOrder(true);
        notify({
          id: crypto.randomUUID(),
          content: "Canceled order",
          open: true,
          type: "success",
        });
      } catch (error) {
        notify({
          id: crypto.randomUUID(),
          content: "Cannot cancel your order",
          open: true,
          type: "error",
        });
      }
    }
    setIsCanceling(false);
  };

  useEffect(() => {
    if (order && order.payment) {
      const cardType = Payment.fns.cardType(order.payment!.cardNumber);
      const cardImage = (images as any)[cardType];

      setCardLogo(cardImage);
    }

    const fullAddress = order?.address.address;
    // NOTE: normally the address format from google is "house number, street, ward, district, city (postcode), country"
    if (fullAddress) {
      const addressParts = fullAddress.split(",");

      const houseAddressPart = addressParts.slice(0, 1);
      const cityPart = addressParts.slice(-2, -1);
      const countryPart = addressParts.slice(-1);

      setAddress(houseAddressPart.join(",").trim());
      setCity(cityPart.join(",").trim());
      setCountry(countryPart.join(",").trim());
    }

    if (order)
      setIsCancelOrder(() => order?.orderStatus === OrderStatus.CANCELED);
  }, [isLoading, order]);

  return (
    <div className="mx-auto my-5 w-4/5">
      {isLoading || isCanceling ? (
        <GifLoading />
      ) : (
        <>
          <div className="flex w-full items-center justify-between">
            <p className="text-base font-bold md:text-xl">
              Order ID: #{id?.split("-").at(-1)}
            </p>
            <motion.div
              whileHover={{ scale: 1.2 }}
              onClick={() => redirect("/orders")}
            >
              <BsFillArrowLeftCircleFill size={20} />
            </motion.div>
          </div>

          <hr className="my-2 h-px border-0 bg-gray-200" />
          <div className="mx-auto flex flex-col gap-10 xl:flex-row">
            {/* Column 1 */}
            <div className="flex w-full flex-col items-center gap-10 xl:w-2/3">
              {/* Item Summary Box */}
              <div className="flex w-full flex-col items-center gap-3 rounded-lg border-2 border-gray-200 py-5 px-8">
                <div className="w-full">
                  <div className="flex items-center justify-between">
                    <p className="w-2/5 text-sm font-bold md:text-lg">Items</p>
                    <p className="w-1/5 text-center text-xs font-bold md:text-base">
                      QTY
                    </p>
                    <p className="w-1/5 text-center text-xs font-bold md:text-base">
                      Price
                    </p>
                    <p className="w-1/5 text-center text-xs font-bold md:text-base">
                      Total
                    </p>
                  </div>
                  <hr className="mt-1 h-px border-0 bg-gray-300" />
                </div>
                {order?.orderDetails.map((item: CartType, index: number) => (
                  <div className="h-10 w-full" key={item.product.id}>
                    <div className="flex items-center justify-between">
                      <div className="flex w-2/5 items-center gap-2">
                        <img
                          src={item.product.image}
                          alt="product image"
                          className="h-10 w-8 object-contain"
                        />
                        <p className="invisible text-xs font-medium line-clamp-1 md:visible">
                          {item.product.title}
                        </p>
                      </div>
                      <p className="w-1/5 text-center text-xs md:text-base">
                        x{item.quantity}
                      </p>
                      <p className="w-1/5 text-center text-xs md:text-base">
                        ${item.product.price}
                      </p>
                      <p className="w-1/5 text-center text-xs md:text-base">
                        ${item.quantity * item.product.price}
                      </p>
                    </div>
                    {order?.orderDetails.length - 1 > index && (
                      <hr className="my-2 h-px border-0 bg-gray-300" />
                    )}
                  </div>
                ))}
              </div>

              {/* Customer details */}
              <div className="flex w-full flex-col gap-3 rounded-lg border-2 border-gray-200 py-5 px-8">
                <p className="text-lg font-bold">Customer details</p>
                <hr className="my-1 h-px border-0 bg-gray-300" />
                <div className="flex w-full justify-between">
                  <p className="font-semibold">Name</p>
                  <p>{order?.address.name}</p>
                </div>
                <hr className="my-1 h-px border-0 bg-gray-300" />
                <div className="flex w-full justify-between">
                  <p className="font-semibold">Phone</p>
                  <p>{order?.address.phoneNumber}</p>
                </div>
                <hr className="my-1 h-px border-0 bg-gray-300" />
                <div className="flex w-full justify-between">
                  <p className="font-semibold">Email</p>
                  <p>{order?.address.email}</p>
                </div>
              </div>
            </div>
            {/* Column 2 */}
            <div className="flex w-full flex-col items-center gap-10 xl:w-2/3">
              {/* Payment */}
              <div className="flex w-full flex-col gap-3 rounded-lg border-2 border-gray-200 py-5 px-8">
                <p className="text-lg font-bold">Payment</p>
                <hr className="my-1 h-px border-0 bg-gray-300" />
                <div className="flex w-full justify-between">
                  <p className="font-semibold">Type</p>
                  <p className="first-letter:capitalize">
                    {order?.paymentType}
                  </p>
                </div>
                {order?.payment && (
                  <div className="flex h-4 w-full items-center justify-end">
                    <svg className="h-4 w-10">{cardLogo}</svg>
                    <p>{order.payment.cardNumber}</p>
                  </div>
                )}
              </div>

              {/* Address */}
              <div className="flex w-full flex-col gap-3 rounded-lg border-2 border-gray-200 py-5 px-8">
                <p className="text-lg font-bold">Address</p>
                <hr className="my-1 h-px border-0 bg-gray-300" />
                <div className="flex w-full justify-between">
                  <p className="font-semibold">House</p>
                  <p className="first-letter:capitalize">{address}</p>
                </div>
                <hr className="my-1 h-px border-0 bg-gray-300" />
                <div className="flex w-full justify-between">
                  <p className="font-semibold">City</p>
                  <p className="first-letter:capitalize">{city}</p>
                </div>
                <hr className="my-1 h-px border-0 bg-gray-300" />
                <div className="flex w-full justify-between">
                  <p className="font-semibold">Country</p>
                  <p className="first-letter:capitalize">{country}</p>
                </div>
              </div>

              {/* Order Summary */}
              <div className="flex w-full flex-col gap-3 rounded-lg border-2 border-gray-200 py-5 px-8">
                <div className="flex w-full items-center justify-between">
                  <p className="text-lg font-bold">Order summary</p>
                  <div
                    className={`rounded-xl ${
                      isCancelOrder ? "bg-red-300" : "bg-green-300"
                    } p-2 font-semibold capitalize text-white`}
                  >
                    {isCancelOrder ? OrderStatus.CANCELED : order?.orderStatus}
                  </div>
                </div>

                <hr className="my-1 h-px border-0 bg-gray-300" />
                <div className="flex w-full justify-between">
                  <p className="font-semibold">Created</p>
                  <p className="first-letter:capitalize">
                    {order?.createdAt &&
                      convertTimestampToDate(
                        new Date(order!.createdAt).getTime()
                      )}
                  </p>
                </div>

                <hr className="my-1 h-px border-0 bg-gray-300" />
                <div className="flex w-full justify-between">
                  <p className="font-semibold">Total</p>
                  <p className="font-medium">
                    $
                    {order?.orderDetails &&
                      transformCartResponse(order.orderDetails).cartValue}
                  </p>
                </div>

                <hr className="my-1 h-px border-0 bg-gray-300" />
                {!isCancelOrder && (
                  <button
                    className="w-full rounded-lg bg-red-400 py-2 font-bold text-white"
                    onClick={() => setOpenModal(true)}
                  >
                    Cancel your order
                  </button>
                )}
              </div>
            </div>
          </div>

          <Modal
            open={openModal}
            onClose={() => setOpenModal(false)}
            onSubmit={handleCancelOrder}
          >
            <p>
              Do you want to cancel your order? You <strong>cannot</strong> undo
              this action later!
            </p>
          </Modal>
        </>
      )}
    </div>
  );
};

export default OrderDetail;
