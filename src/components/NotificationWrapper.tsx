import React, { useContext, useState } from "react";
import Notification, { NotificationProps } from "../components/Notification";
import PortalWrapper from "../components/PortalWrapper";
import { NotificationContext } from "../context/NotificationContext";

const NotificationWrapper = () => {
  const { notificationState } = useContext(NotificationContext);
  return (
    <PortalWrapper>
      <div className="fixed top-0 right-0 z-50">
        {notificationState.notificationList.map(
          (notification: NotificationProps, index) => (
            <Notification
              id={notification.id}
              isOpen={notification.isOpen}
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
