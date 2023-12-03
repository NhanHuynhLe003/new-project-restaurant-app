import * as React from "react";
import styles from "../../styles/menu/foodLatestItem.module.css";
import Image from "next/image";
import { Typography } from "antd";
import { StarFilled, StarOutlined } from "@ant-design/icons";
export interface FoodLatestItemProps {}

export default function FoodLatestItem(props: FoodLatestItemProps) {
  return (
    <div className={styles.productItemLatest}>
      <div className={styles.imgContainer}>
        <Image
          width={72}
          height={64}
          alt="food_img_latest"
          src="https://images.unsplash.com/photo-1484723091739-30a097e8f929?q=80&w=72&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </div>
      <div className={styles.foodDesc}>
        <Typography.Text>Pizza</Typography.Text>
        <div className={styles.ratings}>
          <StarFilled />
          <StarFilled />
          <StarFilled />
          <StarOutlined />
          <StarOutlined />
        </div>
        <Typography.Text>
          $<span className={styles.price}>35.00</span>
        </Typography.Text>
      </div>
    </div>
  );
}
