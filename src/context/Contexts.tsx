import React from "react";
import { CartProvider } from "./CartContext";
import { FavoriteProvider } from "./FavoriteContext";
type ChildrenType = {
  children: React.ReactElement | React.ReactElement[];
};
const Contexts = ({ children }: ChildrenType): React.ReactElement => {
  return (
    <FavoriteProvider favoriteList={[]}>
      <CartProvider cartList={{}}>{children}</CartProvider>
    </FavoriteProvider>
  );
};

export default Contexts;
