import * as React from "react";

export interface FeedBackProps {
  avatar: StaticImageData | string;
  name: string;
  comment: string;
  rating: number;
}

import { StarFilled, StarOutlined } from "@ant-design/icons";
import Image, { StaticImageData } from "next/image";
import { Stack } from "@mui/material";
import { Rate } from "antd";
import { translate } from "@aws-amplify/ui";

export default function FeedBack({
  comment,
  name,
  rating,
  avatar,
}: FeedBackProps) {
  return (
    <Stack
      direction={"column"}
      style={{ backgroundColor: "#fff", margin: "2rem 0" }}
      textAlign={"center"}
    >
      <Image
        width={0}
        height={0}
        style={{
          width: "5rem",
          height: "5rem",
          borderRadius: "50%",
          position: "relative",
          top: "-2rem",
          left: "50%",
          transform: "translateX(-50%)",
        }}
        src={avatar}
        alt={`avatar-user-${name}`}
      ></Image>

      <p>{comment}</p>
      <br />
      <br />
      <Rate allowHalf defaultValue={rating}></Rate>
      <br />
      <br />
      <h5>{name}</h5>
    </Stack>
  );
}
