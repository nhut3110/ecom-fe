import { AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { MdEdit, MdCached } from "react-icons/md";
import { BiImageAdd, BiTrash } from "react-icons/bi";
import React, {
  Fragment,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useValidateLoginExpiration, useNavigatePage } from "../hooks";
import MemberBadge from "../components/MemberBadge";
import GifLoading from "../components/GifLoading";
import OrderChart from "../components/OrderChart";
import Modal from "../components/Modal";
import SlideDownDisappearWrapper from "../components/Animation/SlideDownDisappearWrapper";
import { FavoriteContext } from "../context/FavoriteContext";
import { OrderContext } from "../context/OrderContext";
import { UploadIcon } from "../assets/icons";
import { UserBanner } from "../assets/images";
import { editAvatar } from "../services/auth.api";
import { UserDataContext } from "../context/UserDataContext";
import {
  convertTimestampToDate,
  determineCurrentBadge,
  determineNextBadge,
} from "../utils";

const Profile = () => {
  const { favoriteState } = useContext(FavoriteContext);
  const { orderState } = useContext(OrderContext);
  const { userDataState, updateUserData } = useContext(UserDataContext);

  const [percentage, setPercentage] = useState<number>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const { isLogin, isLoading } = useValidateLoginExpiration();
  const { redirect } = useNavigatePage();
  const { mutate, isLoading: isMutating } = useMutation(editAvatar, {
    onSuccess: (response) => {
      updateUserData({ picture: response.picture });
    },
  });

  const currentRank = useMemo(() => {
    return determineCurrentBadge(userDataState?.shippingPoint ?? 0);
  }, [userDataState]);
  const nextRank = useMemo(() => {
    return determineNextBadge(userDataState?.shippingPoint ?? 0);
  }, [userDataState]);
  const recentOrderList = useMemo(() => {
    return orderState.orderList.slice(0, 5);
  }, [orderState.orderList]); // TODO: just dummy data for ui only, replace after when have api for orders

  const handleSubmitModal = () => {
    if (selectedImage) {
      mutate(selectedImage);
    }
    setOpenModal(false);
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files && event.dataTransfer.files[0];

    if (file) {
      setSelectedImage(file);
    }
  };

  useEffect(() => {
    if (!isLogin) redirect("/login");
  });

  useEffect(() => {
    if (!isLoading) {
      setPercentage(((currentRank.point || 0) / (nextRank.point || 1)) * 100);
    }
  }, [isLoading, currentRank, nextRank]);

  return (
    <>
      {isLoading || isMutating ? (
        <AnimatePresence>
          <SlideDownDisappearWrapper>
            <div className="flex h-screen w-full items-center justify-center">
              <GifLoading />
            </div>
          </SlideDownDisappearWrapper>
        </AnimatePresence>
      ) : (
        <Fragment>
          <div className="h-40 w-full">
            <img
              src={UserBanner}
              alt="banner"
              className="h-40 w-full object-cover"
            />
          </div>
          <div className="relative -top-10 mx-auto w-[90%] md:-top-5">
            <div className="mb-8 flex flex-col items-center justify-between gap-3 md:flex-row">
              {/* Avatar and Info */}
              <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
                <div className="group relative flex rounded-full bg-white">
                  <img
                    src={userDataState?.picture}
                    alt="avatar"
                    className="aspect-square w-32 rounded-full border border-black shadow-lg"
                  />
                  <button
                    className="absolute top-0 left-0 right-0 flex h-full w-full items-center justify-center gap-2 rounded-full border border-black bg-gray-300 bg-opacity-50 p-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    onClick={() => setOpenModal(true)}
                  >
                    <BiImageAdd size={30} />
                  </button>
                </div>

                <div className="flex flex-col items-center justify-center gap-1 md:items-start md:justify-start">
                  <p className="text-3xl font-bold">{userDataState?.name}</p>
                  <p className="text-sm text-gray-400">
                    {userDataState?.email}
                  </p>
                </div>
              </div>
              {/* Buttons  */}
              <div className="mt-5 flex gap-5 md:mt-2 md:gap-2">
                <button
                  className="flex h-fit items-center justify-center gap-2 rounded-lg border border-black p-1"
                  onClick={() => redirect("/profile/edit")}
                >
                  <p className="font-bold">Edit Profile</p>
                  <MdEdit />
                </button>

                <button
                  className="flex h-fit items-center justify-center gap-2 rounded-lg border border-black p-1"
                  onClick={() => redirect("/profile/password")}
                >
                  <p className="font-bold">Change Password</p>
                  <MdCached />
                </button>
              </div>
            </div>

            <div className="flex w-full flex-col items-center justify-between gap-5">
              <div className="flex w-full flex-col gap-10 md:flex-row">
                {/* User data */}
                <div className="h-60 w-full rounded-xl border-2 p-5 shadow-lg md:w-1/2">
                  <p className="text-lg font-semibold">User Information</p>
                  <div className="h-full w-full items-center justify-center gap-1">
                    <div className="flex flex-col p-2">
                      <p className="font-medium">Name:</p>
                      <p className="self-end">{userDataState?.name}</p>
                    </div>
                    <div className="flex flex-col p-2">
                      <p className="font-medium">Phone Number:</p>
                      <p className="self-end">
                        {userDataState?.phoneNumber ?? "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
                {/* Badge */}
                <div className="flex h-60 w-full flex-col gap-3 rounded-xl border-2 p-5 shadow-lg md:w-1/3">
                  <p className="text-lg font-semibold">User Badge</p>
                  <div className="flex flex-col items-center justify-center">
                    <div className="aspect-square h-28">
                      <MemberBadge
                        shippingPoint={userDataState?.shippingPoint ?? 0}
                      />
                    </div>

                    <p className="text-lg font-semibold italic first-letter:capitalize">
                      {currentRank.rank}
                    </p>
                  </div>
                </div>
                {/* Overall Data */}
                <div className="grid h-60 w-full grid-cols-2 grid-rows-2 items-center justify-center gap-1 rounded-xl border-2 p-5 shadow-lg md:w-1/3">
                  <div>
                    <p className="font-semibold lg:text-lg">Favorites</p>
                    <p className="text-4xl font-bold">
                      {favoriteState.favoriteList.length}
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold lg:text-lg">Orders</p>
                    <p className="text-4xl font-bold">
                      {orderState.orderList.length}
                    </p>
                  </div>

                  <div className="col-span-2">
                    <p className="text-lg font-semibold">Points</p>
                    <div className="mt-2 flex flex-col items-end">
                      <p className="text-[0.7rem] font-semibold italic first-letter:capitalize">
                        {nextRank.rank}
                      </p>
                      <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-200">
                        <div
                          className="h-2.5 rounded-full bg-yellow-200"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <p className="text-[0.7rem] font-semibold italic">
                        {currentRank.rank === nextRank.rank
                          ? "max"
                          : `${currentRank.point}/${nextRank.point}`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex w-full flex-col gap-10 md:flex-row">
                {/* Chart */}
                <div className="flex h-60 w-full items-center justify-center rounded-xl border-2 p-5 shadow-lg md:w-1/2">
                  <OrderChart />
                </div>
                {/* Recent Orders */}
                <div className="h-60 rounded-xl border-2 p-5 shadow-lg md:w-1/2 lg:w-full">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-lg font-semibold">Recent Orders</p>
                    <p
                      className="cursor-pointer text-sm italic text-gray-300 hover:text-black"
                      onClick={() => redirect("/orders")}
                    >
                      View all
                    </p>
                  </div>

                  {/* Recent order list  */}
                  <div className="p- flex max-h-[80%] flex-col gap-3 overflow-x-hidden overflow-y-scroll p-1 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-thumb-rounded-full">
                    {recentOrderList.map((order, index) => (
                      <div
                        className="flex h-10 w-full items-center justify-between rounded-xl border-2 p-3 shadow-md"
                        key={index}
                      >
                        <div>
                          <p className="text-xs font-semibold">
                            {convertTimestampToDate(order.date)}
                          </p>
                          <p className="max-w-[50%] truncate font-mono text-[0.5rem] italic text-gray-300">
                            {order.uuid}
                          </p>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                          <p className="text-sm font-semibold">
                            ${order.cartValue}
                          </p>
                          <p className="text-xs font-thin italic">Success</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Modal
            open={openModal}
            title="Edit avatar"
            onClose={() => setOpenModal(false)}
            onSubmit={handleSubmitModal}
          >
            <div
              className={`flex w-full min-w-[19rem] items-center justify-center ${
                isDragging ? "bg-gray-200" : ""
              }`}
              onDragEnter={handleDragEnter}
              onDragOver={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <label
                htmlFor="dropzone-file"
                className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
              >
                {selectedImage ? (
                  <div className="relative">
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="uploaded"
                      className="mb-3 h-32 w-32 rounded-full object-contain"
                    />
                    <button
                      className="absolute -top-3 -right-3 rounded-full bg-white p-1 text-sm text-red-500 underline"
                      onClick={() => setSelectedImage(null)}
                    >
                      <BiTrash size={20} />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <img
                      src={UploadIcon}
                      alt="upload"
                      className="mb-3 h-10 w-10 text-gray-400"
                    />
                    <p className="mb-2 text-sm text-gray-500">
                      {isDragging ? (
                        <span className="font-semibold">
                          Drop the file here
                        </span>
                      ) : (
                        <span className="font-semibold">Click to upload</span>
                      )}{" "}
                      or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG or JPG (MAX. 10MB)
                    </p>
                  </div>
                )}
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={handleFileInputChange}
                />
              </label>
            </div>
          </Modal>
        </Fragment>
      )}
    </>
  );
};

export default Profile;
