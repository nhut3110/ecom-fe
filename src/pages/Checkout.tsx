import React, {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigatePage } from "../hooks";
import {
  AddressType,
  addOrder,
  fetchAddressList,
  fetchCartList,
  fetchUserDiscountList,
  getEstimateAmount,
  useCreateOrder,
} from "../services";
import { CartContext } from "../context/CartContext";
import { NotificationContext } from "../context/NotificationContext";
import { transformCartResponse } from "../utils";
import { PaymentOptions } from "../constants";
import {
  Avatar,
  Button,
  Card,
  Col,
  Empty,
  Flex,
  FloatButton,
  Form,
  Input,
  List,
  Modal,
  Radio,
  Result,
  Row,
  Select,
  Skeleton,
  Space,
  Steps,
  Typography,
  message,
} from "antd";
import { useForm } from "antd/es/form/Form";
import {
  CheckOutlined,
  DeleteOutlined,
  ShoppingCartOutlined,
  SmileOutlined,
  TransactionOutlined,
  TruckOutlined,
} from "@ant-design/icons";
import { Mapbox } from "../components/shared/Mapbox";
import CartContent from "../components/Cart/CartContent";
import { UserDataContext } from "../context/UserDataContext";
import Meta from "antd/es/card/Meta";
import { formatVNDPrice } from "../utils/formatVNDPrice";
import CountUp from "react-countup";
import { useBoolean } from "usehooks-ts";
import { Santa } from "../assets/images";

const Checkout = (): React.ReactElement => {
  const { cart, isLoading: isLoadingCart } = fetchCartList();
  const { addresses, isLoading: isLoadingAddress } = fetchAddressList();

  const confirmModal = useBoolean(false);

  const [address, setAddress] = useState<AddressType>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [paymentType, setPaymentType] = useState<PaymentOptions>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [current, setCurrent] = useState(0);
  const [selectedDiscountId, setSelectedDiscountId] = useState<string | null>(
    null
  );

  const { importCart, cartState } = useContext(CartContext);
  const { userDataState } = useContext(UserDataContext);
  const { notify } = useContext(NotificationContext);

  const {
    userDiscounts,
    refetchUserDiscountList,
    isLoading: isLoadingDiscount,
  } = fetchUserDiscountList({
    active: true,
    isValid: true,
  });

  const { redirect } = useNavigatePage();
  const [form] = useForm();
  const orderMutation = useCreateOrder();

  const handleSubmit = async () => {
    if (!paymentType) return message.error("Please enter a valid payment type");

    const formValues = await form.validateFields();

    orderMutation.mutate(formValues, {
      onSuccess: () => {
        message.success("Successfully placed order!");
        if (paymentType !== PaymentOptions.VNPAY) {
          redirect("/orders");
        }
      },
      onError: () => {
        message.error("An error occurred while placing order!");
      },
    });

    // redirect("/orders");
  };

  useEffect(() => {
    refetchUserDiscountList();
  }, [userDataState?.id]);

  useEffect(() => {
    if (!cartState.cartValue) {
      message.warning("Please have at least one product before checkout!");
      const timeout = setTimeout(() => {
        redirect("/products");
      }, 1500);

      return () => clearTimeout(timeout);
    }
  }, [cartState]);

  useEffect(() => {
    if (!isLoadingCart) importCart(transformCartResponse(cart));
    setIsLoading(isLoadingAddress || isLoadingCart);
  }, [isLoadingAddress, isLoadingCart]);

  const next = useCallback(async () => {
    try {
      // Define the required fields for each step
      const stepRequiredFields = [["addressId"], [], ["paymentType"]];

      // Validate the required fields for the current step
      if (current < stepRequiredFields.length) {
        await form.validateFields(stepRequiredFields[current]);
      }

      setCurrent(current + 1);

      // Scroll to the top of the page after moving to the next step
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      message.error("Please fill in all required fields before proceeding.");
    }
  }, [current, form]);

  const prev = useCallback(() => {
    setCurrent(current - 1);

    // Scroll to the top of the page after moving back
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [current]);

  const clearDiscountSelection = () => {
    form.resetFields(["discountId"]);
    setSelectedDiscountId(null);
  };

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
        <Form.Item
          label="Address"
          name="addressId"
          rules={[{ required: true, message: "Please select an address" }]}
        >
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
                <Mapbox
                  lat={address?.lat as number}
                  lng={address?.lng as number}
                  style={{ width: "100%", height: "300px" }}
                />
              </Col>
            </Row>
          </>
        )}
      </div>
    );
  }, [addresses, address]);

  const PaymentStep = useCallback(() => {
    return (
      <div style={{ width: "100%" }}>
        <Form.Item name="discountId" label="Discounts" className="relative">
          <Radio.Group
            style={{ width: "100%" }}
            value={selectedDiscountId}
            onChange={(e) => setSelectedDiscountId(e.target.value)}
            size="large"
          >
            {userDiscounts?.length ? (
              <Space direction="vertical" style={{ width: "100%" }}>
                {userDiscounts?.map((item, index) => (
                  <Card
                    key={index}
                    style={{
                      width: "100%",
                      minHeight: "100px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                    extra={<Radio value={item.id} />}
                  >
                    <Meta
                      title={
                        <Typography>
                          {item?.discount.discountType === "percentage"
                            ? `Discount ${item?.discount.discountValue}%`
                            : `Discount ${formatVNDPrice(
                                item?.discount.discountValue
                              )}đ`}
                        </Typography>
                      }
                      description={
                        <Space direction="vertical">
                          {item?.discount.discountType === "percentage" && (
                            <p>{`maximum ${formatVNDPrice(
                              item?.discount?.maxDiscountAmount ?? 0
                            )}đ`}</p>
                          )}
                          <p>{`Min amount purchase: ${formatVNDPrice(
                            item?.discount?.minPurchaseAmount ?? 0
                          )}`}</p>
                        </Space>
                      }
                    />
                  </Card>
                ))}
              </Space>
            ) : (
              <Empty
                image={<img src={Santa} alt={"santa"} className="mx-auto" />}
                imageStyle={{ height: "50px" }}
                description={
                  <Typography.Text className="text-lg font-semibold">
                    You don't have any available valid discounts.
                  </Typography.Text>
                }
              />
            )}
          </Radio.Group>
          {selectedDiscountId && (
            <Button
              type="link"
              danger
              icon={<DeleteOutlined />}
              onClick={clearDiscountSelection}
              className="absolute -top-[37px] right-0"
            >
              Clear
            </Button>
          )}
        </Form.Item>

        <Form.Item
          name="paymentType"
          label="Payment Type"
          rules={[{ required: true, message: "Please select a payment type" }]}
        >
          <Radio.Group
            style={{ width: "100%" }}
            size="large"
            onChange={(e) => setPaymentType(e.target.value)}
          >
            <Space direction="vertical" style={{ width: "100%" }}>
              {["cash", "vnpay"].map((type) => (
                <Card
                  key={type}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                  extra={<Radio value={type} />}
                >
                  <Meta title={<Typography>{type.toUpperCase()}</Typography>} />
                </Card>
              ))}
            </Space>
          </Radio.Group>
        </Form.Item>
      </div>
    );
  }, [userDiscounts, form, selectedDiscountId]);

  const ConfirmationStep = useCallback(() => {
    const [estimatedAmount, setEstimatedAmount] = useState<number | null>(null);

    // Fetch estimated amount on first render
    useEffect(() => {
      const fetchEstimate = async () => {
        try {
          const response = await getEstimateAmount(
            selectedDiscountId || undefined
          );
          setEstimatedAmount(response.estimatedAmount);
          form?.setFieldValue("amount", response.estimatedAmount);
        } catch (error) {
          message.error("Error fetching estimated amount.");
        }
      };

      if (current === steps.length - 1) fetchEstimate();
    }, [selectedDiscountId, current]);

    return (
      <div>
        <Form.Item name={"amount"} hidden>
          <Input />
        </Form.Item>
        <Result
          icon={<SmileOutlined />}
          title="Order Information"
          subTitle={
            <>
              {estimatedAmount !== null && (
                <Flex vertical>
                  {/* <Typography.Text strong>Estimated Total:</Typography.Text> */}
                  <Typography.Title className="mb-10">
                    <CountUp end={estimatedAmount} separator="." />đ
                  </Typography.Title>
                </Flex>
              )}
              {paymentType && (
                <>
                  <Typography.Text strong>Payment Method:</Typography.Text>
                  <p>{paymentType.toUpperCase()}</p>
                </>
              )}
              {address && (
                <>
                  {/* <Typography.Text strong>Shipping Address:</Typography.Text> */}
                  <p>{`${address.name}, ${address.address}`}</p>
                  <p>{`${address.phoneNumber}, ${address.email}`}</p>
                </>
              )}
            </>
          }
        />
      </div>
    );
  }, [address, paymentType, selectedDiscountId, current]);

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
      content: (
        <CartContent
          showSummary={false}
          showCheckoutButton={false}
          showCountUpTotal
        />
      ),
      icon: <ShoppingCartOutlined />,
    },
    {
      key: "payment-form",
      title: <Typography.Title level={5}>Payment</Typography.Title>,
      content: <PaymentStep />,
      icon: <TransactionOutlined />,
    },
    {
      key: "confirmation",
      title: <Typography.Title level={5}>Confirmation</Typography.Title>,
      content: <ConfirmationStep />,
      icon: <CheckOutlined />,
    },
  ];

  return (
    <div className=" mx-5 mt-5">
      <FloatButton.BackTop visibilityHeight={500} />
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
          <div className="p-10">
            {steps.map((step, index) => (
              <div
                className={`${index === current ? "block" : "hidden"}`}
                key={index}
              >
                {step.content}
              </div>
            ))}
          </div>
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
                onClick={() => confirmModal.setTrue()}
              >
                Order
              </Button>
            )}
          </Flex>
        </Form>
      </div>
      <Modal
        title="Place an order"
        width={400}
        open={confirmModal.value}
        onCancel={() => confirmModal.setFalse()}
        onOk={handleSubmit}
        okText="Confirm"
      >
        <Typography.Text>
          By click on <strong>Confirm</strong> button, an order will be placed
          but you can cancel it before completing your payment!
        </Typography.Text>
      </Modal>
    </div>
  );
};

export default Checkout;
