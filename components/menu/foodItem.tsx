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
export interface FoodItemProps {}

export default function FoodItem(props: FoodModel) {
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
    console.log(url);

    router.push(url);
  }
  return (
    <div className={styles.cardContainer}>
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
          <Button className={clsx(styles.shopBtn)} type="primary">
            <ShoppingOutlined />
          </Button>
          <Button
            className={clsx(styles.viewDetail)}
            onClick={() =>
              handleClickViewDetail(
                `/menu/${props.food_id}-type=${props.food_type}`
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
        <Image src={props.food_img} alt="foodImage" width={312} height={267} />
      </div>
      <Row className={clsx(styles.foodNameContainer)}>
        <Col className={clsx(styles.foodName, "Medium-Text-Bold")}>
          {props.food_name}
        </Col>
      </Row>
      <Row justify={"center"}>
        <Col span={100} className={styles.ratings}>
          {ratingList.map((star) => star)}
        </Col>
      </Row>
      <div className={clsx(styles.priceInfo)}>
        <div
          className={clsx(styles.price, "Normal-Text-Regular", {
            [styles.hidePrice]: Boolean(!props.food_discount),
          })}
        >
          {props.food_discount
            ? "$" +
              (Number(props.food_price) * (100 - Number(props.food_discount))) /
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
    </div>
  );
}
