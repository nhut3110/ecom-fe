import { FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";
import { Rate, RateProps } from "antd";
import React from "react";

interface RatingStarProps extends RateProps {
  rating: number;
}

const RatingStar = (props: RatingStarProps): React.ReactElement => {
  const { rating } = props;
  const solidStars = Math.round(rating);

  const customIcons: Record<number, React.ReactNode> = {
    1: <FrownOutlined />,
    2: <FrownOutlined />,
    3: <MehOutlined />,
    4: <SmileOutlined />,
    5: <SmileOutlined />,
  };

  return (
    <Rate
      {...props}
      allowHalf
      value={solidStars}
      character={({ index = 0 }) => customIcons[index + 1]}
    />
  );
};

export default RatingStar;
