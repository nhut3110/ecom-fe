import React, { useContext, useState } from "react";
import { useSortAndFilterProduct } from "../hooks/useSortAndFilterProduct";
import ProductCard from "../components/ProductCard";
import { selectSortMenu } from "../utils/selectSortMenu";
import OpacityMotionWrapper from "../components/Animation/OpacityMotionWrapper";
import { ProductDetails } from "../constants/data";
import { FavoriteContext } from "../context/FavoriteContext";
import { Link } from "react-router-dom";

const Favorite = (): React.ReactElement => {
  const { favoriteState } = useContext(FavoriteContext);
  const { renderSelectSortMenu, selectedSort, selectedFilter } =
    selectSortMenu();

  const { filteredProducts } = useSortAndFilterProduct({
    products: favoriteState.favoriteList,
    selectedSort,
    selectedFilter,
  });

  const renderFavoriteList = () => {
    return (
      <div className="mt-10 grid w-auto grid-cols-1 justify-items-center gap-x-5 gap-y-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-fluid">
        {filteredProducts.map((product: ProductDetails) => (
          <OpacityMotionWrapper key={product.id}>
            <ProductCard product={product} key={product.id} />
          </OpacityMotionWrapper>
        ))}
      </div>
    );
  };

  return (
    <div>
      {/* Sort Option List */}
      <div className="m-10 grid grid-cols-2 justify-end gap-5 md:flex">
        {renderSelectSortMenu()}
      </div>

      {/* Favorite List  */}
      <div className="min-h-[15rem] w-full">
        {filteredProducts.length ? (
          renderFavoriteList()
        ) : (
          <div className="flex w-full flex-col items-center justify-center">
            <p className="text-2xl font-semibold">No favorite Products.</p>
            <Link
              to={"/products"}
              className="text-sm italic text-gray-400 hover:text-black"
            >
              Back to product page.
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorite;
