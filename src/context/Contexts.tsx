import React, { useState } from "react";
import { OrderType, ProductDetails } from "../constants/data";
import { getLocalStorageValue } from "../utils/localStorage";
import { CartProvider } from "./CartContext";
import { FavoriteProvider } from "./FavoriteContext";
import { defaultForm, FormProvider } from "./FormContext";
import { OrderProvider } from "./OrderContext";
import { NotificationProvider } from "./NotificationContext";
import { NotificationType } from "../components/Notification";
import { AuthProvider } from "./AuthContext";
import { TokensType } from "../services/types.api";
import { UserDataProvider } from "./UserDataContext";

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
  const [user, setUser] = useState<TokensType>(
    !!Object.keys(userData).length ? userData : {}
  );

  return (
    <NotificationProvider notificationList={initNotificationList}>
      <AuthProvider
        accessToken={user?.accessToken}
        refreshToken={user?.refreshToken}
      >
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
      </AuthProvider>
    </NotificationProvider>
  );
};

export default Contexts;
