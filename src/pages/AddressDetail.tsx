import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigatePage } from "../hooks";
import AddressForm from "../components/Address/AddressForm";
import GifLoading from "../components/shared/GifLoading";
import { AddressType, deleteAddress, getAddress } from "../services";
import { Button, Modal, Typography, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const AddressDetail = () => {
  const [address, setAddress] = useState<AddressType>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const { id } = useParams();

  const { redirect } = useNavigatePage();

  const removeAddress = async () => {
    if (id) {
      try {
        await deleteAddress(id);

        setIsError(false);
        redirect("/address");
        message.success("Deleted address");
      } catch (error) {
        setIsError(true);
        message.error("Unable to delete address");
      } finally {
        setOpenModal(false);
      }
    }
  };

  useEffect(() => {
    const fetchAddress = async () => {
      setLoading(true);
      if (!id) return setLoading(false);

      const data = await getAddress(id);

      setLoading(false);
      setAddress(data);
    };

    fetchAddress();
  }, []);

  return (
    <div className="mx-auto my-5 w-4/5">
      <div className="flex items-center justify-between">
        <p className="text-xl font-bold">Manage your addresses</p>
        <Button
          danger
          onClick={() => setOpenModal(true)}
          icon={<DeleteOutlined />}
        >
          Delete
        </Button>
      </div>
      <hr className="my-2 h-px border-0 bg-gray-200" />
      <div className="mx-auto flex min-h-[20rem] w-full flex-col items-center gap-4 md:w-4/5">
        {isLoading ? <GifLoading /> : <AddressForm details={address} />}
      </div>

      <Modal
        title="Delete address"
        onCancel={() => {
          setOpenModal(false);
        }}
        open={openModal}
        onOk={removeAddress}
        width={400}
      >
        <p>
          Are you sure to delete this address?{" "}
          <Typography.Text italic>
            This action <strong>cannot be undone!</strong>
          </Typography.Text>
        </p>
      </Modal>
    </div>
  );
};

export default AddressDetail;
