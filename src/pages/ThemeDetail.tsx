import times from "lodash/times";
import { AnimatePresence } from "framer-motion";
import React, {
  useCallback,
  useState,
  useEffect,
  useContext,
  useMemo,
} from "react";
import { useFetchProductList } from "../hooks/useFetchProductList";
import Carousel from "../components/shared/Carousel";
import OpacityMotionWrapper from "../components/Animation/OpacityMotionWrapper";
import ProductCard, {
  ProductCardSkeleton,
} from "../components/Product/ProductCard";
import SmallButton from "../components/shared/SmallButton";
import {
  PaginatedResponse,
  fetchCategoryById,
  getFavorites,
  getProductList,
} from "../services";
import { determineSortDirections, selectSortMenu } from "../utils";
import { PAGE_LIMIT, PRODUCT_PREFIX, ProductDetails } from "../constants";
import { FavoriteContext } from "../context/FavoriteContext";
import { Col, Flex, Image, Row, Typography } from "antd";
import { useParams } from "react-router-dom";
import { themes } from "../assets/images";
import EmptyLego from "../components/shared/EmptyLego";

const DEFAULT_QUANTITY_PRODUCT_SKELETON = 12; // Number of products skeletons in the loading screen

const ThemeDetail = (): React.ReactElement => {
  const { id = "" } = useParams();
  const [favorites, setFavorites] = useState<ProductDetails[]>([]);

  const { favoriteState } = useContext(FavoriteContext);

  const { data } = fetchCategoryById({ categoryId: id });

  const { renderSelectSortMenu, selectedSort, selectedFilter } =
    selectSortMenu();

  const filterList = useMemo(() => ({ ...selectedFilter, categoryId: id }), []);
  const { products, isLoading, cursor, totalRecords, fetchList } =
    useFetchProductList({
      selectedSort,
      selectedFilter: filterList,
      queryFn: getProductList,
      limit: PAGE_LIMIT,
    });

  const handleLoadMore = useCallback(() => {
    const sortOptions = determineSortDirections(selectedSort);
    const filterOptions = selectedFilter ? filterList : {};

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

  const checkIsFavorite = (id: string) => {
    return favorites.findIndex((product) => product.id === id) !== -1;
  };

  const renderProductList = useCallback(
    () => (
      <Row gutter={[32, 32]} align={"middle"} justify={"center"}>
        {products.map((product: ProductDetails) => (
          <OpacityMotionWrapper key={product.id}>
            <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={4}>
              <ProductCard
                product={product}
                key={PRODUCT_PREFIX + product.id}
                isFavorite={checkIsFavorite(product.id)}
              />
            </Col>
          </OpacityMotionWrapper>
        ))}
      </Row>
    ),
    [products]
  );

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
  }, [favoriteState.favoriteList, products]);

  return (
    <div className="p-5">
      <Flex justify="center" align="center">
        <Image preview={false} src={themes?.[(data?.name as string) ?? ""]} />
      </Flex>

      {/* Sort Option List */}
      <div className="my-14 w-full md:mx-14 xl:mx-32">
        <Typography.Title level={2}>{`${data?.name}'s sets`}</Typography.Title>
      </div>

      {/* Product List */}
      {products.length ? (
        <div>
          {renderSelectSortMenu()}
          <Row gutter={[16, 16]} align={"middle"}>
            <AnimatePresence>
              {isLoading ? renderSkeletonList() : renderProductList()}
            </AnimatePresence>
          </Row>
        </div>
      ) : (
        <EmptyLego />
      )}

      {renderLoadMoreButton()}
    </div>
  );
};

export default ThemeDetail;
