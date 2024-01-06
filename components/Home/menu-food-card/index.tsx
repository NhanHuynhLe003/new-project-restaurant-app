import { Box, Stack, Typography } from "@mui/material";

import Image, { StaticImageData } from "next/image";
import * as React from "react";

export interface MenuFoodCardProps {
  img: StaticImageData;
  name: string;
  desc?: string;
  price?: number;
  discount?: number;
}

export default function MenuFoodCard({
  img,
  name,
  discount,
  price,
  desc,
}: MenuFoodCardProps) {
  return (
    <Stack direction={"row"} justifyContent={"space-between"} mb={"1rem"}>
      <Box sx={{ width: "20%" }}>
        <Image
          src={img}
          alt={`img-of-${name}`}
          width={0}
          height={0}
          style={{ width: "100%", height: "auto", borderRadius: "4px" }}
        />
      </Box>
      <Box sx={{ width: "75%" }}>
        <Typography
          variant={"h6"}
          fontWeight={"600"}
          sx={{
            display: "-webkit-box",
            overflow: "hidden",
            WebkitLineClamp: "1",
            maxHeight: "1.5em",
            WebkitBoxOrient: "vertical",
            color: "#fff",
          }}
        >
          {name}
        </Typography>
        <Box
          component={"p"}
          sx={{
            margin: "0",
            opacity: "0.6",
            display: "-webkit-box",
            overflow: "hidden",
            WebkitLineClamp: "1",
            maxHeight: "1.5em",
            WebkitBoxOrient: "vertical",
            color: "var(--white)",
          }}
        >
          {desc}
        </Box>

        <Stack
          direction={"row"}
          gap={"1rem"}
          alignItems={"center"}
          marginTop={"0.5rem"}
        >
          <Box
            component={"p"}
            margin={0}
            sx={{
              fontWeight: "600",
              textDecoration: "line-through",
              opacity: "0.8",
              display: discount ? "block" : "none",
              color: "var(--white)",
            }}
          >
            {discount && price ? price.toFixed(1) : ""}$
          </Box>

          <Box
            component={"p"}
            sx={{
              fontWeight: "600",
              color: "var(--primary-color);",
              margin: 0,
              display: price ? "block" : "none",
            }}
          >
            {discount && price
              ? (price * (1 - discount / 100)).toFixed(1)
              : price && price.toFixed(1)}
            $
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
}
