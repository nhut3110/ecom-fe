import { createContext, ReactElement, useCallback, useReducer } from "react";
import { Order } from "../services";

export type OrderStateType = {
  orderList: Order[];
};

const initOrderState: OrderStateType = {
  orderList: [],
};

const enum REDUCER_ACTION_TYPE {
  ADD_ORDER,
  REMOVE_ORDER,
  UPDATE_STORAGE,
  IMPORT_ORDERS,
}

type ReducerAction =
  | {
      type: REDUCER_ACTION_TYPE;
      payload: Order;
    }
  | {
      type: REDUCER_ACTION_TYPE.IMPORT_ORDERS;
      payload: Order[];
    };

const orderReducer = (state: OrderStateType, action: ReducerAction) => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.ADD_ORDER:
      return { orderList: [...state.orderList, action.payload] };

    case REDUCER_ACTION_TYPE.REMOVE_ORDER:
      return {
        orderList: state.orderList.filter(
          (order) => order.id !== action.payload!.id
        ),
      };

    case REDUCER_ACTION_TYPE.IMPORT_ORDERS:
      return {
        orderList: Array.isArray(action.payload)
          ? [...action.payload]
          : [action.payload],
      };

    default:
      return state;
  }
};

const useOrderContext = (initState: OrderStateType) => {
  const [orderState, dispatch] = useReducer(orderReducer, initState);

  const addOrder = useCallback(
    (order: Order) =>
      dispatch({ type: REDUCER_ACTION_TYPE.ADD_ORDER, payload: order }),
    [dispatch]
  );

  const removeOrder = useCallback(
    (order: Order) =>
      dispatch({ type: REDUCER_ACTION_TYPE.REMOVE_ORDER, payload: order }),
    [dispatch]
  );

  const importOrders = useCallback(
    (orders: Order[]) =>
      dispatch({ type: REDUCER_ACTION_TYPE.IMPORT_ORDERS, payload: orders }),
    [dispatch]
  );

  return { orderState, addOrder, removeOrder, importOrders };
};

export type UseOrderContextType = ReturnType<typeof useOrderContext>;

const initContextState: UseOrderContextType = {
  orderState: { orderList: [] },
  addOrder: (order: Order) => {},
  removeOrder: (order: Order) => {},
  importOrders: (orders: Order[]) => {},
};

export const OrderContext =
  createContext<UseOrderContextType>(initContextState);

type ChildrenType = {
  children?: ReactElement | ReactElement[] | undefined;
};

export const OrderProvider = ({
  children,
  ...initState
}: OrderStateType & ChildrenType): ReactElement => {
  return (
    <OrderContext.Provider value={useOrderContext(initState)}>
      {children}
    </OrderContext.Provider>
  );
};
