import React from "react";
import SmallButton from "../components/SmallButton";
import { FourStarIcon, MoneyIcon, ShirtIcon, TruckIcon } from "../assets/icons";
import {
  Headphone,
  MenShirt,
  SilverRings,
  Watch,
  WomenSuit,
} from "../assets/images";

const Home = (): React.ReactElement => {
  return (
    <div>
      {/* Header  */}
      <div className="my-2 flex w-full flex-col items-center justify-around bg-gray-200 p-10 md:h-[31.25rem] md:flex-row md:p-0">
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

        <div className="relative hidden aspect-square md:block md:w-1/3 md:max-w-[28.125rem]">
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
        <div className="relative w-3/4 p-7 md:h-[12.5rem] md:w-1/3 md:p-8 lg:w-1/4">
          <div className="absolute top-5 left-5 -z-10 h-2/5 w-1/2 rounded-lg bg-gray-100"></div>
          <img src={TruckIcon} alt="truck" className="w-10" />
          <p className="text-lg font-semibold">Free Worldwide Shipping </p>
          <p className=" text-sm text-gray-400  ">
            Free shipping to all over the world with many specials only for our
            dear customers
          </p>
        </div>

        <div className="relative w-3/4 p-7 md:h-[12.5rem] md:w-1/3 md:p-8 lg:w-1/4">
          <div className="absolute top-5 left-5 -z-10 h-2/5 w-1/2 rounded-lg bg-gray-100"></div>
          <img src={ShirtIcon} alt="shirt" className="w-10" />
          <p className="text-lg font-semibold">Best Quality Products </p>
          <p className=" text-sm text-gray-400  ">
            Many customers entrust various products needs to us, and customer
            satisfaction is our pride
          </p>
        </div>

        <div className="relative w-3/4 p-7 md:h-[12.5rem] md:w-1/3 md:p-8 lg:w-1/4">
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
              <p className="font-bold lg:text-xl">
                Discover Our Jewelry Collection
              </p>
            </div>
            <img
              src={SilverRings}
              alt="ring"
              className="mr-1 w-1/3 object-contain"
            />
          </div>
        </div>

        <div className="flex h-40 justify-start md:row-span-2 md:h-auto">
          <div className=" relative flex w-3/4 items-center justify-items-center  rounded-lg bg-gray-200 md:items-start">
            <div className="ml-5 md:mt-10 md:ml-10">
              <p className="text-xl text-gray-400">#Clothing</p>
              <p className="font-bold md:w-1/2 lg:text-xl">
                Express Your Life Through Clothes
              </p>
            </div>
            <img
              src={WomenSuit}
              alt="ring"
              className="bottom-10 right-10 mr-1 max-h-[80%] w-2/5 object-contain md:absolute"
            />
          </div>
        </div>

        <div className=" flex justify-end">
          <div className="flex h-40 w-3/4 items-center justify-center justify-items-center rounded-lg bg-gray-200">
            <div className="ml-5">
              <p className="text-xl text-gray-400">#Electronic</p>
              <p className="font-bold lg:text-xl">
                Make Your Life More Comfortable
              </p>
            </div>
            <img
              src={Headphone}
              alt="ring"
              className="mr-1sss w-1/4 object-contain"
            />
          </div>
        </div>
      </div>

      {/* Store Description */}
      <div className="my-10 flex w-full flex-col items-center justify-center gap-10 md:h-80 md:flex-row md:gap-32">
        <div className="relative ">
          <div className="absolute -bottom-10 -left-10 -z-10 aspect-square w-full rounded-full bg-gray-200"></div>
          <img src={Watch} alt="" className="w-[12.5rem]" />
        </div>
        <div className="w-4/5 md:w-1/3">
          <p className="my-3 text-xl font-bold md:text-xl lg:text-3xl">
            Experienced in making your life more modern and comfortable
          </p>
          <p className="text-xs text-gray-400 md:text-sm">
            We have helped thousands of customers by making their lives more
            modern and comfortable, don't let yourself have missed any quality
            products from us
          </p>
        </div>
      </div>

      {/* Quote */}
      <div className="mb-10 flex flex-col items-center justify-center">
        <div className="flex w-4/5 flex-col items-center justify-center gap-3 rounded-md bg-gray-200 p-5 md:p-10">
          <p className="relative top-2 text-4xl">"</p>
          <p className="text-md w-3/4 text-center text-gray-500 md:text-xl">
            Their products are Amazing! This is the best place to buy any
            products with super fantastic quality and design. With super many
            benefits, you must try it.
          </p>
          <p className="mt-2 text-lg font-bold">Vo Minh Nhut</p>
        </div>
      </div>
    </div>
  );
};

export default Home;