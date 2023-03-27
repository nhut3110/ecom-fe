import React, { ReactElement } from "react";
import Footer from "../components/Footer";
import MailSubscription from "../components/MailSubscription";
import NavBar from "../components/NavBar";
type ChildrenType = {
  children: React.ReactElement | React.ReactElement[] | undefined;
};

const Layout = ({ children }: ChildrenType): ReactElement => {
  return (
    <div className="flex flex-col h-full">
      <NavBar />
      {/* children component of layout here */}
      <main>{children}</main>
      <MailSubscription />
      <Footer />
    </div>
  );
};

export default Layout;
