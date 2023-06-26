import { Link } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import { useFetchProductList } from "../hooks/useFetchProductList";
import ProductCard from "../components/ProductCard";
import OpacityMotionWrapper from "../components/Animation/OpacityMotionWrapper";
import { FavoriteContext } from "../context/FavoriteContext";
import { determineSortDirections, selectSortMenu } from "../utils";
import { FAVORITE_PREFIX, ProductDetails } from "../constants";
import { getFavorites } from "../services/products.api";
import GifLoading from "../components/GifLoading";
import SearchBar from "../components/SearchBar";

const Favorite = (): React.ReactElement => {
  const { favoriteState, importFavorite } = useContext(FavoriteContext);

  const isNotEmpty = !!favoriteState.favoriteList.length;

  const { renderSelectSortMenu, selectedSort, selectedFilter } =
    selectSortMenu();

  const { isLoading, fetchList, products } = useFetchProductList({
    selectedSort,
    selectedFilter,
    queryFn: getFavorites,
  });

  const handleLoadMore = () => {
    const sortOptions = determineSortDirections(selectedSort);
    const filterOptions = selectedFilter ? { categoryId: selectedFilter } : {};

    fetchList(sortOptions, filterOptions);
  };

  const renderFavoriteList = () => {
    return (
      <div>
        <div className="mt-10 grid w-auto grid-cols-1 justify-items-center gap-x-5 gap-y-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-fluid">
          {favoriteState.favoriteList.map((product: ProductDetails) => (
            <OpacityMotionWrapper key={product.id}>
              <ProductCard
                product={product}
                isFavorite={true}
                key={FAVORITE_PREFIX + product.id}
              />
            </OpacityMotionWrapper>
          ))}
        </div>
      </div>
    );
  };

  useEffect(() => {
    importFavorite(products);
  }, [products]);

  return (
    <div>
      {/* Sort Option and Search List */}
      <div className="mx-10 flex flex-col md:flex-row md:justify-between">
        <div className="my-5 lg:w-1/2">
          <SearchBar queryFn={getFavorites} />
        </div>
        <div className="grid grid-cols-2 justify-end gap-5 md:flex">
          {renderSelectSortMenu()}
        </div>
      </div>
      {isLoading && <GifLoading />}
      {/* Favorite List  */}
      <div className="min-h-[15rem] w-full">
        {isNotEmpty ? (
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
