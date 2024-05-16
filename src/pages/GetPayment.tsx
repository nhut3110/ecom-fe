import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Card, Result, Button, Flex, Typography } from "antd";
import {
  SmileOutlined,
  FrownOutlined,
  LoadingOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { authApi } from "../services";
import { LogoTransparent } from "../assets/images";

const GetPayment = () => {
  const [searchParams] = useSearchParams();
  const [success, setSuccess] = useState<boolean | null>(null);
  const [countdown, setCountdown] = useState(10);
  const [hasVerified, setHasVerified] = useState(false);
  const navigate = useNavigate();

  // Extract all query parameters into an object
  const queryParams = Object.fromEntries(searchParams.entries());

  // Function to verify payment
  const verifyIpn = async (params: Record<string, string>) => {
    try {
      // Example of an API request
      await authApi.get("/orders/verify-ipn", { params });
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
    }
  };

  // Countdown timer logic
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      navigate(`/orders/${queryParams["vnp_TxnRef"]}`);
    }
  }, [countdown, navigate]);

  // Verify the payment on component mount
  useEffect(() => {
    // const delayLoading = setTimeout(() => {
    if (!hasVerified) {
      setHasVerified(true);
      verifyIpn(queryParams);
    }
    // }, 2000);
    // return () => clearTimeout(delayLoading);
  }, [queryParams, hasVerified]);

  return (
    <div className="relative flex h-[100vh] w-[100vw] items-center justify-center">
      <div className="container-pattern absolute -z-0" />
      <div className="z-10 h-[500px] w-[400px] rounded-xl border-2 bg-white shadow-2xl">
        <Flex justify="center" align="center" className="h-full w-full">
          {success === null ? (
            <Result
              title="Processing payment..."
              icon={<SyncOutlined spin />}
            />
          ) : success ? (
            <Result
              icon={<SmileOutlined />}
              title="Payment Successful!"
              subTitle={queryParams["vnp_TxnRef"]}
              extra={
                <Flex vertical gap={10}>
                  <Button type="primary" onClick={() => navigate("/orders")}>
                    Back to Orders
                  </Button>
                  <Typography.Text type="secondary">
                    Redirecting in {countdown} seconds...
                  </Typography.Text>
                  <img src={LogoTransparent} className="h-14 object-contain" />
                </Flex>
              }
            />
          ) : (
            <Result
              status="error"
              icon={<FrownOutlined />}
              title="Payment Failed!"
              subTitle={queryParams["vnp_TxnRef"]}
              extra={
                <Flex vertical gap={10}>
                  <Button type="primary" onClick={() => navigate("/orders")}>
                    Back to Orders
                  </Button>
                  <Typography.Text type="secondary">
                    Redirecting in {countdown} seconds...
                  </Typography.Text>
                  <img src={LogoTransparent} className="h-14 object-contain" />
                </Flex>
              }
            />
          )}
        </Flex>
      </div>
    </div>
  );
};

export default GetPayment;
