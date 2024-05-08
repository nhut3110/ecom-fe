import Skeleton from "react-loading-skeleton";
import { useEffect, useState } from "react";
import { AddressCardType } from "../../constants";
import { motion } from "framer-motion";

type AddressCardProps = {
  details: AddressCardType;
  onClick?: () => void;
};

const AddressCard = ({ details, onClick }: AddressCardProps) => {
  const { address: fullAddress, name, phoneNumber: phone } = details;

  const [city, setCity] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    if (fullAddress) {
      const addressParts = fullAddress?.split(",");

      const houseAddressPart = addressParts.slice(0, -2);
      const cityPart = addressParts.slice(-2);

      setAddress(houseAddressPart.join(",").trim());
      setCity(cityPart.join(",").trim());
    }
  }, [fullAddress]);

  return (
    <motion.div
      className="my-5 flex h-24 w-full cursor-pointer flex-col rounded-lg border-2 p-3"
      onClick={() => onClick?.()}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.5 },
      }}
      whileTap={{ scale: 0.9 }}
    >
      <div className="flex w-full items-center gap-1">
        <p className="min-w-[5rem] truncate font-semibold">
          {name || <Skeleton />}
        </p>
        <p>|</p>
        <p className="min-w-[5rem] truncate text-right text-gray-500">
          {phone || <Skeleton />}
        </p>
      </div>

      <p className="w-full truncate text-sm text-gray-500 md:text-base lg:w-1/2">
        {address || <Skeleton count={1} />}
      </p>

      <p className="w-full truncate text-sm text-gray-500 md:text-base lg:w-1/2">
        {city || <Skeleton count={1} />}
      </p>
    </motion.div>
  );
};

export default AddressCard;
