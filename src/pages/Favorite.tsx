import { Link } from "react-router-dom";
import React, { useCallback, useContext, useEffect } from "react";
import { useFetchProductList } from "../hooks/useFetchProductList";
import ProductCard, {
  ProductCardSkeleton,
} from "../components/Product/ProductCard";
import OpacityMotionWrapper from "../components/Animation/OpacityMotionWrapper";
import { FavoriteContext } from "../context/FavoriteContext";
import { determineSortDirections, selectSortMenu } from "../utils";
import { FAVORITE_PREFIX, ProductDetails } from "../constants";
import { getFavorites } from "../services/products.api";
import GifLoading from "../components/shared/GifLoading";
import SearchBar from "../components/shared/SearchBar";
import EmptyLego from "../components/shared/EmptyLego";
import { Col, Row, Typography } from "antd";
import { times } from "lodash";
import { AnimatePresence } from "framer-motion";

const DEFAULT_QUANTITY_PRODUCT_SKELETON = 12; // Number of products skeletons in the loading screen

const Favorite = (): React.ReactElement => {
  const { favoriteState, importFavorite } = useContext(FavoriteContext);

  const isNotEmpty = !!favoriteState.favoriteList.length;

  const { renderSelectSortMenu, selectedSort, selectedFilter } =
    selectSortMenu();

  const { isLoading, products } = useFetchProductList({
    selectedSort,
    selectedFilter,
    queryFn: getFavorites,
  });

  const renderFavoriteList = () => {
    return (
      <div>
        <Row gutter={[32, 32]} align={"middle"} justify={"center"}>
          {favoriteState.favoriteList.map((product: ProductDetails) => (
            <OpacityMotionWrapper key={product.id}>
              <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={4}>
                <ProductCard
                  product={product}
                  isFavorite={true}
                  key={FAVORITE_PREFIX + product.id}
                />
              </Col>
            </OpacityMotionWrapper>
          ))}
        </Row>
      </div>
    );
  };

  const renderSkeletonList = useCallback(
    () => (
      <Row gutter={[32, 32]} align={"middle"} justify={"center"}>
        {times(DEFAULT_QUANTITY_PRODUCT_SKELETON, (index) => (
          <OpacityMotionWrapper key={index}>
            <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={4}>
              <ProductCardSkeleton />
            </Col>
          </OpacityMotionWrapper>
        ))}
      </Row>
    ),
    []
  );

  useEffect(() => {
    importFavorite(products);
  }, [products]);

  return (
    <div className="mx-auto my-5 w-4/5">
      {isLoading && <GifLoading />}
      {/* Favorite List  */}
      <p className="text-xl font-bold">My favorites</p>
      <hr className="my-2 h-px border-0 bg-gray-200" />
      <div className="min-h-[15rem] w-full">
        {isNotEmpty ? (
          <div className="px-10">
            {renderSelectSortMenu()}
            <AnimatePresence>
              {isLoading ? renderSkeletonList() : renderFavoriteList()}
            </AnimatePresence>
          </div>
        ) : (
          <div className="my-32 flex w-full flex-col items-center justify-center">
            <EmptyLego />
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorite;
