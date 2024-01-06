import { LayoutProps } from "../../models";
import React, { useEffect } from "react";
import { Header } from "../common/header";
import { Footer } from "../common/footer";

import { Col, Row } from "antd";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
export function MainLayout({ children, lightMode }: LayoutProps) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: lightMode ? "var(--dark-2)" : "",
      }}
    >
      <Header />

      <Box
        component={"main"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        minHeight={"100vh"}
        pt={{ xs: "10rem", sm: "6rem" }}
        style={{
          flexGrow: 1,
        }}
      >
        <Row justify={"center"}>
          <Col sm={{ span: 20 }} xs={{ span: 24 }}>
            {children}
          </Col>
        </Row>
      </Box>
      <Footer />
    </Box>
  );
}
