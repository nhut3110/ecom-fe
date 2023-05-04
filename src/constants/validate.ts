import * as yup from "yup";
import {
  AddressType,
  InformationType,
  PaymentType,
} from "../context/FormContext";
import { LoginFormType } from "../pages/Login";

export type ConditionalSchema<T> = T extends string
  ? yup.StringSchema
  : T extends number
  ? yup.NumberSchema
  : T extends boolean
  ? yup.BooleanSchema
  : T extends Record<any, any>
  ? yup.AnyObjectSchema
  : T extends Array<any>
  ? yup.ArraySchema<any, any>
  : yup.AnySchema;

export type Shape<Fields> = {
  [Key in keyof Fields]: ConditionalSchema<Fields[Key]>;
};

export const validationInformationSchema = yup
  .object<Shape<InformationType>>()
  .shape({
    name: yup.string().required("Full name is required"),

    phone: yup
      .string()
      .required("Phone is required")
      .matches(/^[0-9+]+$/, "Phone number must contain only numbers and +"),

    email: yup.string().required("Email is required").email("Invalid email"),
  });

export const validationAddressSchema = yup.object<Shape<AddressType>>().shape({
  number: yup
    .string()
    .required("Apartment number is required")
    .matches(/^[0-9a-zA-Z/]+$/, "Invalid apartment number"),

  ward: yup.string(),

  street: yup.string().required("Street is required"),

  city: yup.string().required("City is required"),

  country: yup.string().required("Country is required"),
});

export const validationPaymentSchema = yup.object<Shape<PaymentType>>().shape({
  owner: yup
    .string()
    .required("Card owner is required")
    .matches(/^[A-Z ]+$/, "Only capital letters are allowed for card owner"),

  cardNumber: yup
    .string()
    .required("Card number is required")
    .matches(/^[\d-]+$/, "Only numbers and dashes are allowed for card number")
    .length(16, "Card number must be 16 digits"),

  cvc: yup
    .string()
    .required("CVC is required")
    .matches(/^\d{3}$/, "CVC must be 3 digits"),
});

export const validationLoginSchema = yup.object<Shape<LoginFormType>>().shape({
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required")
    .min(6, "Email must be at least 6 characters")
    .max(64, "Email must be at most 64 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must be at most 64 characters"),
});
