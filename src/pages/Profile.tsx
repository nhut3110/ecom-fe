import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BiImageAdd } from "react-icons/bi";
import { Button } from "antd";
import { EditOutlined, SyncOutlined } from "@ant-design/icons";
import { Fragment, useContext, useEffect, useMemo, useState } from "react";
import { useValidateLoginExpiration, useNavigatePage } from "../hooks";
import MemberBadge from "../components/Profile/MemberBadge";
import GifLoading from "../components/shared/GifLoading";
import AvatarModal from "../components/shared/AvatarModal";
import OrderChart from "../components/Order/OrderChart";
import SlideDownDisappearWrapper from "../components/Animation/SlideDownDisappearWrapper";
import { OrderContext } from "../context/OrderContext";
import { UserDataContext } from "../context/UserDataContext";
import { LogoTransparent } from "../assets/images";
import {
  convertTimestampToDate,
  determineCurrentBadge,
  determineNextBadge,
} from "../utils";
import { Order, fetchFavoriteList, fetchOrderList } from "../services";
import { OrderStatus } from "../constants";
import { formatVNDPrice } from "../utils/formatVNDPrice";

const NUMBER_OF_RECENT_ORDERS = 5;

const Profile = () => {
  const { importOrders } = useContext(OrderContext);
  const { userDataState } = useContext(UserDataContext);

  const [percentage, setPercentage] = useState<number>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [recentOrderList, setRecentOrderList] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { isLogin, isLoading } = useValidateLoginExpiration();
  const { redirect } = useNavigatePage();

  const { orders, isLoading: isLoadingOrder } = fetchOrderList();
  const { favorites, isLoading: isLoadingFavorites } = fetchFavoriteList();

  const currentRank = useMemo(() => {
    return determineCurrentBadge(userDataState?.shippingPoint ?? 0);
  }, [userDataState]);
  const nextRank = useMemo(() => {
    return determineNextBadge(userDataState?.shippingPoint ?? 0);
  }, [userDataState]);

  useEffect(() => {
    if (!isLogin) redirect("/login");
  });

  useEffect(() => {
    if (!isLoading) {
      setPercentage(((currentRank.point || 0) / (nextRank.point || 1)) * 100);
    }
  }, [isLoading, currentRank, nextRank]);

  useEffect(() => {
    setLoading(isLoading || isLoadingFavorites || isLoadingOrder);
  }, [isLoading, isLoadingFavorites, isLoadingOrder]);

  useEffect(() => {
    if (!isLoadingOrder && orders) {
      const sortedOrders = [...orders].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      const recentOrderList = sortedOrders.slice(0, NUMBER_OF_RECENT_ORDERS);
      setRecentOrderList(recentOrderList);

      importOrders(orders);
    }
  }, [isLoadingOrder, orders]);

  return (
    <>
      {loading ? (
        <AnimatePresence>
          <SlideDownDisappearWrapper>
            <div className="flex h-screen w-full items-center justify-center">
              <GifLoading />
            </div>
          </SlideDownDisappearWrapper>
        </AnimatePresence>
      ) : (
        <Fragment>
          <div className="container-profile-pattern h-40 w-full" />
          <div className="relative -top-10 mx-auto w-[90%] md:-top-5">
            <div className="mb-8 flex flex-col items-center justify-between gap-3 md:flex-row">
              {/* Avatar and Info */}
              <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
                <div className="group relative flex rounded-full bg-white">
                  <img
                    src={userDataState?.picture ?? LogoTransparent}
                    alt="avatar"
                    className="aspect-square w-32 rounded-full border border-black shadow-lg"
                  />
                  <button
                    className="absolute left-0 right-0 top-0 flex h-full w-full items-center justify-center gap-2 rounded-full border border-black bg-gray-300 bg-opacity-50 p-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
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
              <div className="mt-5 flex gap-5 sm:flex-col md:mt-2 md:flex-row md:gap-2">
                <Button
                  onClick={() => redirect("/profile/edit")}
                  icon={<EditOutlined />}
                >
                  Edit Profile
                </Button>

                <Button
                  onClick={() => redirect("/profile/password")}
                  icon={<SyncOutlined />}
                >
                  Change Password
                </Button>
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
                      {favorites?.data?.length}
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold lg:text-lg">Orders</p>
                    <p className="text-4xl font-bold">{orders?.length}</p>
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
                      <Link to={`/orders/${order.id}`} key={index}>
                        <motion.div
                          whileHover={{ scale: 1.01 }}
                          className="flex h-10 w-full items-center justify-between rounded-xl border-2 p-3 shadow-md"
                        >
                          <div>
                            <p className="text-xs font-semibold">
                              {convertTimestampToDate(
                                new Date(order.createdAt).getTime()
                              )}
                            </p>
                            <p className="max-w-[50%] truncate font-mono text-[0.5rem] italic text-gray-300">
                              {order.id}
                            </p>
                          </div>
                          <div className="flex items-center justify-center gap-2">
                            <p className="text-sm font-semibold">
                              {formatVNDPrice(order.amount)}đ
                            </p>
                            <p
                              className={`text-xs font-medium italic first-letter:capitalize ${
                                order.orderStatus === OrderStatus.CANCELED
                                  ? "text-red-300"
                                  : "text-green-300"
                              }`}
                            >
                              {order.orderStatus}
                            </p>
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <AvatarModal open={openModal} onClose={() => setOpenModal(false)} />
        </Fragment>
      )}
    </>
  );
};

export default Profile;
