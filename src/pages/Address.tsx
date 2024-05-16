import { times } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useNavigatePage } from "../hooks";
import AddressCard from "../components/Address/AddressCard";
import { AddressType, getAddresses } from "../services";
import EmptyLego from "../components/shared/EmptyLego";
import { Avatar, Button, List, Typography } from "antd";
import { EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { LegoHead } from "../assets/images";

const NUMBER_OF_SKELETONS = 5;

const Address = () => {
  const [addresses, setAddresses] = useState<AddressType[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  const { redirect } = useNavigatePage();

  useEffect(() => {
    const fetchAddresses = async () => {
      setLoading(true);
      const data = await getAddresses();

      setLoading(false);
      setAddresses(data);
    };

    fetchAddresses();
  }, []);

  const renderAddressList = useCallback(() => {
    if (!addresses.length) return <EmptyLego />;

    if (isLoading)
      return times(NUMBER_OF_SKELETONS, (index) => (
        <AddressCard key={index} details={{}} />
      ));

    return (
      <List
        style={{ width: "100%" }}
        itemLayout="vertical"
        pagination={{ pageSize: 10 }}
        size="large"
        dataSource={addresses}
        renderItem={(item) => (
          <List.Item
            extra={[
              <Button
                icon={<EyeOutlined />}
                type="text"
                onClick={() => redirect(`/address/${item.id}`)}
              >
                View
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={item.name}
              avatar={<Avatar src={LegoHead} />}
              description={`${item.email} | ${item.phoneNumber}`}
            />
            {item.address}
          </List.Item>
        )}
      ></List>
    );
  }, [isLoading, addresses]);

  return (
    <div className="mx-auto my-5 w-4/5">
      <div className="flex items-center justify-between">
        <p className="text-xl font-bold">Manage your addresses</p>
        <Button
          icon={<PlusOutlined />}
          className="bg-red-200"
          onClick={() => redirect("/address/add")}
        >
          Add
        </Button>
      </div>
      <hr className="my-2 h-px border-0 bg-gray-200" />
      <div className="mx-auto flex min-h-[20rem] flex-col items-center gap-4 md:w-4/5">
        {renderAddressList()}
      </div>
    </div>
  );
};

export default Address;
