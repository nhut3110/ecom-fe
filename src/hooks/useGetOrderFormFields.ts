import React from "react";
import { Path } from "react-hook-form";
import {
  AddressType,
  InformationType,
  PaymentType,
} from "../context/FormContext";

type FormField = {
  label: string;
  name: Path<InformationType | AddressType | PaymentType>;
};

export const useGetOrderFormFields = () => {
  const informationFormArray: FormField[] = [
    {
      label: "Full name",
      name: "name",
    },
    {
      label: "Phone number",
      name: "phone",
    },
    {
      label: "Personal email",
      name: "email",
    },
  ];

  const addressFormArray: FormField[] = [
    {
      label: "Apartment number",
      name: "number",
    },
    {
      label: "Street",
      name: "street",
    },
    {
      label: "Ward",
      name: "ward",
    },
    {
      label: "City",
      name: "city",
    },
    {
      label: "Country",
      name: "country",
    },
  ];

  const paymentFormArray: FormField[] = [
    {
      label: "card owner",
      name: "owner",
    },
    {
      label: "Card number",
      name: "cardNumber",
    },
    {
      label: "CVC",
      name: "cvc",
    },
  ];

  return { informationFormArray, addressFormArray, paymentFormArray };
};
