import { LayoutProps } from "../../models";
import React from "react";
import { Header } from "../common/header";
import { Footer } from "../common/footer";

import { Col, Row } from "antd";
export function MainLayout({ children }: LayoutProps) {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Header />

      <main
        style={{
          flexGrow: 1,
          paddingTop: "32px",
        }}
      >
        <Row justify={"center"}>
          <Col sm={{ span: 20 }} xs={{ span: 24 }}>
            {children}
          </Col>
        </Row>
      </main>
      <Footer />
    </div>
  );
}
