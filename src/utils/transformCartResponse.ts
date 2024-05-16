import { CartType } from "../services";
import { CartStateType } from "../context/CartContext";

const DEFAULT_CART_VALUE: number = 0;

export const transformCartResponse = (list: CartType[]) => {
  const cart: CartStateType = {
    cartList: {},
    cartValue: DEFAULT_CART_VALUE,
  };

  cart.cartValue = Number(
    list
      .reduce((total, item) => {
        cart.cartList[item.product.id] = {
          quantity: item.quantity,
          product: item.product,
          cartAnimations: [],
        };
        return (
          total +
          item.quantity *
            (item.product.price -
              (item.product.price * item.product.discountPercentage) / 100)
        );
      }, 0)
      .toFixed(2)
  );

  return cart;
};
