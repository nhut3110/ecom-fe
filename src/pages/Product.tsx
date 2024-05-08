import times from "lodash/times";
import { AnimatePresence } from "framer-motion";
import React, { useCallback, useState, useEffect, useContext } from "react";
import { useFetchProductList } from "../hooks/useFetchProductList";
import Carousel from "../components/shared/Carousel";
import OpacityMotionWrapper from "../components/Animation/OpacityMotionWrapper";
import ProductCard, {
  ProductCardSkeleton,
} from "../components/Product/ProductCard";
import SmallButton from "../components/shared/SmallButton";
import { PaginatedResponse, getFavorites, getProductList } from "../services";
import { determineSortDirections, selectSortMenu } from "../utils";
import { PAGE_LIMIT, PRODUCT_PREFIX, ProductDetails } from "../constants";
import { FavoriteContext } from "../context/FavoriteContext";
import { Col, Row, Typography } from "antd";

const DEFAULT_QUANTITY_PRODUCT_SKELETON = 12; // Number of products skeletons in the loading screen

const Product = (): React.ReactElement => {
  const [favorites, setFavorites] = useState<ProductDetails[]>([]);

  const { favoriteState } = useContext(FavoriteContext);

  const { renderSelectSortMenu, selectedSort, selectedFilter } =
    selectSortMenu();
  const { products, isLoading, cursor, totalRecords, fetchList } =
    useFetchProductList({
      selectedSort,
      selectedFilter,
      queryFn: getProductList,
      limit: PAGE_LIMIT,
    });

  const handleLoadMore = useCallback(() => {
    const sortOptions = determineSortDirections(selectedSort);
    const filterOptions = selectedFilter ? selectedFilter : {};

    fetchList(sortOptions, filterOptions, cursor);
  }, [selectedSort, selectedFilter, cursor]);

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

  const fetchFavorites = async () => {
    const favoriteList: PaginatedResponse = await getFavorites({});

    setFavorites(favoriteList.data);
  };

  const renderLoadMoreButton = useCallback(() => {
    if (products.length < totalRecords)
      return (
        <div className="my-5 flex w-full items-center justify-center">
          <SmallButton content="Load more" onClick={handleLoadMore} />
        </div>
      );
  }, [totalRecords, products.length]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div className="p-5">
      <Carousel />

      {/* Sort Option List */}
      {renderSelectSortMenu()}
      <div className="mt-10 w-full md:mx-14 xl:mx-32">
        <Typography.Title level={2}> All products</Typography.Title>
      </div>
      <hr className="my-5 h-px border-0 bg-gray-200" />

      {/* Product List */}
      <Row gutter={[16, 16]} align={"middle"}>
        <AnimatePresence>
          {isLoading ? (
            renderSkeletonList()
          ) : (
            <Row gutter={[32, 32]} align={"middle"} justify={"center"}>
              {products.map((product: ProductDetails) => (
                <OpacityMotionWrapper key={product.id}>
                  <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={4}>
                    <ProductCard
                      product={product}
                      key={PRODUCT_PREFIX + product.id}
                      isFavorite={
                        favorites.findIndex(
                          (favorite) => product.id === favorite.id
                        ) !== -1
                      }
                    />
                  </Col>
                </OpacityMotionWrapper>
              ))}
            </Row>
          )}
        </AnimatePresence>
      </Row>

      {renderLoadMoreButton()}
    </div>
  );
};

export default Product;
