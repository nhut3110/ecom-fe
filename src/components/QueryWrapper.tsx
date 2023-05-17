import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useContext } from "react";
import { NotificationContext } from "../context/NotificationContext";
import { getLocalStorageValue } from "../utils/localStorage";

type ChildrenType = {
  children: React.ReactElement | React.ReactElement[];
};

const QueryWrapper = ({ children }: ChildrenType) => {
  const handleError = (error: any) => {
    switch (error.response.status) {
      case 400: {
        notify({
          content: "Bad request or wrong input value",
          type: "error",
          open: true,
          id: crypto.randomUUID(),
        });
        break;
      }
      case 401: {
        const accessToken = getLocalStorageValue({
          key: "tokens",
        }).accessToken;

        if (!accessToken) {
          notify({
            content: "Unauthorized action. Please check your credentials",
            type: "error",
            open: true,
            id: crypto.randomUUID(),
          });
        }
        break;
      }
      case 404: {
        notify({
          content: "Wrong URL requested",
          type: "error",
          open: true,
          id: crypto.randomUUID(),
        });
        break;
      }
      case 500: {
        notify({
          content: "Server error",
          type: "error",
          open: true,
          id: crypto.randomUUID(),
        });
        break;
      }
      default:
        // handle other errors here
        break;
    }
  };

  const { notify } = useContext(NotificationContext);
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        onError: handleError,
      },
      mutations: {
        onError: handleError,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryWrapper;
