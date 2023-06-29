import { PaymentInputsWrapper, usePaymentInputs } from "react-payment-inputs";
import images, { CardImages } from "react-payment-inputs/images";
import React, { useEffect } from "react";
import OrderSummary from "../components/OrderSummary";
import {
  AddressType,
  fetchAddressList,
  fetchCartList,
  fetchPaymentList,
} from "../services";
import Select from "react-select";
import AddressCard from "../components/AddressCard";

const Checkout = (): React.ReactElement => {
  const { cart, isLoading: isLoadingCart } = fetchCartList();
  const { addresses, isLoading: isLoadingAddress } = fetchAddressList();
  const { payment, isLoading: isLoadingPayment } = fetchPaymentList();

  const { wrapperProps, getCardImageProps, getCardNumberProps } =
    usePaymentInputs();

  return (
    <div className="mx-auto flex w-full flex-col items-center justify-around md:flex-row">
      <div className="my-5 w-[90%] px-5 md:w-3/5">
        <div className="my-10">
          <p className="text-xl font-semibold md:text-2xl">
            Thank you for ordering with us,
          </p>
          <p className="text-xl font-semibold md:text-3xl">
            Fill Shipping info ✏️
          </p>
        </div>

        <div>
          <p className="text-xl font-semibold underline md:text-2xl">
            Address Section
          </p>
          <Select
            isSearchable={false}
            options={addresses?.map((address: AddressType) => ({
              value: address.id,
              label: <AddressCard details={address} />,
            }))}
          />
        </div>
      </div>
      <OrderSummary />z
    </div>
  );
};

export default Checkout;
{
  /* <PaymentInputsWrapper {...wrapperProps}>
  <svg
    {...getCardImageProps({
      images: images as unknown as CardImages,
    })}
  />
  <input {...getCardNumberProps()} className="w-full" />
</PaymentInputsWrapper>; */
}
