import * as React from "react";
import styles from "../../styles/menu/foodLatestItem.module.css";
import Image from "next/image";
import { ConfigProvider, Rate, Typography } from "antd";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
export interface FoodLatestItemProps {
  img: string;
  name: string;
  rating: number;
  price?: number;
  discount?: number;
  id: string;
  type: string;
}

export default function FoodLatestItem({
  img,
  name,
  price,
  rating,
  discount,
  id,
  type,
}: FoodLatestItemProps) {
  const router = useRouter();
  return (
    <div
      className={styles.productItemLatest}
      onClick={() => router.push(`/shop/${id}-type=${type}`)}
    >
      <div className={styles.imgContainer} style={{ width: "8rem" }}>
        <Image
          width={0}
          height={0}
          style={{ width: "100%", height: "auto" }}
          alt={`food_img_latest_${name}`}
          src={img}
        />
      </div>
      <div className={styles.foodDesc}>
        <h5 style={{ fontSize: "1rem", margin: "0" }}>{name}</h5>
        <div className={styles.ratings}>
          <Rate
            defaultValue={rating}
            allowHalf
            style={{ fontSize: "1rem", color: "var(--primary-color)" }}
          ></Rate>
        </div>
        <Typography.Text style={{ display: price ? "block" : "none" }}>
          <span className={styles.price}>
            {discount && price
              ? Number(price) * (1 - discount / 100)
              : Number(price)}
          </span>
        </Typography.Text>
      </div>
    </div>
  );
}
