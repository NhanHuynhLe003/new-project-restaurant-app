import { CheckOutlined } from "@ant-design/icons";
import { Box, CircularProgress, Stack } from "@mui/material";
import { Typography, Button } from "@mui/material";
import { useRouter } from "next/router";
import * as React from "react";

export interface FoodTitleSectionProps {
  width: string;
  title: string;
  desc: string;
  shortTitle: string;
  listCheck?: string[];
  hiddenButton?: boolean;
}

export default function FoodTitleSection({
  width,
  shortTitle,
  title,
  desc,
  listCheck = [],
  hiddenButton = false,
}: FoodTitleSectionProps) {
  const headTitle = title.split(" ")[0].slice(0, 2);
  const tailTitle =
    title.split(" ")[0].slice(2) + " " + title.split(" ").splice(1).join(" ");
  const [isLoadingMenu, setIsLoadingMenu] = React.useState(false);
  const router = useRouter();

  function handleSeeMenu() {
    setIsLoadingMenu(true);
    router.push("/menu");
  }

  return (
    <Box width={{ xs: "100%", sm: width }}>
      <Typography sx={{ color: "var(--primary-color)" }} variant="h5">
        {shortTitle}
      </Typography>
      <Typography variant="h3" color={"var(--white)"}>
        <Box component={"span"} color={"var(--primary-color)"}>
          {headTitle}
        </Box>
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
        onClick={handleSeeMenu}
        disabled={isLoadingMenu}
        sx={{
          display: hiddenButton ? "none" : "",
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
        {
          <CircularProgress
            style={{
              width: "1.25rem",
              height: "1.25rem",
              color: "var(--white)",
              marginRight: "0.5rem",
              display: `${isLoadingMenu ? "block" : "none"}`,
            }}
          ></CircularProgress>
        }{" "}
        See Menu
      </Button>
    </Box>
  );
}
