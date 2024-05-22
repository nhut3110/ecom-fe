import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import QuantityButton from "../shared/QuantityButton";
import { CartContext } from "../../context/CartContext";
import { NotificationContext } from "../../context/NotificationContext";
import {
  CartProduct,
  deleteProductFromCart,
  updateQuantity,
} from "../../services";
import { formatVNDPrice } from "../../utils/formatVNDPrice";
import { Button, Flex, Image, List, Modal, Tag } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { set } from "lodash";

const DEFAULT_QUANTITY_CHANGE = 1; // Only increase or decrease 1 unit in cart page

type ProductCartType = {
  product: CartProduct;
  quantity: number;
};

const trashButtonVariants = {
  hover: {
    scale: 1.2,
  },
  tap: {
    scale: 0.9,
  },
};

const ProductCart = ({
  product,
  quantity,
}: ProductCartType): React.ReactElement => {
  const {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    calculateCartValue,
    cartState,
  } = useContext(CartContext);
  const { notify } = useContext(NotificationContext);

  const [quantities, setQuantities] = useState<number>(quantity);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleIncrement = useCallback(async () => {
    try {
      await updateQuantity(product.id, 1); // Only increase or decrease 1 unit in cart page

      setQuantities((quantities) => quantities + DEFAULT_QUANTITY_CHANGE);
      if (cartState.cartValue) {
        increaseQuantity(DEFAULT_QUANTITY_CHANGE, product);
        calculateCartValue(DEFAULT_QUANTITY_CHANGE, product);
      }
    } catch (error) {
      notify({
        id: crypto.randomUUID(),
        content: "Failed",
        open: true,
        type: "error",
      });
    }
  }, [quantities, product]);

  const [totalPrice] = useMemo(() => {
    const price = (
      (product.price - (product.price * product.discountPercentage) / 100) *
      quantities
    ).toFixed(0);

    return [price];
  }, [quantities]);

  useEffect(() => {
    if (quantities > product.availableQuantity) {
      updateQuantity(product.id, product.availableQuantity - quantities);
      calculateCartValue(product.availableQuantity - quantities, product);
      setQuantities(product.availableQuantity);
    }
  }, []);

  const handleDecrement = useCallback(async () => {
    try {
      await updateQuantity(product.id, -1); // Only increase or decrease 1 unit in cart page

      if (cartState.cartValue) {
        if (quantities - 1 === 0) {
          removeFromCart(product);
        } else {
          setQuantities((quantities) => quantities - DEFAULT_QUANTITY_CHANGE);
          decreaseQuantity(DEFAULT_QUANTITY_CHANGE, product);
        }

        calculateCartValue(-DEFAULT_QUANTITY_CHANGE, product);
      }
    } catch (error) {
      notify({
        id: crypto.randomUUID(),
        content: "Failed",
        open: true,
        type: "error",
      });
    }
  }, [quantities]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleRemove = useCallback(async () => {
    try {
      await deleteProductFromCart(product.id);

      removeFromCart(product);
      calculateCartValue(-quantities, product);
    } catch (error) {
      notify({
        id: crypto.randomUUID(),
        content: "Failed",
        open: true,
        type: "error",
      });
    }
  }, [product, quantities]);

  return (
    <div>
      <List
        pagination={false}
        dataSource={[product]}
        itemLayout="vertical"
        renderItem={(item) => (
          <List.Item
            extra={
              <Image src={product.image} alt={product.title} width={100} />
            }
            actions={[
              <QuantityButton
                quantity={quantities}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
                max={product.availableQuantity}
              />,
              <Button
                danger
                size="small"
                icon={<DeleteOutlined />}
                type="text"
                onClick={() => setShowModal(true)}
              >
                Delete
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={<Link to={`/products/${item.id}`}>{item.title}</Link>}
              description={
                <Flex gap={3} align="center" justify="space-between">
                  <p>{`${formatVNDPrice(Number(totalPrice))}đ`}</p>
                  {!!product?.discountPercentage && (
                    <Tag color="gold">-{product?.discountPercentage}%</Tag>
                  )}
                </Flex>
              }
            />
          </List.Item>
        )}
      />
      <Modal
        title="Remove from cart"
        open={showModal}
        onOk={handleRemove}
        onCancel={handleCloseModal}
        width={400}
        centered
      >
        <p>
          Do you want to delete <strong>{product.title}</strong> from your cart?
        </p>
      </Modal>
    </div>
  );
};

export default ProductCart;
