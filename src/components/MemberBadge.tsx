import React, { useEffect, useMemo, useState } from "react";
import { determineCurrentBadge } from "../utils/determineBadge";
import Tooltip from "./Tooltip";

type MemberBadgeType = {
  shippingPoint?: number;
};

const MemberBadge = ({ shippingPoint = 0 }: MemberBadgeType) => {
  const [badge, setBadge] = useState<string>("");
  const [rank, setRank] = useState<string>("");

  useEffect(() => {
    const result = determineCurrentBadge(shippingPoint);
    if (result) {
      setBadge(result.badge);
      setRank(result.rank);
    }
  }, []);

  return (
    <div className="z-30 rounded-full bg-transparent">
      <Tooltip content="Rank based on your points (1$ = 1 point)">
        <img src={badge} alt="badge" className="h-6 object-cover" />
      </Tooltip>
    </div>
  );
};

export default MemberBadge;
