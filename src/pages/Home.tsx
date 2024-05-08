import React, { useMemo } from "react";
import { useNavigatePage } from "../hooks";
import SmallButton from "../components/shared/SmallButton";
import LeftAppearWrapper from "../components/Animation/LeftAppearWrapper";
import OpacityMotionWrapper from "../components/Animation/OpacityMotionWrapper";
import RightAppearWrapper from "../components/Animation/RightAppearWrapper";
import { FourStarIcon, MoneyIcon, ShirtIcon, TruckIcon } from "../assets/icons";
import {
  Artist,
  Batman,
  BlackNinja,
  Cars,
  IronMan,
  Rapper,
  Shipping,
  StormTrooper,
  sixFirstThemes,
} from "../assets/images";
import { Button, Card, Col, Row, Typography } from "antd";
import { useFetchProductList } from "../hooks/useFetchProductList";
import { getProductList } from "../services";
import ProductCard from "../components/Product/ProductCard";

const { Meta } = Card;
const PAGE_LIMIT = 6;

const Home = (): React.ReactElement => {
  const { redirect } = useNavigatePage();

  const selectedSort = useMemo(
    () => ({
      sortBy: "discountPercentage",
      sortDirection: "DESC",
    }),
    []
  );

  const { products, isLoading } = useFetchProductList({
    queryFn: getProductList,
    limit: PAGE_LIMIT,
    selectedSort: selectedSort,
  });

  return (
    <div className="max-w-screen">
      {/* Header  */}
      <div
        className={`z-50 my-2 flex w-full flex-col items-center justify-around bg-stone-800 p-10 md:h-[31.25rem] md:flex-row md:p-0`}
      >
        <LeftAppearWrapper className="flex h-[90%] w-[90%] flex-col justify-center gap-5 md:w-1/3">
          <p className="text-3xl font-bold text-white lg:text-6xl">
            Choose Our Top{" "}
            <p className="animate-typing overflow-hidden whitespace-nowrap ">
              Products
            </p>
          </p>
          <p className="md:text-md w-[90%] text-sm font-semibold text-gray-400">
            We stands for the best core values growing with your children. We
            have an impressive selection of products that you'll love.
          </p>
          <Button
            className={`w-32`}
            style={{ background: "white" }}
            onClick={() => redirect("/products")}
          >
            Shop now
          </Button>
          <div className="mt-2 flex gap-10 md:mt-10 lg:gap-24">
            <div>
              <p className="text-xl font-bold text-white lg:text-3xl">3110</p>
              <p className="md:text-md text-sm font-semibold text-gray-400">
                Total Products
              </p>
            </div>
            <div>
              <p className="text-xl font-bold text-white lg:text-3xl">
                250902+
              </p>
              <p className="md:text-md text-sm font-semibold text-gray-400">
                Happy Customers
              </p>
            </div>
          </div>
        </LeftAppearWrapper>

        <div className="relative hidden aspect-square md:block md:w-1/3 md:max-w-[28.125rem]">
          <div className="absolute aspect-square w-3/4 rounded-full bg-yellow-300" />
          <OpacityMotionWrapper>
            <img
              src={Batman}
              alt="men-shirt"
              className="absolute bottom-20 left-0 z-20 w-64"
            />
            <img
              src={FourStarIcon}
              alt="star-4"
              className="absolute left-5 w-8 invert md:top-7 lg:top-16 lg:w-10"
            />

            <img
              src={FourStarIcon}
              alt="star-4"
              className="absolute bottom-7 right-16 w-8 invert lg:bottom-10 lg:right-48 lg:w-10 "
            />
          </OpacityMotionWrapper>
        </div>
      </div>

      {/* Core Value */}
      <div className="flex w-full flex-col items-center justify-center py-6 md:flex-row md:justify-around lg:py-16">
        <OpacityMotionWrapper className="relative flex w-3/4 p-7 md:h-[12.5rem] md:w-1/3 md:p-8 lg:w-1/4">
          <img src={Shipping} alt="truck" className="w-30" />
          <div>
            <p className="text-lg font-semibold">Free Worldwide Shipping </p>
            <p className=" text-sm text-gray-400">
              Free shipping to all over the world with many specials only for
              our dear customers
            </p>
          </div>
        </OpacityMotionWrapper>

        <OpacityMotionWrapper className="relative flex w-3/4 p-7 md:h-[12.5rem] md:w-1/3 md:p-8 lg:w-1/4">
          <img src={Artist} alt="shirt" className="w-30" />
          <div>
            <p className="text-lg font-semibold">Best Quality Products </p>
            <p className=" text-sm text-gray-400">
              Many customers entrust various products needs to us, and customer
              satisfaction is our pride
            </p>
          </div>
        </OpacityMotionWrapper>

        <OpacityMotionWrapper className="relative flex w-3/4 p-7 md:h-[12.5rem] md:w-1/3 md:p-8 lg:w-1/4">
          <img src={Rapper} alt="money" className="w-30" />
          <div>
            <p className="text-lg font-semibold">Super Affordable Price </p>
            <p className=" text-sm text-gray-400">
              You can get various products with the highest quality at an
              affordable price
            </p>
          </div>
        </OpacityMotionWrapper>
      </div>

      {/* Main Categories */}
      <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 md:grid-rows-2">
        <div className="flex justify-end">
          <OpacityMotionWrapper className="flex h-40 w-3/4 items-center justify-center justify-items-center rounded-lg bg-yellow-100">
            <div className="ml-5">
              <p className="text-xl text-gray-400">#Ninjago</p>
              <p className="font-bold lg:text-xl">
                Discover Ninjutsu World with us
              </p>
            </div>
            <img
              src={BlackNinja}
              alt="ring"
              className="mr-1 max-h-[90%] w-1/3 object-contain"
            />
          </OpacityMotionWrapper>
        </div>

        <div className="flex h-40 justify-start md:row-span-2 md:h-auto">
          <OpacityMotionWrapper className="relative flex w-3/4 items-center justify-items-center rounded-lg bg-red-300 md:items-start">
            <div className="ml-5 md:ml-10 md:mt-10">
              <p className="text-xl text-white">#Super Heroes</p>
              <p className="font-bold lg:text-xl">Battles in Marvel Universe</p>
            </div>
            <img
              src={IronMan}
              alt="ring"
              className="bottom-10 right-10 mr-1 max-h-[80%] w-2/5 object-contain md:absolute"
            />
          </OpacityMotionWrapper>
        </div>

        <div className=" flex justify-end">
          <OpacityMotionWrapper className="flex h-40 w-3/4 items-center justify-center justify-items-center rounded-lg bg-yellow-100">
            <div className="ml-5">
              <p className="text-xl text-gray-400">#StarWars</p>
              <p className="font-bold lg:text-xl">
                Cosmic wars blowing up your mind
              </p>
            </div>
            <img
              src={StormTrooper}
              alt="ring"
              className="mr-1sss max-h-[90%] w-1/4 object-contain"
            />
          </OpacityMotionWrapper>
        </div>
      </div>

      {/* Store Description */}
      <div className="my-10 flex w-full flex-col items-center justify-center gap-10 md:h-80 md:flex-row md:gap-32">
        <OpacityMotionWrapper loop={true} className="relative">
          <span className="absolute -bottom-0 -left-5 aspect-square w-[12rem] rounded-full bg-yellow-200" />
          <img src={Cars} alt="" className="relative z-10 w-[17rem]" />
        </OpacityMotionWrapper>
        <RightAppearWrapper loop={true} className="w-4/5 md:w-1/3">
          <p className="my-3 text-xl font-medium md:text-lg lg:text-xl">
            Experienced in making your playtime&nbsp;
            <p
              className="animate-text my-3 animate-typing overflow-hidden whitespace-nowrap bg-gradient-to-r from-red-500 via-orange-300 to-yellow-500 bg-clip-text text-xl 
            font-bold text-transparent md:text-xl lg:text-3xl"
            >
              Chilling and Comfortable
            </p>
          </p>
          <p className="text-xs text-gray-400 md:text-sm">
            We have brought happiness and joy to thousand of children and Lego
            lovers not only in Vietnam but also around the world
          </p>
        </RightAppearWrapper>
      </div>

      {/* Quote */}
      <div className="mb-20 flex flex-col items-center justify-center">
        <div className="flex w-4/5 flex-col items-center justify-center gap-3 rounded-md bg-yellow-100 p-5 md:p-10">
          <p className="relative top-2 text-4xl">"</p>
          <p className="text-md w-3/4 text-center text-red-400 md:text-xl">
            I want to bring the best place to buy any products with super
            fantastic quality to the table. With super many benefits, you must
            try it.
          </p>
          <p className="mt-2 text-lg font-bold">Vo Minh Nhut - Founder</p>
        </div>
      </div>

      {/* Top theme */}
      <div className="mb-10 flex flex-col items-center justify-center">
        <div className="w-4/5">
          <Typography.Title level={2}>Top LEGO® Themes</Typography.Title>
          <Row align={"middle"} justify={"center"} gutter={[16, 16]}>
            {sixFirstThemes.map((theme, index) => (
              <Col sm={24} md={12} lg={8} key={index}>
                <Card cover={<img src={theme.img} alt={theme.name} />}>
                  <Meta title={theme.name} />
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      <div className="mb-10 flex flex-col items-center justify-center">
        <div className="w-4/5">
          <Typography.Title level={2}>Top Deals from Legood®</Typography.Title>
          <Row align={"middle"} justify={"center"} gutter={[16, 16]}>
            {products.map((item, index) => (
              <Col sm={24} md={12} lg={8} key={index}>
                <ProductCard
                  product={item}
                  isFavorite={false}
                  hideFavorite
                  hideHoverAnimation
                />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Home;
