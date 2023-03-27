import React, { ReactElement } from "react";
import SmallButton from "../components/SmallButton";
import Layout from "../layout/Layout";
import { FourStarIcon, MoneyIcon, ShirtIcon, TruckIcon } from "../assets/icons";
import {
  Headphone,
  MenShirt,
  Ring,
  SilverRings,
  Watch,
  WomenShirt,
  WomenSuit,
} from "../assets/images";

const Home = (): ReactElement => {
  return (
    <div className="h-screen ">
      <Layout>
        {/* Header  */}
        <div className="my-2 flex w-full flex-col items-center justify-around bg-gray-200 p-10 md:h-[500px] md:flex-row md:p-0">
          <div className="flex h-[90%] w-[90%] flex-col justify-center gap-5 md:w-1/3">
            <p className="text-3xl font-bold lg:text-6xl">
              Choose Our Top Picks Products
            </p>
            <p className="md:text-md w-[90%] text-sm font-semibold text-gray-400">
              We stands for beauty & style in your daily life. We have an
              impressive selection of products that you'll love.
            </p>
            <SmallButton name="Shop now" />
            <div className="mt-2 flex gap-10 md:mt-10 lg:gap-24">
              <div>
                <p className="text-xl font-bold lg:text-3xl">3110</p>
                <p className="md:text-md text-sm font-semibold text-gray-400">
                  Total Products
                </p>
              </div>
              <div>
                <p className="text-xl font-bold lg:text-3xl">250902+</p>
                <p className="md:text-md text-sm font-semibold text-gray-400">
                  Happy Customers
                </p>
              </div>
            </div>
          </div>

          <div className="relative hidden aspect-square md:block md:w-1/3 md:max-w-[450px]">
            <div className="absolute aspect-square w-3/4 rounded-full bg-gray-300"></div>
            <img
              src={MenShirt}
              alt="men-shirt"
              className="absolute bottom-4 left-5 z-20 w-1/2"
            />
            <img
              src={FourStarIcon}
              alt="star-4"
              className="absolute w-8 md:top-7 lg:top-16 lg:w-10"
            />
            <img
              src={FourStarIcon}
              alt="star-4"
              className="absolute bottom-7 right-16 w-8 lg:bottom-10 lg:right-48 lg:w-10 "
            />
          </div>
        </div>

        {/* Core Value */}
        <div className="flex w-full flex-col items-center justify-center py-6 md:flex-row md:justify-around lg:py-16">
          <div className="relative w-3/4 p-7 md:h-[200px] md:w-1/3 md:p-8 lg:w-1/4">
            <div className="absolute top-5 left-5 -z-10 h-2/5 w-1/2 rounded-lg bg-gray-100"></div>
            <img src={TruckIcon} alt="truck" className="w-10" />
            <p className="text-lg font-semibold">Free Worldwide Shipping </p>
            <p className=" text-sm text-gray-400  ">
              Free shipping to all over the world with many specials only for
              our dear customers
            </p>
          </div>

          <div className="relative w-3/4 p-7 md:h-[200px] md:w-1/3 md:p-8 lg:w-1/4">
            <div className="absolute top-5 left-5 -z-10 h-2/5 w-1/2 rounded-lg bg-gray-100"></div>
            <img src={ShirtIcon} alt="shirt" className="w-10" />
            <p className="text-lg font-semibold">Best Quality Products </p>
            <p className=" text-sm text-gray-400  ">
              Many customers entrust various products needs to us, and customer
              satisfaction is our pride
            </p>
          </div>

          <div className="relative w-3/4 p-7 md:h-[200px] md:w-1/3 md:p-8 lg:w-1/4">
            <div className="absolute top-5 left-5 -z-10 h-2/5 w-1/2 rounded-lg bg-gray-100"></div>
            <img src={MoneyIcon} alt="money" className="w-10" />
            <p className="text-lg font-semibold">Super Affordable Price </p>
            <p className=" text-sm text-gray-400  ">
              You can get various products with the highest quality at an
              affordable price
            </p>
          </div>
        </div>

        {/* Main Categories */}
        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 md:grid-rows-2">
          <div className=" flex justify-end">
            <div className="flex h-40 w-3/4 items-center justify-center justify-items-center rounded-lg bg-gray-200">
              <div className="ml-5">
                <p className="text-xl text-gray-400">#Jewelry</p>
                <p className="lg:text-xl font-bold">
                  Discover Our Jewelry Collection
                </p>
              </div>
              <img
                src={SilverRings}
                alt="ring"
                className="w-1/3 object-contain mr-1"
              />
            </div>
          </div>

          <div className="md:row-span-2 flex justify-start h-40 md:h-auto">
            <div className=" relative flex w-3/4 items-center md:items-start  justify-items-center rounded-lg bg-gray-200">
              <div className="ml-5 md:mt-10 md:ml-10">
                <p className="text-xl text-gray-400">#Clothing</p>
                <p className="lg:text-xl md:w-1/2 font-bold">
                  Express Your Life Through Clothes
                </p>
              </div>
              <img
                src={WomenSuit}
                alt="ring"
                className="w-2/5 object-contain md:absolute bottom-10 right-10 mr-1 max-h-[80%]"
              />
            </div>
          </div>

          <div className=" flex justify-end">
            <div className="flex h-40 w-3/4 items-center justify-center justify-items-center rounded-lg bg-gray-200">
              <div className="ml-5">
                <p className="text-xl text-gray-400">#Electronic</p>
                <p className="lg:text-xl font-bold">
                  Make Your Life More Comfortable
                </p>
              </div>
              <img
                src={Headphone}
                alt="ring"
                className="w-1/4 object-contain mr-1sss"
              />
            </div>
          </div>
        </div>

        {/* Store Description */}
        <div className="flex w-full flex-col md:flex-row md:h-80 my-10 justify-center items-center gap-10 md:gap-32">
          <div className="relative ">
            <div className="absolute aspect-square w-full rounded-full bg-gray-200 -z-10 -bottom-10 -left-10"></div>
            <img src={Watch} alt="" className="w-[200px]" />
          </div>
          <div className="w-4/5 md:w-1/3">
            <p className="text-xl md:text-xl lg:text-3xl font-bold my-3">
              Experienced in making your life more modern and comfortable
            </p>
            <p className="text-xs md:text-sm text-gray-400">
              We have helped thousands of customers by making their lives more
              modern and comfortable, don't let yourself have missed any quality
              products from us
            </p>
          </div>
        </div>

        {/* Quote */}
        <div className="flex flex-col justify-center items-center mb-10">
          <div className="flex flex-col justify-center items-center w-4/5 bg-gray-200 p-5 md:p-10 gap-3 rounded-md">
            <p className="text-4xl relative top-2">"</p>
            <p className="text-md md:text-xl w-3/4 text-gray-500 text-center">
              Their products are Amazing! This is the best place to buy any
              products with super fantastic quality and design. With super many
              benefits, you must try it.
            </p>
            <p className="text-lg font-bold mt-2">Vo Minh Nhut</p>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Home;
