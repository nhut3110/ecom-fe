import { Link } from "react-router-dom";
import React, { useContext } from "react";
import ProductCard from "../components/ProductCard";
import OpacityMotionWrapper from "../components/Animation/OpacityMotionWrapper";
import { FavoriteContext } from "../context/FavoriteContext";
import { selectSortMenu } from "../utils";
import { ProductDetails } from "../constants";

// TODO: update in the next PR with new API

const Favorite = (): React.ReactElement => {
  const { favoriteState } = useContext(FavoriteContext);
  const { renderSelectSortMenu, selectedSort, selectedFilter } =
    selectSortMenu();

  const renderFavoriteList = () => {
    return (
      <div className="mt-10 grid w-auto grid-cols-1 justify-items-center gap-x-5 gap-y-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-fluid">
        {favoriteState.favoriteList.map((product: ProductDetails) => (
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
        {favoriteState.favoriteList.length ? (
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
