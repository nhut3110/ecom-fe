import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { motion } from "framer-motion";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigatePage } from "../../hooks";
import GifLoading from "../shared/GifLoading";
import { AddressType, InformationType } from "../../context/FormContext";
import { NotificationContext } from "../../context/NotificationContext";
import { AddressCardType, defaultLocation } from "../../constants";
import { addAddress, updateAddress } from "../../services";
import "react-loading-skeleton/dist/skeleton.css";
import { AutoComplete, Button, Form, Input, Modal, message } from "antd";
import { CheckOutlined, LeftOutlined } from "@ant-design/icons";
import { Mapbox } from "../shared/Mapbox";

type AddressModalProps = {
  details?: AddressCardType;
};

type LocationType = {
  lat: number;
  lng: number;
};

const DEBOUNCE_TIME = 500;

const AddressForm = ({ details }: AddressModalProps) => {
  const center = {
    lat: details?.lat || defaultLocation.lat,
    lng: details?.lng || defaultLocation.lng,
  };

  const [form] = Form.useForm();
  const [location, setLocation] = useState<LocationType>(center);
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const { notify } = useContext(NotificationContext);

  const { redirect } = useNavigatePage();

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: DEBOUNCE_TIME,
  });

  const update = async (id: string, data: InformationType & AddressType) => {
    if (!location.lat || !location.lng) {
      message.error("Not found location");
      form.setFieldValue("address", "");
      setIsLoading(false);
      return;
    }
    try {
      await updateAddress(id, {
        ...data,
        ...location,
      });

      setIsError(false);
      redirect("/address");
      message.success("Successfully updated address");
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const add = async (data: InformationType & AddressType) => {
    if (!location.lat || !location.lng) {
      message.error("Not found location");
      form.setFieldValue("address", "");
      setIsLoading(false);
      return;
    }
    try {
      await addAddress({ ...data, ...location });

      setIsError(false);
      redirect("/address");
      message.success("Successfully created address");
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitForm = useCallback(async () => {
    try {
      const values = await form.validateFields();
      details?.id ? update(details.id, values) : add(values);
      console.log(values);
    } catch (error) {
      message.error("An error occurred while creating address");
    }

    setOpenModal(false);
  }, [isError, details, location]);

  const handleSelect = async (value: string) => {
    setValue(value, false);
    clearSuggestions();

    const results = await getGeocode({ address: value });
    const { lat, lng } = getLatLng(results[0]);
    setLocation({ lat, lng });
    form.setFieldsValue({ address: value });
  };

  useEffect(() => {
    if (details) {
      form.setFieldsValue(details);
      setValue(details.address || "", false);
    }
  }, [details]);

  const addressSuggestions = data.map((suggestion) => ({
    value: suggestion.description,
  }));

  return (
    <div className="h-full w-full">
      {isLoading && <GifLoading />}
      <Form form={form} onFinish={onSubmitForm} layout="vertical">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="my-7 flex w-full flex-col justify-center gap-5"
        >
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true }]}
          >
            <AutoComplete
              options={addressSuggestions}
              value={value}
              onChange={(val) => setValue(val)}
              onSelect={handleSelect}
              disabled={!ready}
            >
              <Input />
            </AutoComplete>
          </Form.Item>

          <div className="mb-2 w-full rounded-lg pt-2">
            <Mapbox
              lat={location.lat}
              lng={location.lng}
              style={{ height: "400px" }}
              zoom={17}
            />
          </div>
        </motion.div>
      </Form>
      <div className="mt-5 flex justify-between">
        <Button icon={<LeftOutlined />} onClick={() => redirect("/address")}>
          Back
        </Button>
        <Button
          type="primary"
          icon={<CheckOutlined />}
          onClick={() => setOpenModal(true)}
        >
          Confirm
        </Button>
      </div>

      <Modal
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onOk={onSubmitForm}
        title="Confirm adding address"
      >
        <p>Do you want to confirm your changes?</p>
      </Modal>
    </div>
  );
};

export default AddressForm;
