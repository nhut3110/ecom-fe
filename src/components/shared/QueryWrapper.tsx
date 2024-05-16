import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useContext } from "react";
import { NotificationContext } from "../../context/NotificationContext";
import { getLocalStorageValue } from "../../utils";
import { message } from "antd";

type ChildrenType = {
  children: React.ReactElement | React.ReactElement[];
};

const QueryWrapper = ({ children }: ChildrenType) => {
  const handleError = (error: any) => {
    switch (error.response.status) {
      case 400: {
        message.error("Something went wrong");
        break;
      }
      case 401: {
        const accessToken = getLocalStorageValue({
          key: "tokens",
        }).accessToken;

        if (!accessToken) {
          message.error("Unauthorized action. Please check your credentials");
        }
        break;
      }
      case 404: {
        message.error("Wrong URL requested");

        break;
      }
      case 500: {
        message.error("Server error");

        break;
      }
      default:
        // handle other errors here
        break;
    }
  };

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        onError: handleError,
        refetchOnWindowFocus: false, // default: true
        retry: 1,
      },
      mutations: {
        onError: handleError,
        retry: 1,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryWrapper;
