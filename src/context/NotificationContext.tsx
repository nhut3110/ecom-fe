import { createContext, ReactElement, useCallback, useReducer } from "react";
import { NotificationType } from "../components/Notification";

export type NotificationStateType = {
  notificationList: NotificationType[];
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
  payload: NotificationType;
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

  const notify = useCallback(
    (notification: NotificationType) =>
      dispatch({
        type: REDUCER_ACTION_TYPE.ADD_NOTIFICATION,
        payload: notification,
      }),
    [dispatch]
  );

  const dismiss = useCallback(
    (notification: NotificationType) =>
      dispatch({
        type: REDUCER_ACTION_TYPE.REMOVE_NOTIFICATION,
        payload: notification,
      }),
    [dispatch]
  );

  return { notificationState, notify, dismiss };
};

export type UseNotificationContextType = ReturnType<
  typeof useNotificationContext
>;

const initContextState: UseNotificationContextType = {
  notificationState: initNotificationState,
  notify: (notification: NotificationType) => {},
  dismiss: (notification: NotificationType) => {},
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
