import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { useFetchProductList } from "../hooks/useFetchProductList";
import ProductCard from "../components/ProductCard";
import OpacityMotionWrapper from "../components/Animation/OpacityMotionWrapper";
import { FavoriteContext } from "../context/FavoriteContext";
import { determineSortDirections, selectSortMenu } from "../utils";
import { ProductDetails } from "../constants";
import { getFavorites } from "../services/products.api";
import GifLoading from "../components/GifLoading";
import SmallButton from "../components/SmallButton";
import SearchBar from "../components/SearchBar";

// TODO: update in the next PR with new API

const Favorite = (): React.ReactElement => {
  const { favoriteState } = useContext(FavoriteContext);

  const { renderSelectSortMenu, selectedSort, selectedFilter } =
    selectSortMenu();

  const { isLoading, cursor, totalRecords, fetchList } = useFetchProductList({
    selectedSort,
    selectedFilter,
    queryFn: getFavorites,
  });

  const handleLoadMore = () => {
    const sortOptions = determineSortDirections(selectedSort);
    const filterOptions = selectedFilter ? { categoryId: selectedFilter } : {};

    fetchList(sortOptions, filterOptions, cursor);
  };

  const renderFavoriteList = () => {
    return (
      <div>
        <div className="mt-10 grid w-auto grid-cols-1 justify-items-center gap-x-5 gap-y-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-fluid">
          {favoriteState.favoriteList.map((product: ProductDetails) => (
            <OpacityMotionWrapper key={product.id}>
              <ProductCard product={product} key={product.id} />
            </OpacityMotionWrapper>
          ))}
        </div>
        {favoriteState.favoriteList.length < totalRecords && (
          <div className="my-5 flex w-full items-center justify-center">
            <SmallButton content="Load more" onClick={handleLoadMore} />
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      {/* Sort Option and Search List */}
      <div className="flex flex-col md:flex-row md:justify-between">
        <div className="mx-10 my-5 lg:w-1/2">
          <SearchBar queryFn={getFavorites} />
        </div>
        <div className="mx-10 grid grid-cols-2 justify-end gap-5 md:flex">
          {renderSelectSortMenu()}
        </div>
      </div>

      {/* Favorite List  */}
      <div className="min-h-[15rem] w-full">
        {favoriteState.favoriteList.length ? (
          renderFavoriteList()
        ) : isLoading ? (
          <GifLoading />
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
