import React from "react";
import OrderCard from "../components/OrderCard";
import GifLoading from "../components/GifLoading";
import OpacityMotionWrapper from "../components/Animation/OpacityMotionWrapper";
import { Order, fetchOrderList } from "../services";

const Order = (): React.ReactElement => {
  const { orders, isLoading } = fetchOrderList();

  return (
    <div className="mx-auto my-5 w-4/5">
      {isLoading && <GifLoading />}
      <p className="text-xl font-bold">Check your order history</p>
      <hr className="my-2 h-px border-0 bg-gray-200" />
      <div className="mx-auto flex flex-col items-center justify-center gap-20 md:w-4/5">
        {!isLoading &&
          orders?.map((order: Order) => (
            <OpacityMotionWrapper className="w-full" key={order.id}>
              <OrderCard order={order} key={order.id} />
            </OpacityMotionWrapper>
          ))}
      </div>
    </div>
  );
};

export default Order;
