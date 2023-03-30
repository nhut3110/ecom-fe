import React, { useState } from "react";
import { OrderType, ProductDetails } from "../constants/data";
import { getLocalStorageValue } from "../utils/LocalStorage";
import { CartProvider } from "./CartContext";
import { FavoriteProvider } from "./FavoriteContext";
import { defaultForm, FormProvider } from "./FormContext";
import { OrderProvider } from "./OrderContext";

type ChildrenType = {
  children: React.ReactElement | React.ReactElement[];
};

const Contexts = ({ children }: ChildrenType): React.ReactElement => {
  const { favoriteList } = getLocalStorageValue({ key: "favorites" });

  const [list, setList] = useState<ProductDetails[]>(
    favoriteList === undefined ? [] : favoriteList
  );

  const orderList = getLocalStorageValue({ key: "orders" });
  const [orders, setOrders] = useState<OrderType[]>(
    orderList === undefined ? [] : orderList
  );

  return (
    <OrderProvider orderList={orders}>
      <FavoriteProvider favoriteList={list}>
        <CartProvider cartList={{}} cartValue={0}>
          <FormProvider
            information={defaultForm.information}
            address={defaultForm.address}
            payment={defaultForm.payment}
            forms={defaultForm.forms}
            step={defaultForm.step}
          >
            {children}
          </FormProvider>
        </CartProvider>
      </FavoriteProvider>
    </OrderProvider>
  );
};

export default Contexts;