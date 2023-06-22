import { createContext, ReactElement, useCallback, useReducer } from "react";
import { updateLocalStorageValue } from "../utils";
import { ProductDetails } from "../constants";

export type FavoriteStateType = {
  favoriteList: ProductDetails[];
};

const initFavoriteState: FavoriteStateType = {
  favoriteList: [],
};

const enum REDUCER_ACTION_TYPE {
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  CLEAR_FAVORITE,
}

type ReducerAction =
  | {
      type: REDUCER_ACTION_TYPE;
      payload: ProductDetails;
    }
  | { type: REDUCER_ACTION_TYPE.CLEAR_FAVORITE };

const favoriteReducer = (state: FavoriteStateType, action: ReducerAction) => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.ADD_FAVORITE:
      return { favoriteList: [...state.favoriteList, action.payload] };

    case REDUCER_ACTION_TYPE.REMOVE_FAVORITE:
      return {
        favoriteList: state.favoriteList.filter(
          (product) => product.id !== action.payload!.id
        ),
      };

    case REDUCER_ACTION_TYPE.CLEAR_FAVORITE: {
      return {
        favoriteList: [],
      };
    }

    default:
      return state;
  }
};

const useFavoriteContext = (initState: FavoriteStateType) => {
  const [favoriteState, dispatch] = useReducer(favoriteReducer, initState);

  const addFavorite = useCallback(
    (product: ProductDetails) =>
      dispatch({ type: REDUCER_ACTION_TYPE.ADD_FAVORITE, payload: product }),
    [dispatch]
  );

  const removeFavorite = useCallback(
    (product: ProductDetails) =>
      dispatch({ type: REDUCER_ACTION_TYPE.REMOVE_FAVORITE, payload: product }),
    [dispatch]
  );

  const clearFavorite = useCallback(
    () =>
      dispatch({
        type: REDUCER_ACTION_TYPE.CLEAR_FAVORITE,
      }),
    [dispatch]
  );

  return { favoriteState, addFavorite, removeFavorite, clearFavorite };
};

export type UseFavoriteContextType = ReturnType<typeof useFavoriteContext>;

const initContextState: UseFavoriteContextType = {
  favoriteState: { favoriteList: [] },
  addFavorite: (product: ProductDetails) => {},
  removeFavorite: (product: ProductDetails) => {},
  clearFavorite: () => {},
};

export const FavoriteContext =
  createContext<UseFavoriteContextType>(initContextState);

type ChildrenType = {
  children?: ReactElement | ReactElement[] | undefined;
};

export const FavoriteProvider = ({
  children,
  ...initState
}: FavoriteStateType & ChildrenType): ReactElement => {
  return (
    <FavoriteContext.Provider value={useFavoriteContext(initState)}>
      {children}
    </FavoriteContext.Provider>
  );
};
