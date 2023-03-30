import { createContext, ReactElement, useCallback, useReducer } from "react";
import { OrderType } from "../constants/data";
import { updateLocalStorageValue } from "../utils/LocalStorage";

export type OrderStateType = {
  orderList: OrderType[];
};

const initOrderState: OrderStateType = {
  orderList: [],
};

const enum REDUCER_ACTION_TYPE {
  ADD_ORDER,
  REMOVE_ORDER,
  UPDATE_STORAGE,
}

type ReducerAction =
  | {
      type: REDUCER_ACTION_TYPE;
      payload: OrderType;
    }
  | { type: REDUCER_ACTION_TYPE.UPDATE_STORAGE };

const orderReducer = (state: OrderStateType, action: ReducerAction) => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.ADD_ORDER:
      return { orderList: [...state.orderList, action.payload] };

    case REDUCER_ACTION_TYPE.REMOVE_ORDER:
      return {
        orderList: state.orderList.filter(
          (order) => order.uuid !== action.payload!.uuid
        ),
      };

    case REDUCER_ACTION_TYPE.UPDATE_STORAGE:
      updateLocalStorageValue({ key: "orders", value: state.orderList });

    default:
      return state;
  }
};

const useOrderContext = (initState: OrderStateType) => {
  const [orderState, dispatch] = useReducer(orderReducer, initState);

  const addOrder = useCallback(
    (order: OrderType) =>
      dispatch({ type: REDUCER_ACTION_TYPE.ADD_ORDER, payload: order }),
    [dispatch]
  );

  const removeOrder = useCallback(
    (order: OrderType) =>
      dispatch({ type: REDUCER_ACTION_TYPE.REMOVE_ORDER, payload: order }),
    [dispatch]
  );

  const storeOrder = useCallback(
    () => dispatch({ type: REDUCER_ACTION_TYPE.UPDATE_STORAGE }),
    [dispatch]
  );

  return { orderState, addOrder, removeOrder, storeOrder };
};

export type UseOrderContextType = ReturnType<typeof useOrderContext>;

const initContextState: UseOrderContextType = {
  orderState: { orderList: [] },
  addOrder: (order: OrderType) => {},
  removeOrder: (order: OrderType) => {},
  storeOrder: () => {},
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
