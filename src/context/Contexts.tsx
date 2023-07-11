import React, { useState } from "react";
import { FavoriteProvider } from "./FavoriteContext";
import { NotificationProvider } from "./NotificationContext";
import { CartProvider } from "./CartContext";
import { OrderProvider } from "./OrderContext";
import { UserDataProvider } from "./UserDataContext";
import { defaultForm, FormProvider } from "./FormContext";
import { NotificationType } from "../components/Notification";
import { TokensType } from "../services";
import { getLocalStorageValue } from "../utils";
import { OrderType, ProductDetails } from "../constants";

type ChildrenType = {
  children: React.ReactElement | React.ReactElement[];
};

// initial value for context
const initCartList = {};
const initCartValue = 0;
const initNotificationList: NotificationType[] = [];
const initCartPosition = {
  cartX: 0,
  cartY: 0,
};

const Contexts = ({ children }: ChildrenType): React.ReactElement => {
  const { favoriteList } = getLocalStorageValue({ key: "favorites" });
  const orderList = getLocalStorageValue({ key: "orders" });
  const userData = getLocalStorageValue({ key: "tokens" });

  const [list, setList] = useState<ProductDetails[]>(
    !favoriteList ? [] : favoriteList
  );
  const [orders, setOrders] = useState<OrderType[]>(
    !!Object.keys(orderList).length ? orderList : []
  );
  const [tokens, setTokens] = useState<TokensType>(
    !!Object.keys(userData).length ? userData : {}
  );

  return (
    <NotificationProvider notificationList={initNotificationList}>
      <UserDataProvider>
        <OrderProvider orderList={orders}>
          <FavoriteProvider favoriteList={list}>
            <CartProvider
              cartList={initCartList}
              cartValue={initCartValue}
              cartPositions={initCartPosition}
            >
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
      </UserDataProvider>
    </NotificationProvider>
  );
};

export default Contexts;
