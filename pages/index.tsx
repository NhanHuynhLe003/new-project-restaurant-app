import { Box, Stack } from "@mui/material";
import { MainLayout } from "../components/layouts/main";
import { NextPageWithLayout } from "../models/common";
import styles from "../styles/Home.module.css";
import { Typography } from "@mui/material";
import clsx from "clsx";
import FoodTitleSection from "../components/Home/food-title-section";
import Image from "next/image";
import section1Img from "../assets/svgs/Home_section_1.svg";
import saladEggimg from "../assets/images/food_img02.jpg";
import beafimg from "../assets/images/food_img03.jpg";
import food01Cate from "../assets/images/food_img05.jpg";
import food02Cate from "../assets/images/food_img06.jpg";
import food03Cate from "../assets/images/food_img07.jpg";
import food04Cate from "../assets/images/food_img08.jpg";
import sandwichimg from "../assets/images/food_img04.jpg";
import { Col, Row } from "antd";
import { CheckOutlined } from "@ant-design/icons";

const tmpImgCateList = [
  {
    type: "fast food dish",
    name: "food001",
    discount: "30%",
    img: food01Cate,
  },
  {
    type: "fast food dish",
    name: "food002",
    img: food02Cate,
  },
  {
    type: "vegetable",
    name: "food003",
    img: food03Cate,
  },
  {
    type: "dessert",
    name: "food004",
    discount: "10%",
    img: food04Cate,
  },
];
const Home: NextPageWithLayout = () => {
  return (
    <MainLayout lightMode={true}>
      <Box component={"main"}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          gap={"3rem"}
          marginBottom={"10rem"}
        >
          <FoodTitleSection
            listCheck={[]}
            shortTitle="Its Quick & Amusing!"
            width="50%"
            title="The Art of speed
            food Quality"
            desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius sed
        pharetra dictum neque massa congue"
          />
          <Box sx={{ width: "50%" }}>
            <Image
              alt="s=img_01_section"
              src={section1Img}
              width={0}
              height={0}
              style={{ width: "100%", height: "auto" }}
            />
          </Box>
        </Stack>

        <Stack direction={"row"} alignItems={"center"} gap={"3rem"}>
          <FoodTitleSection
            listCheck={[
              " Lacus nisi, et ac dapibus sit eu velit in consequat.",
              " Quisque diam pellentesque bibendum non dui volutpat fringilla ",
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            ]}
            shortTitle="About us"
            width="50%"
            title="We Create the best
            foody product"
            desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam pellentesque bibendum non dui volutpat fringilla bibendum. Urna, elit augue urna, vitae feugiat pretium donec id elementum. Ultrices mattis sed vitae mus risus. Lacus nisi, et ac dapibus sit eu velit in consequat."
          />

          <br />

          <Box sx={{ width: "50%" }}>
            <Row gutter={[24, 24]}>
              <Col span={24}>
                <Image
                  alt="saladEggImage"
                  src={saladEggimg}
                  width={0}
                  height={0}
                  style={{ width: "100%", height: "auto" }}
                ></Image>
              </Col>

              <Col span={24} sm={{ span: 12 }}>
                <Image
                  src={beafimg}
                  alt="beafImage"
                  width={0}
                  height={0}
                  style={{ width: "100%", height: "auto" }}
                ></Image>
              </Col>
              <Col span={24} sm={{ span: 12 }}>
                <Image
                  src={sandwichimg}
                  alt="sandwichimg"
                  width={0}
                  height={0}
                  style={{ width: "100%", height: "auto" }}
                ></Image>
              </Col>
            </Row>
          </Box>
        </Stack>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <Box>
          <Typography
            sx={{ color: "var(--primary-color)" }}
            variant="h5"
            textAlign="center"
          >
            Food Category
          </Typography>
          <Typography variant="h3" color={"var(--white)"} textAlign={"center"}>
            <Box component={"span"} color={"var(--primary-color)"}>
              Choose
            </Box>{" "}
            Food Iteam
          </Typography>
        </Box>
        <br />
        <br />
        <Row gutter={[24, 24]}>
          {tmpImgCateList.map((food) => (
            <Col key={food.name} span={2} sm={{ span: 4 }}>
              <Box></Box>
            </Col>
          ))}
        </Row>
      </Box>
    </MainLayout>
  );
};

export default Home;
