import * as React from "react";
import Image from "next/image";
import { Button, Col, ConfigProvider, Row } from "antd";
import imageLoader from "../../utils/loader";
import styles from "../../styles/menu/foodItem.module.css";
import clsx from "clsx";
import {
  HeartOutlined,
  ShoppingOutlined,
  StarFilled,
  StarOutlined,
} from "@ant-design/icons";
import { FoodModel } from "../../models";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useRouter } from "next/router";
import { Box, Stack } from "@mui/material";
import { productCart } from "../../models/cart";
export interface FoodItemProps {
  vertical?: boolean;
  horizontal?: boolean;
  handleAddToCart?: (product: productCart) => {};
}

export default function FoodItem({
  handleAddToCart,
  vertical,
  horizontal,
  ...props
}: FoodModel & FoodItemProps) {
  // const [isHide, setHide] = React.useState(true);
  const router = useRouter();

  let ratingList = [];
  let tempRating = props.food_rating;
  for (let i = 0; i < 5; i++) {
    if (i < props.food_rating) {
      if (tempRating === 0.5) {
        ratingList.push(
          <FaStarHalfAlt key={`rating_${i}`} color="#ffc107" fontSize="20px" />
        );
        tempRating -= 0.5;
        continue;
      }
      ratingList.push(
        <FaStar key={`rating_${i}`} color="#ffc107" fontSize="20px" />
      );
    } else {
      ratingList.push(
        <FaRegStar key={`rating_${i}`} color="#ffc107" fontSize="20px" />
      );
    }
    tempRating -= 1;
  }

  function handleClickViewDetail(url: string) {
    router.push(url);
  }
  return (
    <div className={styles.cardContainer}>
      <Box
        sx={{
          display: props.food_discount ? "flex" : "none",
          alignSelf: "flex-start",
          background: "red",
          color: "#fff",
          fontWeight: "600",
          position: "absolute",
          top: "-8px",
          left: "-1.5rem",
          transform: "rotate(-45deg)",
          padding: "1rem 1.25rem 0.25rem 1.25rem",
          textAlign: "center",
        }}
      >
        {props.food_discount}%
      </Box>
      <div className={clsx(styles.cardControl)}>
        <ConfigProvider
          theme={{
            components: {
              Button: {
                colorPrimaryHover: "var(--primary-color)",
              },
            },
          }}
        >
          <Button
            className={clsx(styles.shopBtn)}
            type="primary"
            onClick={() =>
              handleAddToCart &&
              handleAddToCart({
                productId: props.food_id,
                productType: props.food_type,
                quantity: 1,
                discounts: [],
              })
            }
          >
            <ShoppingOutlined />
          </Button>
          <Button
            className={clsx(styles.viewDetail)}
            onClick={() =>
              handleClickViewDetail(
                `/shop/${props.food_id}-type=${props.food_type}`
              )
            }
            type="primary"
          >
            Xem Chi Tiết
          </Button>
          <Button className={styles.favorBtn} type="primary">
            <HeartOutlined />
          </Button>
        </ConfigProvider>
      </div>
      <div className={styles.imgContainer}>
        <Image
          src={props.food_img ? props.food_img : "https://placehold.co/312x250"}
          alt="foodImage"
          width={0}
          height={0}
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      </div>
      <Stack textAlign={"center"} gap={"0.25rem"} pt={"1rem"}>
        <Box
          color={"var(--dark-1)"}
          fontWeight={"bold"}
          fontSize={{ md: "20px", sm: "16px" }}
        >
          {props.food_name}
        </Box>
        <Box>{ratingList.map((star) => star)}</Box>
        <div className={clsx(styles.priceInfo)}>
          <div
            className={clsx(styles.price, "Normal-Text-Regular", {
              [styles.hidePrice]: Boolean(!props.food_discount),
            })}
          >
            {props.food_discount
              ? "$" +
                (Number(props.food_price) *
                  (100 - Number(props.food_discount))) /
                  100
              : ""}
          </div>
          <div
            className={clsx(styles.price, "Normal-Text-Regular", {
              [styles.priceDeleted]: Boolean(props.food_discount),
            })}
          >
            ${props.food_price}
          </div>
        </div>
      </Stack>
    </div>
  );
}
