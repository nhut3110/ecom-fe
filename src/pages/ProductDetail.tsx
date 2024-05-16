import { useParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import dayjs from "dayjs";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import OpacityMotionWrapper from "../components/Animation/OpacityMotionWrapper";
import SlideDownDisappearWrapper from "../components/Animation/SlideDownDisappearWrapper";
import DotsLoading from "../components/Animation/DotsLoading";
import QuantityButton from "../components/shared/QuantityButton";
import RatingStar from "../components/shared/RatingStar";
import { FlyingImageWrapper } from "../components/shared/FlyingImage";
import GifLoading from "../components/shared/GifLoading";
import {
  fetchProductDetails,
  addToCart,
  getCategoryById,
  removeFavorite,
  addFavorite,
  checkFavorite,
  getProductList,
  fetchDiscussionList,
} from "../services";
import {
  BlockIcon,
  DimensionIcon,
  GoodsIcon,
  InstructionIcon,
  MinifigIcon,
  TruckIcon,
} from "../assets/icons";
import { NotificationContext } from "../context/NotificationContext";
import { CartContext } from "../context/CartContext";
import { ADD_PRODUCT_DELAY, MAX_FAVORITES } from "../constants";
import {
  Breadcrumb,
  Button,
  Card,
  Carousel,
  Checkbox,
  Col,
  Collapse,
  Descriptions,
  Flex,
  Image,
  Modal,
  Row,
  Skeleton,
  Tabs,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import { times } from "lodash";
import { CarouselRef } from "antd/es/carousel";
import {
  HomeOutlined,
  LeftOutlined,
  QuestionCircleOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { UnknownMinifig, UnknownPiece, themes } from "../assets/images";
import { FavoriteContext } from "../context/FavoriteContext";
import Heart from "react-animated-heart";
import {
  BuildingInstruction,
  LegoPart,
  Minifig,
  getBuildingInstructionBySetNumber,
  getLegoSetData,
  getLegoSetParts,
  getLocalStorageValue,
  getMinifigs,
} from "../utils";
import HtmlContent from "../components/shared/HtmlContent";
import { useFetchProductList } from "../hooks/useFetchProductList";
import ProductCard from "../components/Product/ProductCard";
import { UserDataContext } from "../context/UserDataContext";
import DiscussionThread from "../components/Product/Discussion";
import FanMoment from "../components/Product/FanMoment";
import { fetchCommentList } from "../services/comment.api";
import { formatVNDPrice } from "../utils/formatVNDPrice";
import { useValidateLoginExpiration } from "../hooks";

const DEFAULT_QUANTITY_CHANGE = 1; // Only increase or decrease 1 when click

const ProductDetail = (): React.ReactElement => {
  const { productId = "" } = useParams();
  const { data, isLoading } = fetchProductDetails({ productId });

  const { notify } = useContext(NotificationContext);
  const { addToCart: addToCartContext, calculateCartValue } =
    useContext(CartContext);
  const {
    addFavorite: addToContext,
    removeFavorite: removeFromContext,
    favoriteState,
  } = useContext(FavoriteContext);
  const { userDataState } = useContext(UserDataContext);
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<number>(0);
  const [categoryName, setCategoryName] = useState<string>("");
  const [buildingInstructionList, setBuildingInstructionList] = useState<
    BuildingInstruction[]
  >([]);
  const [minifigList, setMinifigList] = useState<Minifig[]>([]);
  const [partList, setPartList] = useState<LegoPart[]>([]);
  const [legoFeatureData, setLegoFeatureDate] = useState<any>();
  const [love, setLove] = useState(false);

  const isLogin = useMemo(
    () => !!Object.keys(getLocalStorageValue({ key: "tokens" })).length,
    []
  );

  let sliderRef = useRef<CarouselRef>();

  const selectedFilter = useMemo(
    () => ({
      categoryId: data?.categoryId,
      exceptedProducts: JSON.stringify([data?.id?.toString()]),
    }),
    [data]
  );

  const { products } = useFetchProductList({
    selectedFilter,
    queryFn: getProductList,
    limit: 6,
  });

  const { discussions, refetchDiscussionList } = fetchDiscussionList({
    productId: productId,
  });

  const { comments, refetchCommentList } = fetchCommentList({
    productId: productId,
  });

  const handleIncrement = () => {
    setQuantity((quantity) => quantity + DEFAULT_QUANTITY_CHANGE);
  };

  const handleDecrement = () => {
    setQuantity((preQuantity) => {
      if (preQuantity <= 1) return 1;

      return --preQuantity;
    });
  };

  const imageList = useMemo(() => {
    return data
      ? times(
          data?.additionalImageCount + 1,
          (index) =>
            `https://avyqdkbazq.cloudimg.io/v7/_brickfact-images/set-images/${
              data.numberId.split("-")[0]
            }_${
              index + 1
            }.jpg?w=800&h=800&func=fit&func=fit&optipress=3&force_format=webp`
        )
      : [];
  }, [data]);

  const handleAddToCart = async () => {
    try {
      await addToCart({ quantity: quantity, productId: data.id });

      addToCartContext(quantity, data, crypto.randomUUID());
      calculateCartValue(quantity, data);

      setLoading(true);
      notify({
        content: `Successfully add ${data.title} to cart`,
        type: "success",
        open: true,
        id: crypto.randomUUID(),
      });
    } catch (error) {
      notify({
        id: crypto.randomUUID(),
        content: "Add to cart failed",
        open: true,
        type: "error",
      });
    }

    setTimeout(() => {
      setLoading(false);
    }, ADD_PRODUCT_DELAY);
  };

  const handlePrev = () => {
    sliderRef?.current?.prev();
    setCurrentImage((prev) => prev - 1);
  };

  const handleNext = () => {
    sliderRef?.current?.next();
    setCurrentImage((prev) => prev + 1);
  };

  const notifyFavoriteAction = () => {
    notify({
      content: `Successfully ${love ? "remove from" : "added to"} favorites`,
      type: "favorite",
      open: true,
      id: crypto.randomUUID(),
    });

    setLove(!love);
    setLoading(false);
  };

  const handleRemoveFavorite = async () => {
    await removeFavorite(productId);
    removeFromContext(data);
    notifyFavoriteAction();
  };

  const handleAddFavorite = async () => {
    await addFavorite(productId);
    addToContext(data);
    notifyFavoriteAction();
  };

  const handleFavorites = useCallback(async () => {
    if (!love && favoriteState.favoriteList.length >= MAX_FAVORITES)
      return notify({
        content: `Reached maximum favorites`,
        type: "warning",
        open: true,
        id: crypto.randomUUID(),
      });

    setLoading(true);

    if (love) return handleRemoveFavorite();

    return handleAddFavorite();
  }, [love]);

  const fetchCategory = useCallback(async (id: string) => {
    const category = await getCategoryById(id);
    setCategoryName(category.name);
  }, []);

  const checkInitFavorite = useCallback(async () => {
    const isFavorite = await checkFavorite(productId);
    setLove(isFavorite);
  }, []);

  useEffect(() => {
    if (!isLoading && !!data?.categoryId) {
      fetchCategory(data.categoryId);
      getBuildingInstructionBySetNumber(data?.numberId.split("-")[0]).then(
        (buildingList) => setBuildingInstructionList(buildingList)
      );
      getLegoSetData(data?.numberId.split("-")[0].toString()).then(
        (productDetails) => {
          setLegoFeatureDate(productDetails?.data?.product);
        }
      );
      getMinifigs(data?.numberId).then((minifigs) => setMinifigList(minifigs));
      getLegoSetParts(data?.numberId).then((parts) => setPartList(parts));
    }
  }, [isLoading, data]);

  useEffect(() => {
    checkInitFavorite();
  }, []);

  return (
    <>
      {loading && <GifLoading />}
      {isLoading ? (
        <AnimatePresence>
          <SlideDownDisappearWrapper>
            <div className="flex h-screen w-full items-center justify-center">
              <DotsLoading />
            </div>
          </SlideDownDisappearWrapper>
        </AnimatePresence>
      ) : (
        <OpacityMotionWrapper>
          <Breadcrumb
            className="ml-10 mt-5 hidden md:block"
            items={[
              {
                title: (
                  <a href="/">
                    <HomeOutlined />
                  </a>
                ),
              },
              {
                title: (
                  <a href="/products" className="xs:text-sm md:text-base">
                    Products
                  </a>
                ),
              },
              {
                title: (
                  <Typography.Text
                    ellipsis
                    className="xs:text-xs text-sm md:text-sm"
                  >
                    {data?.title}
                  </Typography.Text>
                ),
              },
            ]}
          />
          <div className="my-10 flex w-full flex-col items-center justify-center gap-5 lg:flex-row">
            <div className="flex w-full flex-col items-center justify-center p-5 sm:mx-auto lg:ml-10 lg:w-2/3">
              <div
                className="relative mx-5 flex w-full lg:gap-5"
                id={`product-detail-${data.id}`}
              >
                <div className="hidden max-h-[25rem] w-1/5 overflow-x-hidden overflow-y-scroll lg:block">
                  {imageList.map((image, index) => (
                    <Image
                      key={index}
                      src={image}
                      preview={false}
                      style={{
                        cursor: "pointer",
                        border:
                          currentImage === index ? "2px solid red" : "none",
                      }}
                      onClick={() => {
                        setCurrentImage(index);
                        sliderRef?.current?.goTo(index);
                      }}
                      placeholder={
                        <Skeleton.Image active className="h-full w-full" />
                      }
                    />
                  ))}
                </div>
                <div className="relative flex h-[25rem] w-full items-center justify-center lg:w-4/5">
                  <Image.PreviewGroup>
                    <Tag
                      className="absolute left-5 top-0 px-5 py-1 text-base"
                      color="#141414"
                    >{`${currentImage + 1}/${imageList.length}`}</Tag>
                    {!!imageList.length && !isLoading && (
                      <Carousel
                        infinite={false}
                        ref={sliderRef as any}
                        style={{
                          width: "100%",
                          maxWidth: "400px",
                          minWidth: "300px",
                        }}
                        dots={false}
                        className="px-5"
                      >
                        {imageList.map((image, index) => (
                          <div
                            className="relative flex h-full items-center justify-center"
                            key={index}
                          >
                            <Image
                              src={image}
                              preview={{ src: image }}
                              alt="product-image"
                              className="z-10 h-auto max-h-full object-cover"
                              placeholder={
                                <Skeleton.Image
                                  active
                                  className="h-full w-full"
                                />
                              }
                            />
                          </div>
                        ))}
                      </Carousel>
                    )}
                  </Image.PreviewGroup>

                  <div className="absolute left-0 top-0 flex h-full items-center">
                    <Button
                      icon={<LeftOutlined />}
                      onClick={handlePrev}
                      disabled={currentImage === 0}
                      shape="circle"
                    />
                  </div>
                  <div className="absolute right-0 top-0 flex h-full items-center">
                    <Button
                      icon={<RightOutlined />}
                      onClick={handleNext}
                      disabled={currentImage === imageList.length - 1}
                      shape="circle"
                    />
                  </div>
                </div>

                <FlyingImageWrapper product={data} />
              </div>
              <div className="mt-10 w-full">
                <Row gutter={[32, 32]}>
                  <Col xs={12} sm={12} md={6}>
                    <Flex justify="center" align="center" vertical gap={10}>
                      <div style={{ color: "rgb(117, 117, 117)" }}>
                        <InstructionIcon />
                      </div>
                      <Typography.Title level={2}>
                        {data?.instructionsCount ?? "N/A"}
                      </Typography.Title>
                      <p className="font-semibold">Instructions</p>
                    </Flex>
                  </Col>
                  <Col xs={12} sm={12} md={6}>
                    <Flex justify="center" align="center" vertical gap={10}>
                      <div style={{ color: "rgb(117, 117, 117)" }}>
                        <BlockIcon />
                      </div>
                      <Typography.Title level={2}>
                        {data?.pieces ?? "N/A"}
                      </Typography.Title>
                      <p className="font-semibold">Pieces</p>
                    </Flex>
                  </Col>
                  <Col xs={12} sm={12} md={6}>
                    <Flex justify="center" align="center" vertical gap={10}>
                      <div style={{ color: "rgb(117, 117, 117)" }}>
                        <MinifigIcon />
                      </div>
                      <Typography.Title level={2}>
                        {data?.minifigs ?? "N/A"}
                      </Typography.Title>
                      <p className="font-semibold">Minifigures</p>
                    </Flex>
                  </Col>
                  <Col xs={12} sm={12} md={6}>
                    <Flex justify="center" align="center" vertical gap={10}>
                      <div style={{ color: "rgb(117, 117, 117)" }}>
                        <DimensionIcon />
                      </div>
                      <Flex justify="center" align="center" vertical>
                        {!!data?.height && (
                          <Typography.Text type="secondary">
                            {`H: ${data?.height}cm`}
                          </Typography.Text>
                        )}
                        {!!data?.width && (
                          <Typography.Text type="secondary">
                            {`W: ${data?.width}cm`}
                          </Typography.Text>
                        )}
                        {!!data?.depth && (
                          <Typography.Text type="secondary">
                            {`D: ${data?.depth}cm`}
                          </Typography.Text>
                        )}
                        {!!data?.weight && (
                          <Typography.Text type="secondary">
                            {`Weight: ${data?.weight}kg`}
                          </Typography.Text>
                        )}
                      </Flex>
                      <p className="font-semibold">Dimensions</p>
                    </Flex>
                  </Col>
                </Row>
              </div>
            </div>

            <div className="flex w-full max-w-[90%] flex-col items-start md:ml-0 lg:mx-5 lg:w-1/3 lg:gap-2">
              <Row
                gutter={[16, 16]}
                className="w-full"
                align={"middle"}
                justify={"space-between"}
              >
                <Col sm={12} md={12} lg={24} xl={12}>
                  <Flex gap={8}>
                    {!!data?.packagingType && (
                      <Tag
                        color="green"
                        className="px-4 text-sm font-semibold xl:text-base"
                      >
                        {data?.packagingType}
                      </Tag>
                    )}
                    {!!data?.availability && (
                      <Tag
                        color="green"
                        className="px-4 text-sm font-semibold xl:text-base"
                      >
                        {data?.availability}
                      </Tag>
                    )}
                  </Flex>
                </Col>
                <Col sm={12} md={12} lg={24} xl={12}>
                  <div className="flex items-center justify-end gap-1 px-1 lg:justify-start xl:justify-end">
                    <RatingStar rating={data.rate} disabled />
                    <p className="text-sm text-gray-500">({data.rate})</p>
                  </div>
                </Col>
                <Col span={16}>
                  <p className="text-base font-bold md:w-3/4 md:text-2xl lg:text-lg xl:text-xl">
                    {data.title}
                  </p>
                </Col>
                <Col span={8}>
                  <Image preview={false} src={themes?.[categoryName]} />
                </Col>
              </Row>

              <div className="w-full lg:w-3/4">
                <Flex vertical gap={10}>
                  <Flex gap={10} align="baseline">
                    <p className="text-3xl font-semibold">
                      {formatVNDPrice(
                        (data?.discountPercentage
                          ? data?.price -
                            (data?.discountPercentage * data?.price) / 100
                          : data?.price
                        ).toFixed(2)
                      )}
                      <span className="text-base font-medium">đ</span>
                    </p>
                    {!!data?.discountPercentage && (
                      <Typography.Text delete>
                        {formatVNDPrice(data?.price)}đ
                      </Typography.Text>
                    )}
                  </Flex>

                  <Flex align="center" justify="space-between">
                    <Tag color={data?.availableQuantity ? "success" : "error"}>
                      {data?.availableQuantity ? "Available now" : "Sold out"}
                    </Tag>
                    <Typography.Text type="secondary">
                      Stock: {data?.availableQuantity ?? 0}
                    </Typography.Text>
                  </Flex>
                </Flex>

                <hr className="my-2 h-px border-0 bg-gray-200 md:my-5" />
              </div>
              <div className="mx-0">
                <Flex gap={10}>
                  <QuantityButton
                    quantity={quantity}
                    onIncrement={handleIncrement}
                    onDecrement={handleDecrement}
                    max={
                      data.availableQuantity < 5 ? data.availableQuantity : 5
                    }
                  />
                  <Tooltip title="User can buy maximum 5 products or lower if stock is not enough">
                    <QuestionCircleOutlined />
                  </Tooltip>
                </Flex>
              </div>

              <div className="relative my-2 flex w-full md:my-5">
                <div className="w-4/5">
                  <Button
                    className="w-[90%] bg-red-200"
                    block
                    onClick={handleAddToCart}
                    shape="round"
                    disabled={!isLogin}
                  >
                    Add to Cart
                  </Button>
                </div>

                <div className="absolute -top-9 right-0">
                  <Heart isClick={love} onClick={handleFavorites} />
                </div>
              </div>

              <div>
                <div className="flex items-start gap-2 rounded-t-lg border  border-gray-300 p-4">
                  <img src={TruckIcon} alt="truck" className="w-5" />
                  <div>
                    <p className="text-md font-bold">Free Delivery</p>
                    <p className="mt-1 w-full text-xs text-gray-500">
                      Just Enter your Postal code for Delivery Availability
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2 rounded-b-lg border  border-gray-300 p-4">
                  <img src={GoodsIcon} alt="truck" className="w-5" />
                  <div>
                    <p className="text-md font-bold">Return Delivery</p>
                    <p className="mt-1 w-full text-xs text-gray-500">
                      Free 30 days Delivery Returns
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-10 md:mx-20">
            <p className="text-2xl font-semibold md:text-3xl">
              About the Product
            </p>
            <hr className="my-3 h-px border-0 bg-gray-200" />
            <Collapse
              ghost
              expandIconPosition="end"
              // defaultActiveKey={"description"}
              items={[
                {
                  key: "description",
                  label: (
                    <Typography.Title level={3}>
                      Product description
                    </Typography.Title>
                  ),
                  children: (
                    <Row gutter={[16, 16]}>
                      <Col xs={24} sm={24} md={24} lg={18}>
                        <div className="sm:text-base lg:text-lg">
                          {legoFeatureData?.featuresText ? (
                            <HtmlContent html={legoFeatureData?.featuresText} />
                          ) : (
                            <Skeleton active paragraph={{ rows: 10 }} />
                          )}
                        </div>
                      </Col>
                      <Col xs={24} sm={24} md={24} lg={6}>
                        <Flex vertical gap={10}>
                          {legoFeatureData ? (
                            <Image
                              src={
                                legoFeatureData?.secondaryImage ??
                                legoFeatureData?.mediaViewerPrimaryImage
                              }
                              preview={false}
                              style={{ minWidth: "300px" }}
                            />
                          ) : (
                            <Skeleton.Image
                              active
                              style={{ minWidth: "300px" }}
                            />
                          )}
                        </Flex>
                      </Col>
                    </Row>
                  ),
                },
                {
                  key: "minifigs",
                  label: (
                    <Typography.Title level={3}>Minifigures</Typography.Title>
                  ),
                  children: (
                    <div>
                      <Flex vertical gap={10}>
                        <Typography.Title
                          level={4}
                        >{`This ${data?.title} set contains ${minifigList.length} minifigures:`}</Typography.Title>
                        <Row gutter={[16, 16]}>
                          {minifigList.map((minifig, index) => (
                            <Col sm={24} md={12} lg={8} xl={6} key={index}>
                              <Card
                                hoverable
                                style={{ width: "100%" }}
                                cover={
                                  <Image
                                    src={minifig?.set_img_url ?? UnknownMinifig}
                                    alt={minifig?.set_name}
                                    className="aspect-square object-contain"
                                    placeholder={
                                      <Skeleton.Image
                                        active
                                        style={{
                                          width: "100%",
                                          height: "100%",
                                        }}
                                      />
                                    }
                                  />
                                }
                                className="relative"
                              >
                                <Tag
                                  color="black"
                                  className="absolute right-3 top-3 px-3 text-base font-semibold"
                                >{`Quantity: ${minifig?.quantity}`}</Tag>
                                <Card.Meta
                                  title={
                                    <Typography.Title level={4}>
                                      {minifig?.set_name}
                                    </Typography.Title>
                                  }
                                  description={
                                    <Typography.Text type="secondary" copyable>
                                      {minifig?.set_num}
                                    </Typography.Text>
                                  }
                                />
                              </Card>
                            </Col>
                          ))}
                        </Row>
                      </Flex>
                    </div>
                  ),
                },
                {
                  key: "Pieces",
                  label: <Typography.Title level={3}>Pieces</Typography.Title>,
                  children: (
                    <Row gutter={[16, 16]}>
                      {partList?.map((part) => (
                        <Col xs={8} sm={6} md={4} xl={3} key={part?.id}>
                          <Card
                            hoverable
                            cover={
                              <Image
                                src={part?.part?.part_img_url ?? UnknownPiece}
                                alt={part?.part?.name}
                                placeholder={
                                  <Skeleton.Image
                                    active
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                    }}
                                  />
                                }
                              />
                            }
                          >
                            <Flex
                              className="w-full"
                              align="center"
                              justify="center"
                              onClick={() =>
                                Modal.info({
                                  title: part?.part?.name,
                                  closable: true,
                                  footer: null,
                                  content: (
                                    <Descriptions
                                      column={1}
                                      bordered
                                      items={[
                                        {
                                          key: "part_num",
                                          label: "Part Number",
                                          children: part?.part?.part_num,
                                        },
                                        {
                                          key: "part_num_lego",
                                          label: "Lego Number",
                                          children:
                                            part?.part?.external_ids
                                              ?.Lego?.[0] ?? "N/A",
                                        },
                                        {
                                          key: "color",
                                          label: "Color",
                                          children: (
                                            <Tag color={`#${part?.color?.rgb}`}>
                                              {part?.color?.name}
                                            </Tag>
                                          ),
                                        },
                                        {
                                          key: "transparent",
                                          label: "Transparent",
                                          children: (
                                            <Checkbox
                                              checked={part?.color?.is_trans}
                                              disabled
                                            />
                                          ),
                                        },
                                        {
                                          key: "quantity",
                                          label: "Quantity",
                                          children: part?.quantity,
                                        },
                                        {
                                          key: "spare",
                                          label: "Spare",
                                          children: (
                                            <Checkbox
                                              checked={part?.is_spare}
                                              disabled
                                            />
                                          ),
                                        },
                                        {
                                          key: "availability",
                                          label: "Availability",
                                          children: `${
                                            part?.num_sets ?? "N/A"
                                          } sets`,
                                        },
                                      ]}
                                    />
                                  ),
                                })
                              }
                            >
                              <Typography.Text
                                ellipsis
                                className="w-full text-center font-semibold"
                              >{`${part?.part?.part_num}`}</Typography.Text>
                            </Flex>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  ),
                },
                {
                  key: "Instructions",
                  label: (
                    <Typography.Title level={3}>Instructions</Typography.Title>
                  ),
                  children: (
                    <div>
                      <Row gutter={[16, 16]}>
                        {buildingInstructionList.map((instruction, index) => (
                          <Col xs={24} md={12} lg={8} xl={6} key={index}>
                            <a href={instruction?.file?.url}>
                              <Card
                                hoverable
                                cover={
                                  <Image
                                    src={instruction?.image?.url}
                                    alt={instruction?.description}
                                  />
                                }
                                className="relative w-full"
                              >
                                <Tag
                                  color="black"
                                  className="absolute right-3 top-3 px-3 text-base"
                                >{`${instruction?.sequence?.element}/${instruction?.sequence?.total}`}</Tag>
                                <Card.Meta
                                  title={
                                    <Typography.Title level={4}>
                                      {instruction?.description}
                                    </Typography.Title>
                                  }
                                  description={dayjs(
                                    instruction?.file?.modifiedDate
                                  ).format("DD/MM/YYYY")}
                                />
                              </Card>
                            </a>
                          </Col>
                        ))}
                      </Row>
                    </div>
                  ),
                },
              ]}
            />

            <hr className="my-3 h-px border-0 bg-gray-200" />
            <p className="text-2xl font-semibold md:text-3xl">
              Related Products
            </p>
            <div className="hide-scroll-bar flex overflow-x-scroll pb-10">
              <div className="flex flex-nowrap">
                {products?.map((product, index) => (
                  <div className="mx-10 mb-5 mt-10" key={index}>
                    <ProductCard
                      hideFavorite
                      product={product}
                      isFavorite={false}
                    />
                  </div>
                ))}
              </div>
            </div>

            <hr className="my-3 h-px border-0 bg-gray-200" />
            <Tabs
              centered
              items={[
                {
                  key: "discussions",
                  label: (
                    <Typography.Title level={4}>Discussions</Typography.Title>
                  ),
                  children: (
                    <DiscussionThread
                      discussions={discussions ?? []}
                      productId={productId}
                      refetch={refetchDiscussionList}
                    />
                  ),
                },
                {
                  key: "fan-moments",
                  label: (
                    <Typography.Title level={4}>Fan moments</Typography.Title>
                  ),
                  children: (
                    <FanMoment
                      productId={productId}
                      comments={comments ?? []}
                      refetch={refetchCommentList}
                    />
                  ),
                },
              ]}
            />
            <hr className="my-3 h-px border-0 bg-gray-200" />
          </div>
        </OpacityMotionWrapper>
      )}
    </>
  );
};

export default ProductDetail;
