import React from "react";
import NavBar from "./navbar";
import { Box } from "@mui/material";
import { Button } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
export interface HeaderProps {}

export function Header(props: HeaderProps) {
  return (
    <Box
      component={"header"}
      width={"100%"}
      position={"fixed"}
      top={0}
      left={0}
      right={0}
      zIndex={100}
    >
      <NavBar />
    </Box>
  );
}
