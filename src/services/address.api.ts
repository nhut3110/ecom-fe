import { useQuery } from "@tanstack/react-query";
import { AddressCardType } from "../constants";
import { authApi } from "./api";

const getAddresses = async () => {
  const { data } = await authApi.get("/addresses");

  return data;
};

const getAddress = async (id: string) => {
  const { data } = await authApi.get(`/addresses/${id}`);

  return data;
};

const updateAddress = async (id: string, data: AddressCardType) => {
  return await authApi.patch(`/addresses/${id}`, data);
};

const addAddress = async (data: AddressCardType) => {
  return await authApi.post("/addresses", data);
};

const deleteAddress = async (id: string) => {
  const { data } = await authApi.delete(`/addresses/${id}`);

  return data;
};

const fetchAddressList = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["addresses"],
    queryFn: () => getAddresses(),
  });

  return { addresses: data, error, isLoading };
};

export {
  getAddresses,
  getAddress,
  updateAddress,
  addAddress,
  deleteAddress,
  fetchAddressList,
};
