import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi } from "./api";
import { AddOrderType, Order } from "./types.api";
import { OrderStatus, PaymentOptions } from "../constants";

const addOrder = async (data: AddOrderType) => {
  return await authApi.post<Order>("/orders", data);
};

const getOrders = async () => {
  const { data } = await authApi.get("/orders");

  return data as Order[];
};

const getOrder = async (id: String) => {
  const { data } = await authApi.get(`/orders/${id}`);

  return data as Order;
};

const verifyIpn = async (params: any) => {
  return await authApi.get("verify-ipn", { params });
};

const createPaymentUrl = async (orderId: string) => {
  const { data } = await authApi.post(`/orders/${orderId}/payment-url`);

  return data;
};

const cancelOrder = async (id: string) => {
  const { data } = await authApi.patch(`/orders/${id}/cancel`, {
    status: OrderStatus.CANCELED,
  });

  return data as Order;
};

const getEstimateAmount = async (
  discountId?: string
): Promise<{ estimatedAmount: number }> => {
  const { data } = await authApi.get("/orders/estimate-amount", {
    params: { discountId },
  });

  return data;
};

const fetchOrderList = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrders(),
  });

  return { orders: data, error, isLoading };
};

const fetchSingleOrder = (id: string) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["orders", id],
    queryFn: () => getOrder(id),
  });

  return { order: data, error, isLoading };
};

const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation(addOrder, {
    onSuccess: async (data) => {
      queryClient.invalidateQueries(["orders"]);
      const { data: orderData } = data;
      const { paymentType } = orderData;
      if (paymentType === PaymentOptions.VNPAY) {
        const paymentData = await createPaymentUrl(orderData.id);
        const { paymentUrl } = paymentData;
        if (paymentUrl) window.location.href = paymentUrl;
      }
    },
  });
};

export {
  addOrder,
  getOrders,
  fetchOrderList,
  getOrder,
  fetchSingleOrder,
  cancelOrder,
  getEstimateAmount,
  useCreateOrder,
  verifyIpn,
};
