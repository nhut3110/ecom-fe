import React from "react";
import PortalWrapper from "./PortalWrapper";
import { gifURLLoading } from "../constants";

const GifLoading = (): React.ReactElement => {
  return (
    <PortalWrapper>
      <div className="fixed top-0 z-40 flex h-screen w-full items-center justify-center bg-white bg-opacity-50">
        <img src={gifURLLoading} alt="loading" className="w-52 rounded-full" />
      </div>
    </PortalWrapper>
  );
};

export default GifLoading;
