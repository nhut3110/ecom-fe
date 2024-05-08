import React, { ReactElement } from "react";
import { useLocation } from "react-router-dom";
import { Layout as AntdLayout } from "antd";
import Footer from "../components/Layout/Footer";
import MailSubscription from "../components/Layout/MailSubscription";
import NavBar from "../components/Layout/NavBar";
import CartButton from "../components/Cart/CartButton";
import ValidateLoginModal from "../components/shared/ValidateLoginModal";
import { notDisplayCartButton } from "../constants";

type ChildrenType = {
  children: React.ReactElement | React.ReactElement[] | undefined;
};

const { Content: AntdContent } = AntdLayout;

const Layout = ({ children }: ChildrenType): ReactElement => {
  const location = useLocation();
  const isNotDisplayCartButton = notDisplayCartButton.includes(
    location.pathname
  );

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      <ValidateLoginModal />

      <AntdLayout className="bg-white">
        <NavBar />
        <AntdContent>
          {/* children component of layout here */}
          <main className="pt-[68px]">{children}</main>
          {!isNotDisplayCartButton && <CartButton />}
        </AntdContent>
        <Footer />
      </AntdLayout>
    </div>
  );
};

export default Layout;
