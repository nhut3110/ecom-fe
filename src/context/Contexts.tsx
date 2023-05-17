import React, { useContext, useState } from "react";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { OrderType, ProductDetails } from "../constants/data";
import { getLocalStorageValue } from "../utils/localStorage";
import { CartProvider } from "./CartContext";
import { FavoriteProvider } from "./FavoriteContext";
import { defaultForm, FormProvider } from "./FormContext";
import { OrderProvider } from "./OrderContext";
import {
  NotificationContext,
  NotificationProvider,
} from "./NotificationContext";
import { NotificationType } from "../components/Notification";
import { UserDataType } from "../services/auth.api";
import { AuthProvider } from "./AuthContext";
import { checkIsTokenExpired } from "../utils/checkIsTokenExpired";
import QueryWrapper from "../components/QueryWrapper";

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
  const [user, setUser] = useState<UserDataType>(
    !!Object.keys(userData).length ? userData : {}
  );

  return (
    <NotificationProvider notificationList={initNotificationList}>
      <AuthProvider
        accessToken={user?.accessToken}
        refreshToken={user?.refreshToken}
      >
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
      </AuthProvider>
    </NotificationProvider>
  );
};

export default Contexts;
