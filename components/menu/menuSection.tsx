import { Stack, Typography } from "@mui/material";
import Image, { StaticImageData } from "next/image";
import * as React from "react";

export interface foodMenuInSection {
  name: string;
  description?: string;
  price: number;

  gredients?: string[];
}
export interface MenuSectionProps {
  imgSection: string | StaticImageData;
  isImgLeft: boolean;
  titleSection: string;
  listMenu: foodMenuInSection[];
}

export default function MenuSection(props: MenuSectionProps) {
  return (
    <Stack direction={props.isImgLeft ? "row" : "row-reverse"} gap={"10%"}>
      <Stack width={"40%"}>
        <Image
          width={0}
          height={0}
          alt={"image-" + props.titleSection}
          loading="lazy"
          src={props.imgSection}
          style={{ width: "100%", height: "auto" }}
        ></Image>
      </Stack>
      <Stack width={"50%"}>
        <Typography component={"h2"} variant="h3" fontWeight={"bold"}>
          {props.titleSection}
        </Typography>
        <br />
        {props.listMenu.map((item, index) => {
          return (
            <Stack
              my={"0.5rem"}
              key={index}
              direction={"row"}
              justifyContent={"space-between"}
              sx={{
                borderBottom: "1px solid var(--gray-6)",
                paddingBottom: "1rem",
              }}
            >
              <Stack direction={"column"}>
                <Typography
                  component={"h3"}
                  variant="h5"
                  style={{ fontWeight: 600 }}
                >
                  {item.name}
                </Typography>
                <p style={{ margin: "0  0 0.25rem 0", fontSize: "1rem" }}>
                  {item.gredients?.join(", ")}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.8rem",
                    color: "var(--gray-4)",
                  }}
                >
                  {item.description}
                </p>
              </Stack>
              <Stack direction={"column"}>
                <p
                  style={{
                    margin: 0,
                    fontSize: "1.5rem",
                    fontWeight: "600",
                    color: "var(--primary-color)",
                  }}
                >
                  {item.price}₫
                </p>
              </Stack>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
}
