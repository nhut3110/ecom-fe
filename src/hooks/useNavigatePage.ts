import { useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useNavigatePage = () => {
  const navigate = useNavigate();

  const redirect = useCallback(
    (path: string) => {
      navigate(path);
    },
    [navigate]
  );

  return { redirect };
};
