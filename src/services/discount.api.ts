import { useQuery } from "@tanstack/react-query";
import { authApi, publicApi } from "./api";
import { Discount, FindDiscountType, UserDiscount } from "./types.api";
import { AxiosResponse } from "axios";

interface FetchDiscountListProps {
  params: FindDiscountType;
  enabled?: boolean;
}

interface FetchDiscussionListProps {
  productId: string;
  enabled?: boolean;
}

const getUserDiscount = async (
  params: FindDiscountType
): Promise<AxiosResponse<UserDiscount[]>> => {
  return await authApi.get("/discounts/user", { params });
};

const claimDiscount = async (
  discountId: string,
  usageCount?: number
): Promise<UserDiscount> => {
  return await authApi.post(`/discounts/${discountId}/claim`, {
    usageCount: usageCount ?? 1,
  });
};

const getAllDiscounts = async (
  params: FindDiscountType
): Promise<AxiosResponse<Discount[]>> => {
  return await publicApi.get("/discounts", { params });
};

const fetchDiscountList = ({
  params,
  enabled = true,
}: FetchDiscountListProps) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["all-discounts"],
    queryFn: () => getAllDiscounts(params),
    enabled,
  });

  return {
    discounts: data?.data,
    error,
    isLoading,
    refetchDiscountList: refetch,
  };
};

const fetchUserDiscountList = (params: FindDiscountType) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["all-user-discounts"],
    queryFn: () => getUserDiscount(params),
  });

  return {
    userDiscounts: data?.data,
    error,
    isLoading,
    refetchUserDiscountList: refetch,
  };
};

export {
  getUserDiscount,
  claimDiscount,
  getAllDiscounts,
  fetchDiscountList,
  fetchUserDiscountList,
};
