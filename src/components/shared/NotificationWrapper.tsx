import React, { useContext, useState } from "react";
import Notification, { NotificationType } from "./Notification";
import PortalWrapper from "./PortalWrapper";
import { NotificationContext } from "../../context/NotificationContext";

const NotificationWrapper = () => {
  const { notificationState } = useContext(NotificationContext);
  return (
    <PortalWrapper>
      <div className="fixed right-0 top-0 z-50">
        {notificationState.notificationList.map(
          (notification: NotificationType, index) => (
            <Notification
              id={notification.id}
              open={notification.open}
              content={notification.content}
              type={notification.type}
              key={index}
            />
          )
        )}
      </div>
    </PortalWrapper>
  );
};

export default NotificationWrapper;
