import * as React from "react";
import { MainLayout } from "../../components/layouts/main";
import { Box, CircularProgress, Stack } from "@mui/material";
import styles from "../../styles/menuRestaurant/menu-restaurant.module.css";
import MenuSection from "../../components/menu/menuSection";

import Acheivement from "../../components/Home/achivement";
import icChef from "../../assets/icons/food_ic_chef_proffessional.svg";
import icItemFood from "../../assets/icons/food_ic_soda_hamburger.svg";
import icYearExp from "../../assets/icons/food_ic_fork_spoon.svg";
import icPizza from "../../assets/icons/food_ic_pizza.svg";
import { GetStaticProps, GetStaticPropsContext } from "next";
import { da } from "date-fns/locale";
export interface MenuPageProps {
  listData: any;
}

const acheiveList = [
  {
    img: icChef,
    title: "Professional Chefs",
    content: "420",
  },
  {
    img: icItemFood,
    title: "Items Of Food",
    content: "320",
  },
  {
    img: icYearExp,
    title: "Years Of Experienced",
    content: "30+",
  },
  {
    img: icPizza,
    title: "Happy Customers",
    content: "220",
  },
];
export default function MenuPage({ listData }: MenuPageProps) {
  return (
    <MainLayout>
      {listData ? (
        <Stack
          className={styles.MenuContainer}
          direction={"column"}
          gap={"8rem"}
        >
          <MenuSection {...listData[0]}></MenuSection>

          <MenuSection {...listData[1]}></MenuSection>

          <Box position={"relative"}>
            <Box position={"absolute"} left={"-10%"} top={"0"} right={"-10%"}>
              <Acheivement iconList={acheiveList}></Acheivement>
            </Box>
          </Box>
          <Box my={"8rem"}> </Box>

          <MenuSection {...listData[2]}></MenuSection>

          <MenuSection {...listData[3]}></MenuSection>
          <Box my={"4rem"}></Box>
        </Stack>
      ) : (
        <Stack
          alignItems={"center"}
          justifyContent={"center"}
          minHeight={"100vh"}
        >
          <CircularProgress size={"10rem"}></CircularProgress>
        </Stack>
      )}
    </MainLayout>
  );
}

export const getStaticProps: GetStaticProps<MenuPageProps> = async (
  context: GetStaticPropsContext
) => {
  const response = await fetch(
    "http://localhost:3000/api/menu/menu-section-list"
  );
  const data = await response.json();
  console.log(data);
  return {
    props: {
      listData: data,
    },
  };
};
