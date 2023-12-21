import { LayoutProps } from "../../models";
import React from "react";
import { Header } from "../common/header";
import { Footer } from "../common/footer";

import { Col, Row } from "antd";
import { Box } from "@mui/material";
export function MainLayout({ children, lightMode }: LayoutProps) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: lightMode ? "var(--dark-1)" : "",
      }}
    >
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
    </Box>
  );
}
