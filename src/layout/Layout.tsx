import React, { ReactElement } from "react";
import Footer from "../components/Footer";
import MailSubscription from "../components/MailSubscription";
import NavBar from "../components/NavBar";
type ChildrenType = {
  children: React.ReactElement | React.ReactElement[] | undefined;
};

const Layout = ({ children }: ChildrenType): ReactElement => {
  return (
    <div>
      <NavBar />
      <main>{children}</main>
      <MailSubscription />
      <Footer />
    </div>
  );
};

export default Layout;
