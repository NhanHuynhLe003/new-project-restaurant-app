import { CheckOutlined } from "@ant-design/icons";
import { Box, Stack } from "@mui/material";
import { Typography, Button } from "@mui/material";
import * as React from "react";

export interface FoodTitleSectionProps {
  width: string;
  title: string;
  desc: string;
  shortTitle: string;
  listCheck: string[];
}

export default function FoodTitleSection({
  width,
  shortTitle,
  title,
  desc,
  listCheck,
}: FoodTitleSectionProps) {
  const headTitle = title.split(" ")[0];
  const tailTitle = title.split(" ").splice(1).join(" ");
  return (
    <Box sx={{ width: width }}>
      <Typography sx={{ color: "var(--primary-color)" }} variant="h5">
        {shortTitle}
      </Typography>
      <Typography variant="h3" color={"var(--white)"}>
        <Box component={"span"} color={"var(--primary-color)"}>
          {headTitle}
        </Box>{" "}
        {tailTitle}
      </Typography>
      <br />
      <Typography component={"p"} color={"var(--white)"}>
        {desc}
      </Typography>
      <br />

      <Box component={"ul"} paddingLeft={"0"}>
        {listCheck.map((content) => (
          <Stack key={content} component={"li"} direction={"row"} gap={"1rem"}>
            <CheckOutlined
              style={{
                fontSize: "1.5rem",
                color: "#fff",
                marginBottom: "1rem",
              }}
            />
            <Typography component={"p"} color={"#fff"}>
              {" "}
              {content}
            </Typography>
          </Stack>
        ))}
      </Box>
      <Button
        sx={{
          backgroundColor: "var(--primary-color)",
          borderRadius: 5,
          padding: "0.5rem 1.5rem",
          color: "var(--white)",
          fontWeight: "600",
          ":hover": {
            color: "var(--primary-color)",
            background: "var(--white)",
          },
        }}
      >
        See Menu
      </Button>
    </Box>
  );
}
