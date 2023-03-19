import React from "react";
import {
  FourStarIcon,
  MoneyIcon,
  ShirtIcon,
  TruckIcon,
} from "../assets/icons/icons";
import {
  MenShirt,
  Ring,
  SilverRings,
  WomenShirt,
} from "../assets/images/images";
import Footer from "../components/Footer";
import MailSubscription from "../components/MailSubscription";
import NavBar from "../components/NavBar";
import SmallButton from "../components/SmallButton";

const Home = () => {
  return (
    <div className="h-screen ">
      <NavBar />

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
            Free shipping to all over the world with many specials only for our
            dear customers
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
      <div className="grid w-full grid-cols-1 gap-5   md:grid-cols-2  md:grid-rows-2">
        <div className=" flex justify-end">
          <div className="flex h-40 w-3/4 items-center justify-center justify-items-center rounded-lg bg-gray-200">
            <div>
              <p className="text-xl text-gray-400">#Jewelry</p>
              <p className="text-xl font-bold">
                Discover Our Jewelry Collection
              </p>
            </div>
            <img
              src={SilverRings}
              alt="ring"
              className="w-1/3 object-contain"
            />
          </div>
        </div>

        <div className="row-span-2 flex justify-start">
          <div className="flex  w-3/4 items-center justify-center justify-items-center rounded-lg bg-gray-200">
            <div>
              <p className="text-xl text-gray-400">#Jewelry</p>
              <p className="text-xl font-bold">
                Discover Our Jewelry Collection
              </p>
            </div>
            <img
              src={SilverRings}
              alt="ring"
              className="w-1/3 object-contain"
            />
          </div>
        </div>

        <div className=" flex justify-end">
          <div className="flex h-40 w-3/4 items-center justify-center justify-items-center rounded-lg bg-gray-200">
            <div>
              <p className="text-xl text-gray-400">#Jewelry</p>
              <p className="text-xl font-bold">
                Discover Our Jewelry Collection
              </p>
            </div>
            <img
              src={SilverRings}
              alt="ring"
              className="w-1/3 object-contain"
            />
          </div>
        </div>
      </div>

      <MailSubscription />
      <Footer />
    </div>
  );
};

export default Home;
