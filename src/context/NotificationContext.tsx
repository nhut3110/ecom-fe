import { createContext, ReactElement, useCallback, useReducer } from "react";
import { NotificationProps } from "../components/Notification";

export type NotificationStateType = {
  notificationList: NotificationProps[];
};

const initNotificationState: NotificationStateType = {
  notificationList: [],
};

const enum REDUCER_ACTION_TYPE {
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION,
}

type ReducerAction = {
  type: REDUCER_ACTION_TYPE;
  payload: NotificationProps;
};

const notificationReducer = (
  state: NotificationStateType,
  action: ReducerAction
) => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.ADD_NOTIFICATION:
      return { notificationList: [...state.notificationList, action.payload] };

    case REDUCER_ACTION_TYPE.REMOVE_NOTIFICATION:
      return {
        notificationList: state.notificationList.filter(
          (notification) => notification.id !== action.payload.id
        ),
      };

    default:
      return state;
  }
};

const useNotificationContext = (initState: NotificationStateType) => {
  const [notificationState, dispatch] = useReducer(
    notificationReducer,
    initState
  );

  const addNotification = useCallback(
    (notification: NotificationProps) =>
      dispatch({
        type: REDUCER_ACTION_TYPE.ADD_NOTIFICATION,
        payload: notification,
      }),
    [dispatch]
  );

  const removeNotification = useCallback(
    (notification: NotificationProps) =>
      dispatch({
        type: REDUCER_ACTION_TYPE.REMOVE_NOTIFICATION,
        payload: notification,
      }),
    [dispatch]
  );

  return { notificationState, addNotification, removeNotification };
};

export type UseNotificationContextType = ReturnType<
  typeof useNotificationContext
>;

const initContextState: UseNotificationContextType = {
  notificationState: initNotificationState,
  addNotification: (notification: NotificationProps) => {},
  removeNotification: (notification: NotificationProps) => {},
};

export const NotificationContext =
  createContext<UseNotificationContextType>(initContextState);

type ChildrenType = {
  children?: ReactElement | ReactElement[] | undefined;
};

export const NotificationProvider = ({
  children,
  ...initState
}: NotificationStateType & ChildrenType): ReactElement => {
  return (
    <NotificationContext.Provider value={useNotificationContext(initState)}>
      {children}
    </NotificationContext.Provider>
  );
};
