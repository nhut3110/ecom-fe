import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { OrderType, ProductDetails } from "../constants/data";
import { getLocalStorageValue } from "../utils/LocalStorage";
import { CartProvider } from "./CartContext";
import { FavoriteProvider } from "./FavoriteContext";
import { defaultForm, FormProvider } from "./FormContext";
import { OrderProvider } from "./OrderContext";
import { NotificationProvider } from "./NotificationContext";
import { NotificationType } from "../components/Notification";
import { UserDataType } from "../services/auth.api";
import { AuthProvider } from "./AuthContext";

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
  const queryClient = new QueryClient();

  const { favoriteList } = getLocalStorageValue({ key: "favorites" });
  const orderList = getLocalStorageValue({ key: "orders" });
  const userData = getLocalStorageValue({ key: "key" });

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
        <QueryClientProvider client={queryClient}>
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
        </QueryClientProvider>
      </AuthProvider>
    </NotificationProvider>
  );
};

export default Contexts;
