import { createContext, ReactElement, useCallback, useReducer } from "react";
import { ProductDetails } from "../constants/data";

export type CartStateType = {
  cartValue: number;
  cartList: {
    [productID: string]: {
      quantity: number;
      product: ProductDetails;
    };
  };
};

const DEFAULT_CART_VALUE: number = 0;

const enum REDUCER_ACTION_TYPE {
  ADD_TO_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  REMOVE_PRODUCT,
  REMOVE_ALL,
  CALCULATE_VALUE,
}

type ReducerAction = {
  type: REDUCER_ACTION_TYPE;
  payload?: {
    quantity?: number;
    product: ProductDetails;
  };
};

const cartReducer = (state: CartStateType, action: ReducerAction) => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.CALCULATE_VALUE: {
      const updatedPrice =
        (action.payload?.product.price ?? DEFAULT_CART_VALUE) *
        (action.payload?.quantity ?? DEFAULT_CART_VALUE);

      return {
        ...state,
        cartValue:
          (typeof state.cartValue === "number"
            ? state.cartValue
            : DEFAULT_CART_VALUE) + updatedPrice,
      };
    }

    case REDUCER_ACTION_TYPE.ADD_TO_CART: {
      const cartItem = action.payload!.product;
      const existingItem = state.cartList[cartItem.id];
      if (existingItem)
        return {
          ...state,
          cartList: {
            ...state.cartList,
            [cartItem.id]: {
              ...existingItem,
              quantity: existingItem.quantity + action.payload!.quantity!,
            },
          },
        };

      return {
        ...state,
        cartList: {
          ...state.cartList,
          [cartItem.id]: {
            product: cartItem,
            quantity: action.payload!.quantity,
          },
        },
      };
    }

    case REDUCER_ACTION_TYPE.INCREASE_QUANTITY: {
      const cartItemID = action.payload!.product.id;
      const quantity = action.payload!.quantity;
      const cartItem = state.cartList[cartItemID];

      return {
        ...state,
        cartList: {
          ...state.cartList,
          [cartItemID]: {
            ...cartItem,
            quantity: cartItem.quantity + quantity!,
          },
        },
      };
    }

    case REDUCER_ACTION_TYPE.DECREASE_QUANTITY: {
      const cartItemID = action.payload!.product.id;
      const cartItem = state.cartList[cartItemID];

      return {
        ...state,
        cartList: {
          ...state.cartList,
          [cartItemID]: {
            ...cartItem,
            quantity: cartItem.quantity - 1 >= 0 ? cartItem.quantity - 1 : 0,
          },
        },
      };
    }

    case REDUCER_ACTION_TYPE.REMOVE_PRODUCT: {
      const newCartList = { ...state.cartList };
      const cartItemID = action.payload!.product.id;
      delete newCartList[cartItemID];

      return { ...state, cartList: newCartList };
    }

    case REDUCER_ACTION_TYPE.REMOVE_ALL: {
      return { ...state, cartList: {}, cartValue: DEFAULT_CART_VALUE };
    }

    default:
      throw new Error(`Unknown action type ${action.type}`);
  }
};

const useCartContext = (initState: CartStateType) => {
  const [cartState, dispatch] = useReducer(cartReducer, initState);

  const calculateCartValue = useCallback(
    (quantity: number, product: ProductDetails) =>
      dispatch({
        type: REDUCER_ACTION_TYPE.CALCULATE_VALUE,
        payload: { quantity, product },
      }),
    [dispatch]
  );

  const addToCart = useCallback(
    (quantity: number, product: ProductDetails) =>
      dispatch({
        type: REDUCER_ACTION_TYPE.ADD_TO_CART,
        payload: { quantity, product },
      }),
    [dispatch]
  );

  const increaseQuantity = useCallback(
    (quantity: number, product: ProductDetails) =>
      dispatch({
        type: REDUCER_ACTION_TYPE.INCREASE_QUANTITY,
        payload: { quantity, product },
      }),
    [dispatch]
  );

  const decreaseQuantity = useCallback(
    (quantity: number, product: ProductDetails) =>
      dispatch({
        type: REDUCER_ACTION_TYPE.DECREASE_QUANTITY,
        payload: { quantity, product },
      }),
    [dispatch]
  );

  const removeFromCart = useCallback(
    (product: ProductDetails) =>
      dispatch({
        type: REDUCER_ACTION_TYPE.REMOVE_PRODUCT,
        payload: { product },
      }),
    [dispatch]
  );

  const removeAllFromCart = useCallback(
    () =>
      dispatch({
        type: REDUCER_ACTION_TYPE.REMOVE_ALL,
        payload: undefined,
      }),
    [dispatch]
  );

  return {
    cartState,
    calculateCartValue,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    removeAllFromCart,
  };
};

export type UseCartContextType = ReturnType<typeof useCartContext>;

const initContextState: UseCartContextType = {
  cartState: { cartList: {}, cartValue: DEFAULT_CART_VALUE },
  calculateCartValue: (quantity: number, product: ProductDetails) => {},
  addToCart: (quantity: number, product: ProductDetails) => {},
  increaseQuantity: (quantity: number, product: ProductDetails) => {},
  decreaseQuantity: (quantity: number, product: ProductDetails) => {},
  removeFromCart: (product: ProductDetails) => {},
  removeAllFromCart: () => {},
};

export const CartContext = createContext<UseCartContextType>(initContextState);

type ChildrenType = {
  children?: ReactElement | ReactElement[] | undefined;
};

export const CartProvider = ({
  children,
  ...initState
}: CartStateType & ChildrenType): ReactElement => {
  return (
    <CartContext.Provider value={useCartContext(initState)}>
      {children}
    </CartContext.Provider>
  );
};
