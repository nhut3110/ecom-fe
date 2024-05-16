import React, { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../context/UserDataContext";
import {
  claimDiscount,
  fetchDiscountList,
  fetchUserDiscountList,
} from "../services/discount.api";
import {
  Avatar,
  Button,
  Divider,
  Flex,
  List,
  Modal,
  QRCode,
  Select,
  Space,
  Tag,
  Typography,
  message,
} from "antd";
import { CameraOutlined, DownloadOutlined } from "@ant-design/icons";
import * as dayjs from "dayjs";
import { Santa } from "../assets/images";
import { formatDate } from "../utils";
import { useBoolean } from "usehooks-ts";
import { Scanner } from "@yudiel/react-qr-scanner";

const Discount = () => {
  const cameraModal = useBoolean(false);
  const claimModal = useBoolean(false);
  const [scannedData, setScannedData] = useState<any>();
  const { userDataState } = useContext(UserDataContext);
  const {
    discounts,
    isLoading: isLoadingDiscounts,
    refetchDiscountList,
  } = fetchDiscountList({
    params: { userId: userDataState?.id },
    enabled: !!userDataState?.id,
  });

  const { userDiscounts, refetchUserDiscountList } = fetchUserDiscountList({});

  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );
      setDevices(videoDevices);
      if (videoDevices.length > 0) {
        setSelectedDeviceId(videoDevices[0].deviceId);
      }
    });
  }, []);

  useEffect(() => {
    refetchDiscountList();
    refetchUserDiscountList();
  }, [userDataState?.id]);

  const handleScanResult = (text: string, result: any) => {
    try {
      const parsedData = JSON.parse(text);
      setScannedData(parsedData);
      setIsScanning(false);
      claimModal.setTrue();
    } catch (error) {
      message.error("Invalid QR Code");
    }
  };

  const handleClaimDiscount = async () => {
    if (scannedData) {
      try {
        await claimDiscount(scannedData.id);
        message.success("Discount claimed successfully!");
        cameraModal.setFalse();
        refetchDiscountList();
        refetchUserDiscountList();
      } catch (error) {
        message.error("Failed to claim discount");
      }
    }
    claimModal.setFalse();
    cameraModal.setTrue();
  };

  return (
    <div className="mx-auto my-5 w-4/5">
      <Modal
        className="sm:w-20 md:w-28 lg:w-36"
        open={cameraModal.value}
        title="Scan Discount QR Code"
        footer={
          scannedData ? (
            <Space>
              <Button
                onClick={() => {
                  setIsScanning(true);
                  setScannedData(undefined);
                }}
                type="default"
              >
                Cancel
              </Button>
              <Button onClick={handleClaimDiscount} className="bg-red-300">
                Claim Discount
              </Button>
            </Space>
          ) : null
        }
        onCancel={() => {
          cameraModal.setFalse();
          setIsScanning(false); // Ensure scanner is stopped when modal is closed
        }}
      >
        {isScanning && (
          <Space direction="vertical" style={{ width: "100%" }}>
            <Select
              value={selectedDeviceId}
              style={{ width: "100%", marginBottom: "10px" }}
              onChange={setSelectedDeviceId}
            >
              {devices.map((device) => (
                <Select.Option key={device.deviceId} value={device.deviceId}>
                  {device.label || `Camera ${device.deviceId}`}
                </Select.Option>
              ))}
            </Select>
            <Scanner
              onResult={handleScanResult}
              onError={(error) => console.error(error)}
              enabled={cameraModal.value || !scannedData}
              options={{
                delayBetweenScanSuccess: 1000,
                delayBetweenScanAttempts: 1000,
                deviceId: selectedDeviceId,
              }}
            />
          </Space>
        )}
        {scannedData && (
          <div className="container mx-auto my-5">
            <div className="relative rounded-lg bg-gradient-to-br from-yellow-300 to-red-300 px-20 py-10 text-center text-white shadow-md">
              <img src={Santa} className="mx-auto mb-4 w-20 rounded-lg" />
              <div className="mb-6 flex items-center justify-center space-x-2">
                <span
                  id="cpnCode"
                  className="lg:text-xxl rounded-l border border-dashed px-4 py-2 font-bold text-white sm:text-lg md:text-xl"
                >
                  {scannedData?.code}
                </span>
              </div>

              <div className="absolute left-0 top-1/2 -ml-6 h-12 w-12 -translate-y-1/2 transform rounded-full bg-white"></div>
              <div className="absolute right-0 top-1/2 -mr-6 h-12 w-12 -translate-y-1/2 transform rounded-full bg-white"></div>
            </div>
          </div>
        )}
      </Modal>

      <Flex align="center" justify="space-between">
        <p className="text-xl font-bold">My saved discounts</p>
        <Button
          icon={<CameraOutlined />}
          type="text"
          size="large"
          className="font-semibold"
          onClick={() => {
            setIsScanning(true); // Start scanning when opening the modal
            cameraModal.setTrue();
          }}
        />
      </Flex>

      <hr className="my-2 h-px border-0 bg-gray-200" />
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          pageSize: 5,
        }}
        dataSource={userDiscounts}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            actions={[
              <Tag
                color={
                  dayjs(item?.discount.endDate).isAfter(dayjs())
                    ? "gold"
                    : "gray"
                }
                className="px-5 py-1 text-base font-semibold"
              >
                {dayjs(item?.discount.endDate).isAfter(dayjs())
                  ? "Active"
                  : "Expired"}
              </Tag>,
            ]}
            extra={
              <Flex vertical justify="center" align="center">
                <QRCode
                  value={JSON.stringify({
                    id: item?.discount?.id,
                    code: item?.discount.code,
                  })}
                />
                <Typography.Text type="secondary">
                  {item?.discount.code}
                </Typography.Text>
              </Flex>
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={Santa} />}
              title={
                <Typography>
                  {item?.discount.discountType === "percentage"
                    ? `Discount ${item?.discount.discountValue}%, maximum ${item?.discount?.maxDiscountAmount}đ`
                    : `Discount ${item?.discount.discountValue}đ`}
                </Typography>
              }
              description={`Min amount purchase: $${item?.discount.minPurchaseAmount}`}
            />
            {
              <Flex vertical>
                <Typography.Title level={5}>
                  {item?.discount.description}
                </Typography.Title>
                <Typography.Text>{`${formatDate(
                  item?.discount.startDate
                )} - ${formatDate(item?.discount.endDate)}`}</Typography.Text>
              </Flex>
            }
          </List.Item>
        )}
      />
      <Divider />
      <p className="text-xl font-bold">Check available discounts</p>
      <hr className="my-2 h-px border-0 bg-gray-200" />
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          pageSize: 5,
        }}
        dataSource={discounts}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            actions={[
              <Button
                icon={<DownloadOutlined />}
                disabled={!item.active || dayjs(item.endDate).isBefore(dayjs())}
                onClick={() => claimDiscount(item.id)}
                className="bg-red-100 font-semibold"
              >
                {dayjs(item.endDate).isAfter(dayjs())
                  ? "Claim discount"
                  : "Expired"}
              </Button>,
            ]}
            extra={
              <Flex vertical justify="center" align="center">
                <QRCode
                  value={JSON.stringify({
                    id: item.id,
                    code: item.code,
                  })}
                />
                <Typography.Text type="secondary">{item.code}</Typography.Text>
              </Flex>
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={Santa} />}
              title={
                <Typography>
                  {item.discountType === "percentage"
                    ? `Discount ${item.discountValue}%, maximum $${item?.maxDiscountAmount}`
                    : `Discount $${item.discountValue}`}
                </Typography>
              }
              description={`Min amount purchase: $${item.minPurchaseAmount}`}
            />
            {
              <Flex vertical>
                <Typography.Title level={5}>
                  {item.description}
                </Typography.Title>
                <Typography.Text>{`${formatDate(item.startDate)} - ${formatDate(
                  item.endDate
                )}`}</Typography.Text>
              </Flex>
            }
          </List.Item>
        )}
      />
    </div>
  );
};

export default Discount;
