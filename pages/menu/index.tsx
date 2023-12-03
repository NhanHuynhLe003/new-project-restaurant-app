import * as React from "react";
import {
  Row,
  Col,
  Select,
  Pagination,
  Card,
  Input,
  Typography,
  Checkbox,
  Progress,
} from "antd";
export interface MenuPageProps {
  foodListData: FoodModel[];
}
import styles from "../../styles/menu/menu.module.css";

import amplifyConfig from "../../amplifyconfig.json";
import { API, Amplify } from "aws-amplify";
import clsx from "clsx";
import FoodItem from "../../components/menu/foodItem";
import FoodLatestItem from "../../components/menu/foodLatestItem";
import { GetStaticProps, GetStaticPropsContext } from "next";
import { FoodModel } from "../../models";
import { handleConvertObjectDdb } from "../../utils/handleResDataDynamodb";
import Link from "next/link";

const API_GW_NAME = "ag-manage-restaurant-project";
Amplify.configure(amplifyConfig);

const dishes = [
  {
    name: "Spicy seasoned seafood noodles",
    price: "$2.29",
    available: "20 Bowls available",
  },
  {
    name: "Spicy seasoned seafood noodles",
    price: "$2.29",
    available: "20 Bowls available",
  },
  {
    name: "Spicy seasoned seafood noodles",
    price: "$2.29",
    available: "20 Bowls available",
  },
  {
    name: "Spicy seasoned seafood noodles",
    price: "$2.29",
    available: "20 Bowls available",
  },
  {
    name: "Spicy seasoned seafood noodles",
    price: "$2.29",
    available: "20 Bowls available",
  },
  {
    name: "Spicy seasoned seafood noodles",
    price: "$2.29",
    available: "20 Bowls available",
  },
  {
    name: "Spicy seasoned seafood noodles",
    price: "$2.29",
    available: "20 Bowls available",
  },
  {
    name: "Spicy seasoned seafood noodles",
    price: "$2.29",
    available: "20 Bowls available",
  },

  // ... other dishes
];

const food_type_list = [
  "Sandwiches",
  "Burger",
  "Chicken Chup",
  "Drink",
  "Pizza",
  "Sushi",
  "Non Veg",
  "Uncategorized",
];

export default function MenuPage({ foodListData }: MenuPageProps) {
  function handleSearchInput(value: string, event: any) {
    console.log(value);
  }
  function handleGetRange(e: any) {
    console.log(e.target.value);
  }

  const handleChange = (e: any) => {
    console.log(e);
  };
  return (
    <div className={clsx(styles.menuContainer)}>
      <Row>
        <Col span={4}>
          <label className={clsx(styles.label_sort)} htmlFor="sort_by_select">
            Sort By:{" "}
          </label>
          <Select
            id="sort_by_select"
            defaultValue="lucy"
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: "jack", label: "Jack" },
              { value: "lucy", label: "Lucy" },
              { value: "Yiminghe", label: "yiminghe" },
              { value: "disabled", label: "Disabled", disabled: true },
            ]}
          />
        </Col>
        <Col span={4}>
          <label className={clsx(styles.label_sort)} htmlFor="sort_by_select">
            Sort By:{" "}
          </label>
          <Select
            id="sort_by_select"
            defaultValue="lucy"
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: "jack", label: "Jack" },
              { value: "lucy", label: "Lucy" },
              { value: "Yiminghe", label: "yiminghe" },
              { value: "disabled", label: "Disabled", disabled: true },
            ]}
          />
        </Col>
      </Row>
      <br />
      <div className={styles.foodMenuContainer}>
        <div className={styles.menuFood}>
          <Row gutter={[24, 24]}>
            {foodListData ? (
              foodListData.map((dish, index) => (
                <Col
                  lg={{ span: 8 }}
                  sm={{ span: 12 }}
                  span={24}
                  key={dish.food_id}
                >
                  <FoodItem {...dish} />
                </Col>
              ))
            ) : (
              <Progress percent={50} size={[300, 20]} />
            )}
          </Row>
          <Pagination defaultCurrent={1} total={200} showSizeChanger={false} />
        </div>
        <div className={styles.filterFood}>
          <Card>
            <Input.Search
              placeholder="input search text"
              onSearch={handleSearchInput}
              enterButton
              className={styles.searchInput}
            ></Input.Search>

            <Typography.Title level={4}>Category</Typography.Title>
            <br />
            {food_type_list.map((type, index) => {
              return (
                <>
                  <Checkbox className={styles.cateFoodCheckbox} key={index}>
                    {type}
                  </Checkbox>
                  <br />
                  <br />
                </>
              );
            })}
            <Typography.Title level={4}>Filter By Price</Typography.Title>
            <br />
            <input
              type="range"
              className={styles.rangePriceInput}
              min={0}
              max={10000}
              step={100}
              onChange={handleGetRange}
            />

            <Typography.Title level={4}>Latest Products</Typography.Title>
            <br />
            <div className={styles.latestProductList}>
              <FoodLatestItem />
              <FoodLatestItem />
              <FoodLatestItem />
              <FoodLatestItem />
            </div>

            <Typography.Title level={4}>Product Tags</Typography.Title>
            <br />
            <div className={styles.tagLists}>
              <div className={styles.tag}>
                <label htmlFor="Services_Field">Services</label>
                <input
                  type="checkbox"
                  id="Services_Field"
                  style={{ display: "none" }}
                />
              </div>
              <div className={styles.tag}>
                <label htmlFor="Services_Field3">Services</label>
                <input
                  type="checkbox"
                  id="Services_Field3"
                  style={{ display: "none" }}
                />
              </div>
              <div className={styles.tag}>
                <label htmlFor="Services_Field5">Services</label>
                <input
                  type="checkbox"
                  id="Services_Field5"
                  style={{ display: "none" }}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps<MenuPageProps> = async (
  context: GetStaticPropsContext
) => {
  const data = await API.get(API_GW_NAME, "/foods", {});

  return {
    props: {
      foodListData: handleConvertObjectDdb(data),
    },
    revalidate: 180,
  };
};
