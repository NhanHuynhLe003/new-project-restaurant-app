import * as React from "react";
import { MainLayout } from "../components/layouts/main";
import { Box } from "@mui/material";

export interface NotFoundPageProps {}

export default function NotFoundPage(props: NotFoundPageProps) {
  return (
    <MainLayout>
      <Box minHeight={"100vh"}>404</Box>
    </MainLayout>
  );
}
