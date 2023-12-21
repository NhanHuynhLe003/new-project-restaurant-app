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

import foodTags from "../../jsons/foodtags.json";
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
import { FoodModel, NextPageWithLayout } from "../../models";
import { handleConvertObjectDdb } from "../../utils/handleResDataDynamodb";
import Link from "next/link";
import { MainLayout } from "../../components/layouts/main";

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
  "Pizza",
  "Burger",
  "Chicken",
  "Fried",
  "Taco",
  "Sushi",
  "Soft Drink",
  "Uncategorized",
];
function paginate(products: FoodModel[], itemsPerPage = 10, currentPage = 1) {
  return products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
}

function CommonList(...arrays: any) {
  const elementCountMap = new Map(); // Sử dụng Map để đếm số lần xuất hiện của từng phần tử

  // Duyệt qua từng mảng
  for (const array of arrays) {
    // Duyệt qua từng phần tử trong mảng và tăng giá trị trong bảng băm
    for (const element of array) {
      const count = elementCountMap.get(element) || 0;
      elementCountMap.set(element, count + 1);
    }
  }

  // Lọc các phần tử có số lần xuất hiện bằng số mảng
  const commonElements = Array.from(elementCountMap.entries())
    .filter(([element, count]) => count === arrays.length)
    .map(([element]) => element);

  return commonElements;
}
export default function MenuPage({ foodListData }: MenuPageProps) {
  const [foodListPerPage, setFoodListPerPage] = React.useState(
    paginate(foodListData, 10, 1)
  );

  interface FilterData {
    // Assuming filterData has a category property that is an array of strings
    category: string[];
    tags: string[];
    searchInput: string;
    priceRange: string;
  }
  const initialFilterData: FilterData = {
    searchInput: "",
    category: [],
    priceRange: "1000000",
    tags: [],
  };
  const [filterData, setFilterData] = React.useState(initialFilterData);
  React.useEffect(() => {
    setFoodListPerPage(paginate(foodListData, 10, 1));

    const newDataFoodList = [...foodListData];
    if (filterData.searchInput !== "") {
      const newFoodList = foodListPerPage.filter((food) =>
        food.food_name.includes(filterData.searchInput)
      );

      setFoodListPerPage(newFoodList);
      return;
    }

    let listFoodPriceFilter = [...newDataFoodList];
    listFoodPriceFilter = newDataFoodList.filter(
      (food) => food.food_price < Number(filterData.priceRange)
    );

    let listFoodTags = [...newDataFoodList];
    if (filterData.tags.length > 0) {
      listFoodTags = newDataFoodList.filter(
        (food) =>
          food.food_tags &&
          Object.keys(food.food_tags)?.some((tag) =>
            filterData.tags.includes(tag)
          )
      );
    }

    let listFoodTypes = [...newDataFoodList];
    if (filterData.category.length > 0) {
      listFoodTypes = newDataFoodList.filter(
        (food) =>
          food.food_tags &&
          Object.keys(food.food_tags)?.some((tag) =>
            filterData.category.includes(tag)
          )
      );
    }

    const listCommondFood = CommonList(
      listFoodPriceFilter,
      listFoodTags,
      listFoodTypes
    );

    setFoodListPerPage(listCommondFood);
  }, [filterData]);

  function handleSearchInput(value: string, event: any) {
    const dataSearch = { ...filterData };
    dataSearch.searchInput = value;
    setFilterData(dataSearch);
  }
  function handleGetRange(e: any) {
    const priceData = { ...filterData };
    priceData.priceRange = e.target.value;
    setFilterData(priceData);
  }

  function handlePagination(page: number) {
    const newList = paginate(foodListData, 10, page);
    setFoodListPerPage(newList);
  }

  function handleFoodTypes(e: any) {
    const val: string = e.target.value;
    const data = { ...filterData };

    if (!data.category.includes(val)) {
      data.category.push(val);
    } else {
      const index = data.category.indexOf(val);
      data.category.splice(index, 1);
    }
    setFilterData(data);
  }

  function handleFoodTags(e: any) {
    const val: string = e.target.value;
    const data = { ...filterData };

    if (!data.tags.includes(val)) {
      data.tags.push(val);
    } else {
      const index = data.tags.indexOf(val);
      data.tags.splice(index, 1);
    }
    setFilterData(data);
  }

  return (
    <MainLayout lightMode={false}>
      <div className={clsx(styles.menuContainer)}>
        <br />
        <br />
        <div className={styles.foodMenuContainer}>
          <div className={styles.menuFood}>
            <Row gutter={[48, 32]}>
              {foodListPerPage ? (
                foodListPerPage.map((dish, index) => (
                  <Col
                    lg={{ span: 8 }}
                    sm={{ span: 12 }}
                    span={24}
                    key={dish.food_id + index}
                  >
                    <FoodItem {...dish} />
                  </Col>
                ))
              ) : (
                <Progress percent={50} size={[300, 20]} />
              )}
            </Row>
            <br />
            <br />
            <Pagination
              style={{ textAlign: "center" }}
              onChange={handlePagination}
              total={foodListPerPage.length}
              // current={1}
              showSizeChanger={false}
            />
          </div>
          <div className={styles.filterFood}>
            <Card>
              <Input.Search
                name="searchInput"
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
                    <Checkbox
                      onChange={handleFoodTypes}
                      name="category"
                      className={styles.cateFoodCheckbox}
                      key={index}
                      value={type}
                    >
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
                name="price"
                type="range"
                className={styles.rangePriceInput}
                min={0}
                value={filterData.priceRange}
                max={1000000}
                step={5000}
                onChange={handleGetRange}
              />
              <div>
                <b>less than: </b>
                <span>{filterData.priceRange}</span>
              </div>

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
                {foodTags.map((tag, index) => {
                  return (
                    <div className={styles.tag} key={tag}>
                      <label
                        className={clsx(styles.checkboxLabel, {
                          [styles.activeLabel]: filterData.tags.includes(tag),
                        })}
                        htmlFor={tag}
                      >
                        {tag}
                      </label>
                      <input
                        onChange={(e) => handleFoodTags(e)}
                        name={tag}
                        value={tag}
                        type="checkbox"
                        className={styles.checkBoxTag}
                        id={tag}
                        style={{ display: "none" }}
                      />
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
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
