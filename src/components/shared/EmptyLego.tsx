import { Empty, EmptyProps, Typography } from "antd";
import { Comedian, Deadpool, Waiter } from "../../assets/images";
import { useMemo } from "react";
import { getRandomInt } from "../../utils";

interface EmptyLegoProps extends EmptyProps {}
interface EmptyData {
  img: string;
  alt: string;
  description: string;
}
const DATA: EmptyData[] = [
  {
    img: Deadpool,
    alt: "deadpool",
    description: "Look like Deadpool stealing everything from there...",
  },
  {
    img: Comedian,
    alt: "comedian",
    description: "Hmmm... It looks so empty here...",
  },
  {
    img: Waiter,
    alt: "waiter",
    description: "Look so empty, wanna add some hotdogs?...",
  },
];

const EmptyLego = (props: EmptyLegoProps) => {
  const EMPTY_DATA: EmptyData = useMemo(
    () => DATA[getRandomInt(DATA.length)],
    []
  );

  return (
    <Empty
      {...props}
      image={
        <img
          src={EMPTY_DATA.img}
          alt={EMPTY_DATA.alt}
          className="mx-auto h-40"
        />
      }
      imageStyle={{ height: "250px" }}
      description={
        <Typography.Text className="text-lg font-semibold">
          {EMPTY_DATA.description}
        </Typography.Text>
      }
    />
  );
};

export default EmptyLego;
