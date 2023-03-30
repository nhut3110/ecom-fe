import React, { useContext, useState } from "react";
import ProductCard from "../components/ProductCard";
import SelectSortMenu from "../utils/SelectSortMenu";
import { ProductDetails } from "../constants/data";
import { FavoriteContext } from "../context/FavoriteContext";

const Favorite = (): React.ReactElement => {
  const { favoriteState } = useContext(FavoriteContext);

  return (
    <div>
      {/* Sort Option List */}
      <div className="m-10 grid grid-cols-2 justify-end gap-5 md:flex">
        {SelectSortMenu()}
      </div>

      {/* Favorite List  */}
      <div className="mt-10 grid w-auto grid-cols-1 justify-items-center gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-fluid">
        {favoriteState.favoriteList.map((product: ProductDetails) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};

export default Favorite;
