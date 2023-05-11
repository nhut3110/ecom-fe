import React, { useContext, useState } from "react";
import { useSortAndFilterProduct } from "../hooks/useSortAndFilterProduct";
import ProductCard from "../components/ProductCard";
import { selectSortMenu } from "../utils/selectSortMenu";
import OpacityMotionWrapper from "../components/Animation/OpacityMotionWrapper";
import { ProductDetails } from "../constants/data";
import { FavoriteContext } from "../context/FavoriteContext";

const Favorite = (): React.ReactElement => {
  const { favoriteState } = useContext(FavoriteContext);
  const { renderSelectSortMenu, selectedSort, selectedFilter } =
    selectSortMenu();

  const { filteredProducts } = useSortAndFilterProduct({
    products: favoriteState.favoriteList,
    selectedSort,
    selectedFilter,
  });

  return (
    <div>
      {/* Sort Option List */}
      <div className="m-10 grid grid-cols-2 justify-end gap-5 md:flex">
        {renderSelectSortMenu()}
      </div>

      {/* Favorite List  */}
      <div className="mt-10 grid w-auto grid-cols-1 justify-items-center gap-x-5 gap-y-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-fluid">
        {filteredProducts.map((product: ProductDetails) => (
          <OpacityMotionWrapper key={product.id}>
            <ProductCard product={product} key={product.id} />
          </OpacityMotionWrapper>
        ))}
      </div>
    </div>
  );
};

export default Favorite;
