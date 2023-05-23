import {
  BronzeBadge,
  GoldBadge,
  PlatinumBadge,
  SilverBadge,
} from "../assets/images";

const rankThresholds = [
  { rank: "bronze", point: 0, badge: BronzeBadge },
  { rank: "silver", point: 2000, badge: SilverBadge },
  { rank: "gold", point: 10000, badge: GoldBadge },
  { rank: "platinum", point: 20000, badge: PlatinumBadge },
];

const determineCurrentBadge = (shippingPoint: number) => {
  const result = rankThresholds.find(
    ({ point }, index) =>
      shippingPoint >= point &&
      (shippingPoint < rankThresholds[index + 1]?.point || true)
  );
  if (!result) return rankThresholds[0];

  return result;
};

const determineNextBadge = (shippingPoint: number) => {
  const nextRank = rankThresholds.find(({ point }) => shippingPoint < point);

  if (!nextRank) return rankThresholds[0];
  return nextRank;
};

export { determineCurrentBadge, determineNextBadge };
