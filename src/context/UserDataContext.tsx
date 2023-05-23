import { createContext, ReactElement, useCallback, useReducer } from "react";
import { UserData } from "../services/types.api";

type UserStateType = UserData;

const enum REDUCER_ACTION_TYPE {
  REMOVE_USER,
  UPDATE_USER,
}

type ReducerAction = {
  type: REDUCER_ACTION_TYPE;
  payload?: UserStateType;
};

const userDataReducer = (state: UserStateType, action: ReducerAction) => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.UPDATE_USER: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case REDUCER_ACTION_TYPE.REMOVE_USER: {
      return {};
    }

    default:
      return state;
  }
};

const useUserDataContext = (initState: UserStateType) => {
  const [userDataState, dispatch] = useReducer(userDataReducer, initState);

  const updateUserData = useCallback(
    (data: UserStateType) =>
      dispatch({ type: REDUCER_ACTION_TYPE.UPDATE_USER, payload: data }),
    [dispatch]
  );

  const removeUserData = useCallback(
    () => dispatch({ type: REDUCER_ACTION_TYPE.REMOVE_USER }),
    [dispatch]
  );

  return { userDataState, updateUserData, removeUserData };
};

export type UseUserDataContextType = ReturnType<typeof useUserDataContext>;

const initContextState: UseUserDataContextType = {
  updateUserData: (data: UserStateType) => {},
  removeUserData: () => {},
  userDataState: {},
};

export const UserDataContext =
  createContext<UseUserDataContextType>(initContextState);

type ChildrenType = {
  children?: ReactElement | ReactElement[] | undefined;
};

export const UserDataProvider = ({
  children,
  ...initState
}: UserStateType & ChildrenType): ReactElement => {
  return (
    <UserDataContext.Provider value={useUserDataContext(initState)}>
      {children}
    </UserDataContext.Provider>
  );
};
