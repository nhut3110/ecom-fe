import React, { useEffect, useState } from "react";
import Tooltip from "./Tooltip";
import { determineCurrentBadge } from "../utils/determineBadge";

type MemberBadgeType = {
  shippingPoint: number;
};

const MemberBadge = ({
  shippingPoint = 0,
}: MemberBadgeType): React.ReactElement => {
  const [badge, setBadge] = useState<string>("");

  useEffect(() => {
    const result = determineCurrentBadge(shippingPoint);
    if (result) {
      setBadge(result.badge);
    }
  }, [shippingPoint]);

  return (
    <div className="z-30 rounded-full bg-transparent">
      <Tooltip content="Rank based on your points (1$ = 1 point)">
        <img src={badge} alt="badge" className="h-6 object-cover" />
      </Tooltip>
    </div>
  );
};

export default MemberBadge;
