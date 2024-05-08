import { Cycle, motion } from "framer-motion";
import Cards from "react-credit-cards-2";
import { useState } from "react";
import GifLoading from "../shared/GifLoading";
import Modal from "../shared/Modal";
import { PaymentType, deletePayment } from "../../services";
import { TrashIcon } from "../../assets/icons";

type PaymentCardProps = {
  details: PaymentType;
  onTrigger?: Cycle;
};

const PaymentCard = ({ details, onTrigger }: PaymentCardProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const removeCard = async () => {
    setIsLoading(true);
    await deletePayment(details.id);

    setIsLoading(false);
    onTrigger?.();
  };

  return (
    <div className="relative">
      {isLoading && <GifLoading />}
      <Cards
        cvc={details.cvc}
        expiry={details.expiry}
        name={details.cardOwner}
        number={details.cardNumber}
      />
      <motion.img
        src={TrashIcon}
        alt="delete"
        className="absolute -right-2 -top-2 h-7 w-7 rounded-full bg-white p-1 shadow-lg hover:bg-gray-300"
        whileHover={{ scale: 1.1 }}
        onClick={() => setOpenModal(true)}
      />

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={removeCard}
      >
        <p>Do you want to remove this card?</p>
      </Modal>
    </div>
  );
};

export default PaymentCard;
