import { AnimatePresence, motion } from "framer-motion";
import images from "react-payment-inputs/images";
import Payment from "payment";
import React, {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigatePage } from "../hooks";
import Modal from "../components/shared/Modal";
import AddressCard from "../components/Address/AddressCard";
import GifLoading from "../components/shared/GifLoading";
import SmallButton from "../components/shared/SmallButton";
import OrderSummary from "../components/Order/OrderSummary";
import CartList from "../components/Cart/CartList";
import {
  AddressType,
  PaymentType,
  addOrder,
  fetchAddressList,
  fetchCartList,
  fetchPaymentList,
} from "../services";
import { CartContext } from "../context/CartContext";
import { NotificationContext } from "../context/NotificationContext";
import { transformCartResponse } from "../utils";
import { PaymentOptions, paymentOptions } from "../constants";
import {
  Button,
  Col,
  Flex,
  Form,
  Input,
  Row,
  Select,
  Space,
  Steps,
  Typography,
  message,
} from "antd";
import { useForm } from "antd/es/form/Form";
import {
  GlobalOutlined,
  ShoppingCartOutlined,
  TransactionOutlined,
  TruckOutlined,
} from "@ant-design/icons";
import {
  GoogleMap,
  Libraries,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";

type SelectOptionType = ChangeEvent & {
  value: string;
  label: string;
};

const selectVariants = {
  initial: { x: -50, opacity: 0 },
  animate: { x: 0, opacity: 1 },
};

const Checkout = (): React.ReactElement => {
  const { cart, isLoading: isLoadingCart } = fetchCartList();
  const { addresses, isLoading: isLoadingAddress } = fetchAddressList();
  const { payment, isLoading: isLoadingPayment } = fetchPaymentList();

  const [address, setAddress] = useState<AddressType>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [paymentType, setPaymentType] = useState<PaymentOptions>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [current, setCurrent] = useState(0);

  const { importCart, cartState } = useContext(CartContext);
  const { notify } = useContext(NotificationContext);

  const { redirect } = useNavigatePage();
  const [form] = useForm();

  const libs = useMemo(() => {
    return ["places"] as Libraries;
  }, []);

  const mapRef = useRef<google.maps.Map>();

  const { isLoaded } = useJsApiLoader({
    libraries: libs,
    googleMapsApiKey: "AIzaSyAgo5Lore5ZNzjsOi4oqOJI-7NQCA1ekVU", // MOVE TO ENV LATER
  });

  const cartValue = useMemo(() => {
    if (cartState.cartValue) return cartState.cartValue.toFixed(2);
    return "0.00";
  }, [cartState.cartValue]);

  const handleSubmit = async () => {
    if (!address?.id)
      return notify({
        id: crypto.randomUUID(),
        content: "Cannot checkout with an empty address",
        open: true,
        type: "warning",
      });

    if (!paymentType)
      return notify({
        id: crypto.randomUUID(),
        content: "Cannot checkout with an empty payment method",
        open: true,
        type: "warning",
      });

    await addOrder({
      addressId: address?.id as string,
      paymentType: paymentType,
      amount: Number(Number(cartValue).toFixed(0)),
    });

    redirect("/orders");

    return notify({
      id: crypto.randomUUID(),
      content: "Order successfully",
      open: true,
      type: "success",
    });
  };

  useEffect(() => {
    if (!isLoadingCart) importCart(transformCartResponse(cart));
    setIsLoading(isLoadingAddress || isLoadingCart || isLoadingPayment);
  }, [isLoadingAddress, isLoadingCart, isLoadingPayment]);

  const next = useCallback(() => {
    setCurrent(current + 1);
  }, [current]);

  const prev = useCallback(() => {
    setCurrent(current - 1);
  }, [current]);

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    map.setZoom(18);
  }, []);

  const AddressStep = useCallback(() => {
    return (
      <div>
        <Form.Item label="Message note" name="description">
          <Input.TextArea
            autoSize={{ minRows: 3, maxRows: 6 }}
            showCount
            maxLength={200}
          />
        </Form.Item>
        <Form.Item label="Address" name="address" required>
          <Select
            showSearch
            size="large"
            allowClear
            onChange={(value) => {
              setAddress(
                addresses?.find((item: AddressType) => item.id === value)
              );
            }}
            style={{ width: "100%" }}
            onClear={() => setAddress(undefined)}
            options={addresses?.map((item: AddressType) => ({
              key: item.id,
              label: (
                <Space>
                  <Typography.Text className="font-semibold">
                    {item.name}
                  </Typography.Text>
                  <Typography.Text>-</Typography.Text>
                  <Typography.Text>{item.address}</Typography.Text>
                </Space>
              ),
              value: item.id,
            }))}
          />
        </Form.Item>
        {address && (
          <>
            <Row gutter={[32, 32]} className="mt-7">
              <Col sm={24} md={12}>
                <Input
                  size="large"
                  readOnly
                  value={address?.name}
                  className="cursor-default"
                />
              </Col>
              <Col sm={24} md={12}>
                <Input
                  size="large"
                  readOnly
                  value={address?.phoneNumber}
                  className="cursor-default"
                />
              </Col>
              <Col span={24}>
                <Input
                  size="large"
                  readOnly
                  value={address?.email}
                  className="cursor-default"
                />
              </Col>
              <Col span={24}>
                <div className="mb-2 w-full rounded-full pt-2">
                  {isLoaded && (
                    <GoogleMap
                      mapContainerStyle={{
                        width: "100%",
                        height: "300px",
                      }}
                      onLoad={onLoad}
                      center={{
                        lat: address?.lat as number,
                        lng: address?.lng as number,
                      }}
                      onCenterChanged={() => mapRef.current?.setZoom(15)}
                    >
                      <Marker
                        position={{
                          lat: address?.lat as number,
                          lng: address?.lng as number,
                        }}
                      />
                    </GoogleMap>
                  )}
                </div>
              </Col>
            </Row>
          </>
        )}
      </div>
    );
  }, [addresses, address]);

  const ReviewStep = useCallback(() => {
    return;
  }, []);

  const steps = [
    {
      key: "address-form",
      title: <Typography.Title level={5}>Address</Typography.Title>,
      content: <AddressStep />,
      icon: <TruckOutlined />,
    },
    {
      key: "cart-form",
      title: <Typography.Title level={5}>Review</Typography.Title>,
      content: <></>,
      icon: <ShoppingCartOutlined />,
    },
    {
      key: "payment-form",
      title: <Typography.Title level={5}>Payment</Typography.Title>,
      content: <></>,
      icon: <TransactionOutlined />,
    },
  ];

  return (
    <div className=" mx-5 mt-5">
      <Typography.Title level={1} className="w-full text-center">
        Checkout
      </Typography.Title>
      <div className="xs:px-10 mt-10 rounded-3xl border-4 py-10 shadow-xl sm:mx-auto md:px-10 lg:mx-10 lg:px-16">
        <Form form={form} layout="vertical">
          <Steps
            labelPlacement="vertical"
            responsive={false}
            current={current}
            items={steps.map((item) => ({
              key: item.key,
              title: item.title,
              icon: item.icon,
            }))}
          />
          <div className="p-10">{steps[current].content}</div>
          <Flex
            style={{ marginTop: 24, width: "100%" }}
            justify="space-between"
            align="center"
          >
            <Button
              style={{ margin: "0 10px" }}
              onClick={() => prev()}
              disabled={current === 0}
            >
              Previous
            </Button>

            {current < steps.length - 1 && (
              <Button
                type="primary"
                onClick={() => next()}
                style={{ margin: "0 10px" }}
              >
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                type="primary"
                style={{ margin: "0 10px" }}
                onClick={() => message.success("Processing complete!")}
              >
                Done
              </Button>
            )}
          </Flex>
        </Form>
      </div>
    </div>
  );
};

export default Checkout;
