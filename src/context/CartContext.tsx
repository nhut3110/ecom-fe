import { createContext, ReactElement, useCallback, useReducer } from "react";
import { ProductDetails } from "../constants/data";

export type CartStateType = {
  cartValue: number;
  cartList: {
    [productID: string]: {
      quantity: number;
      product: ProductDetails;
      cartAnimations: {
        id: string;
        product: ProductDetails;
      }[];
    };
  };
  cartPositions: {
    cartX: number;
    cartY: number;
  };
};

const DEFAULT_CART_VALUE: number = 0;

const enum REDUCER_ACTION_TYPE {
  ADD_TO_CART = "ADD_TO_CART",
  INCREASE_QUANTITY = "INCREASE_QUANTITY",
  DECREASE_QUANTITY = "DECREASE_QUANTITY",
  REMOVE_PRODUCT = "REMOVE_PRODUCT",
  REMOVE_ALL = "REMOVE_ALL",
  CALCULATE_VALUE = "CALCULATE_VALUE",
}

const enum ANIMATION_ACTION_TYPE {
  UPDATE_CART_POSITIONS = "UPDATE_CART_POSITIONS",
  ADD_CART_ANIMATION = "ADD_CART_ANIMATION",
  REMOVE_CART_ANIMATION = "REMOVE_CART_ANIMATION",
}

type ReducerAction =
  | {
      type: REDUCER_ACTION_TYPE.ADD_TO_CART;
      payload: {
        quantity: number;
        product: ProductDetails;
        id: string;
      };
    }
  | {
      type:
        | REDUCER_ACTION_TYPE.INCREASE_QUANTITY
        | REDUCER_ACTION_TYPE.DECREASE_QUANTITY
        | REDUCER_ACTION_TYPE.REMOVE_PRODUCT
        | REDUCER_ACTION_TYPE.REMOVE_ALL
        | REDUCER_ACTION_TYPE.CALCULATE_VALUE;
      payload?: {
        quantity?: number;
        product: ProductDetails;
      };
    }
  | {
      type: ANIMATION_ACTION_TYPE.UPDATE_CART_POSITIONS;
      payload: {
        cartX: number;
        cartY: number;
      };
    }
  | {
      type: ANIMATION_ACTION_TYPE.REMOVE_CART_ANIMATION;
      payload: {
        id: string;
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
      if (!cartItem || !cartItem.id) {
        return state;
      }

      const animatedItem = {
        id: action.payload!.id,
        product: action.payload!.product,
      };

      const existingItem = state.cartList[cartItem.id];
      if (existingItem)
        return {
          ...state,
          cartList: {
            ...state.cartList,
            [cartItem.id]: {
              ...existingItem,
              quantity: existingItem.quantity + action.payload!.quantity!,
              cartAnimations: [...existingItem.cartAnimations, animatedItem],
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
            cartAnimations: [animatedItem],
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
            quantity: cartItem.quantity - 1 > 0 ? cartItem.quantity - 1 : 0,
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

    case ANIMATION_ACTION_TYPE.UPDATE_CART_POSITIONS: {
      return {
        ...state,
        cartPositions: {
          cartX: action.payload.cartX,
          cartY: action.payload.cartY,
        },
      };
    }

    case ANIMATION_ACTION_TYPE.REMOVE_CART_ANIMATION: {
      const cartItemID = action.payload!.product.id;
      const cartItem = state.cartList[cartItemID];

      return {
        ...state,
        cartList: {
          ...state.cartList,
          [cartItemID]: {
            ...cartItem,
            cartAnimations: cartItem.cartAnimations.filter(
              (animation) => animation.id !== action.payload.id
            ),
          },
        },
      };
    }

    default:
      return state;
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
    (quantity: number, product: ProductDetails, id: string) =>
      dispatch({
        type: REDUCER_ACTION_TYPE.ADD_TO_CART,
        payload: { quantity, product, id },
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

  const updateCartPositions = useCallback(
    (position: { cartX: number; cartY: number }) =>
      dispatch({
        type: ANIMATION_ACTION_TYPE.UPDATE_CART_POSITIONS,
        payload: position,
      }),
    [dispatch]
  );

  const removeCartAnimation = useCallback(
    (animation: { id: string; product: ProductDetails }) =>
      dispatch({
        type: ANIMATION_ACTION_TYPE.REMOVE_CART_ANIMATION,
        payload: animation,
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
    updateCartPositions,
    removeCartAnimation,
  };
};

export type UseCartContextType = ReturnType<typeof useCartContext>;

const initContextState: UseCartContextType = {
  cartState: {
    cartList: {},
    cartValue: DEFAULT_CART_VALUE,
    cartPositions: { cartX: 0, cartY: 0 },
  },
  calculateCartValue: (quantity: number, product: ProductDetails) => {},
  addToCart: (quantity: number, product: ProductDetails) => {},
  increaseQuantity: (quantity: number, product: ProductDetails) => {},
  decreaseQuantity: (quantity: number, product: ProductDetails) => {},
  removeFromCart: (product: ProductDetails) => {},
  removeAllFromCart: () => {},
  updateCartPositions: (position: { cartX: number; cartY: number }) => {},
  removeCartAnimation: (animation: { id: string }) => {},
  // addCartAnimation: (animation: { id: string; product: ProductDetails }) => {},
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
