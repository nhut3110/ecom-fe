import { times } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useNavigatePage } from "../hooks";
import SmallButton from "../components/shared/SmallButton";
import PaymentCard from "../components/Payment/PaymentCard";
import { PaymentType, getPaymentList } from "../services";
import { useCycle } from "framer-motion";
import EmptyLego from "../components/shared/EmptyLego";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const NUMBER_OF_SKELETONS = 5;

const emptyCreditCard = {
  id: "",
  cardNumber: "",
  cardOwner: "",
  cvc: "",
  expiry: "",
};

const Payment = () => {
  const [paymentList, setPaymentList] = useState<PaymentType[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isRemove, setIsRemove] = useCycle(false, true);

  const { redirect } = useNavigatePage();

  useEffect(() => {
    const fetchPaymentList = async () => {
      setLoading(true);
      const data = await getPaymentList();

      setLoading(false);
      setPaymentList(data);
    };

    fetchPaymentList();
  }, [isRemove]);

  const renderPaymentList = useCallback(() => {
    if (isLoading)
      return times(NUMBER_OF_SKELETONS, (index) => (
        <PaymentCard key={index} details={emptyCreditCard} />
      ));

    return paymentList.map((payment) => (
      <PaymentCard details={payment} key={payment.id} onTrigger={setIsRemove} />
    ));
  }, [isLoading, paymentList]);

  return (
    <div className="mx-auto my-5 w-4/5">
      <div className="flex items-center justify-between">
        <p className="text-xl font-bold">Manage your cards</p>
        <Button
          icon={<PlusOutlined />}
          className="bg-red-200"
          onClick={() => redirect("/payment/add")}
        >
          Add
        </Button>
      </div>
      <hr className="my-2 h-px border-0 bg-gray-200" />
      {!paymentList.length ? (
        <EmptyLego />
      ) : (
        <div className="mx-auto mt-5 grid w-auto grid-cols-1 justify-items-center gap-x-5 gap-y-10 md:w-4/5 lg:grid-cols-2 xl:grid-cols-fluid">
          {renderPaymentList()}
        </div>
      )}
    </div>
  );
};

export default Payment;
