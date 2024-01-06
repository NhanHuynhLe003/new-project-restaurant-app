import { Box, Button, Stack } from "@mui/material";
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
import food05 from "../assets/images/food_img09.jpg";
import food06 from "../assets/images/food_img10.jpg";
import food07 from "../assets/images/food_img11.jpg";
import food08 from "../assets/images/food_img12.jpg";
import food09 from "../assets/images/food_img13.jpg";
import food010 from "../assets/images/food_img14.jpg";
import icFastFood from "../assets/icons/food_ic_hamburger.svg";
import icCookie from "../assets/icons/food_ic_cookie.svg";
import icWine from "../assets/icons/food_ic_wine.svg";
import sandwichimg from "../assets/images/food_img04.jpg";
import icChef from "../assets/icons/food_ic_chef_proffessional.svg";
import icItemFood from "../assets/icons/food_ic_soda_hamburger.svg";
import icYearExp from "../assets/icons/food_ic_fork_spoon.svg";
import icPizza from "../assets/icons/food_ic_pizza.svg";
import { Carousel, Col, Row } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import MenuFoodCard from "../components/Home/menu-food-card";
import FeedBack from "../components/Home/feedback";

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

const feedbacks = [
  {
    content:
      "The food was delicious, high quality, and reasonably priced. I will be back to support!",
    rating: 5,
    name: "Alamin Hasan",
  },
  {
    content:
      "The restaurant's atmosphere is beautiful, the staff is friendly. I will recommend it to my friends",
    rating: 4,
    name: "Nguyen Thi Mai",
  },
  {
    content:
      "The food is beautifully presented, with a delicious flavor. I will be back many times",
    rating: 5,
    name: "Le Van Hung",
  },
  {
    content:
      "The restaurant has a wide variety of dishes at reasonable prices. I will support it for a long time",
    rating: 4,
    name: "Tran Thi Thu Ha",
  },
  {
    content:
      "The food is fresh and cooked to perfection. I will be back to support!",
    rating: 5,
    name: "Dang Thi Lan Huong",
  },
  {
    content:
      "The restaurant's atmosphere is spacious and airy. The staff is efficient. I will be back many times",
    rating: 4,
    name: "Nguyen Van Hung",
  },
  {
    content:
      "The food is cooked according to Vietnamese taste, very delicious. I will support it for a long time",
    rating: 5,
    name: "Pham Thi Thu Trang",
  },
  {
    content:
      "The restaurant has a variety of local specialties. I will recommend it to my friends",
    rating: 4,
    name: "Le Van Nam",
  },
  {
    content:
      "The food is beautifully decorated, very eye-catching. I will be back to support!",
    rating: 5,
    name: "Nguyen Thi Thanh",
  },
];
const Home: NextPageWithLayout = () => {
  function LinkToMenuClick() {
    router.push("/menu");
  }
  const router = useRouter();
  return (
    <MainLayout lightMode={true}>
      <Box component={"main"}>
        <Stack
          padding={{ xs: "2rem 1rem", sm: "2rem 0" }}
          alignItems={"center"}
          gap={"3rem"}
          flexDirection={{ xs: "column", sm: "row" }}
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
          <Box width={{ sm: "50%" }} display={{ xs: "none", sm: "block" }}>
            <Image
              alt="s=img_01_section"
              src={section1Img}
              width={0}
              height={0}
              style={{ width: "100%", height: "auto" }}
            />
          </Box>
        </Stack>

        <Stack
          padding={{ xs: "2rem 1rem", sm: "2rem 0" }}
          direction={{ sm: "row", xs: "column" }}
          alignItems={"center"}
          gap={"3rem"}
        >
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

          <Box width={{ sm: "50%", xs: "100%" }}>
            <Row gutter={[24, 24]}>
              <Col span={24}>
                <Image
                  alt="saladEggImage"
                  src={saladEggimg}
                  width={0}
                  height={0}
                  style={{ width: "100%", height: "auto", borderRadius: "8px" }}
                ></Image>
              </Col>

              <Col span={24} sm={{ span: 12 }}>
                <Image
                  src={beafimg}
                  alt="beafImage"
                  width={0}
                  height={0}
                  style={{ width: "100%", height: "auto", borderRadius: "8px" }}
                ></Image>
              </Col>
              <Col span={24} sm={{ span: 12 }}>
                <Image
                  src={sandwichimg}
                  alt="sandwichimg"
                  width={0}
                  height={0}
                  style={{ width: "100%", height: "auto", borderRadius: "8px" }}
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
        <Box padding={{ xs: "2rem 1rem", sm: "2rem 0" }}>
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
        <Row gutter={[12, 12]}>
          {tmpImgCateList.map((food) => (
            <Col
              key={food.name}
              span={12}
              sm={{ span: 6 }}
              className={styles.cardContainerCate}
              onClick={LinkToMenuClick}
            >
              <div className={styles.hoverCardCate}>
                <div className={styles.cateFoodDiscount}>
                  save <span className={styles.discountVal}>30%</span>
                </div>

                <div className={styles.cateFoodType}>Fast Food Dish</div>
              </div>
              <div className={styles.cardCate}>
                <Image
                  alt={`img-card-cate-${food.name}`}
                  src={food.img}
                  width={0}
                  height={0}
                  style={{ width: "100%", height: "auto" }}
                />{" "}
              </div>
            </Col>
          ))}
        </Row>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <Stack
          padding={{ xs: "2rem 1rem", sm: "2rem 0" }}
          direction={"column"}
          gap={"3rem"}
          sx={{ flexDirection: { sm: "row" } }}
        >
          <div className={styles.gridImage}>
            <div className={clsx(styles.imgItem, styles.img01)}>
              <Image
                width={0}
                height={0}
                style={{ width: "100%", height: "auto" }}
                alt="img-food-01"
                src={food05}
              ></Image>
            </div>
            <div className={clsx(styles.imgItem, styles.img02)}>
              <Image
                width={0}
                height={0}
                style={{ width: "100%", height: "auto" }}
                alt="img-food-02"
                src={food06}
              ></Image>
            </div>

            <div className={clsx(styles.imgItem, styles.img03)}>
              <Image
                width={0}
                height={0}
                style={{ width: "100%", height: "auto" }}
                alt="img-food-03"
                src={food07}
              ></Image>
            </div>

            <div className={clsx(styles.imgItem, styles.img04)}>
              <Image
                width={0}
                height={0}
                style={{ width: "100%", height: "auto" }}
                alt="img-food-04"
                src={food08}
              ></Image>
            </div>

            <div className={clsx(styles.imgItem, styles.img05)}>
              <Image
                width={0}
                height={0}
                style={{ width: "100%", height: "auto" }}
                alt="img-food-05"
                src={food09}
              ></Image>
              <Image
                width={0}
                height={0}
                style={{ width: "100%", height: "auto" }}
                alt="img-food-06"
                src={food010}
              ></Image>
            </div>
          </div>
          <div className={styles.rightReasonSection}>
            <FoodTitleSection
              width="100%"
              shortTitle="Why Choose us"
              title="Exta ordinary taste
And Experienced "
              desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam pellentesque bibendum non dui volutpat fringilla bibendum. Urna, elit augue urna, vitae feugiat pretium donec id elementum. Ultrices mattis sed vitae mus risus. Lacus nisi, et ac dapibus sit eu velit in consequat."
            ></FoodTitleSection>
            <br />
            <br />
            <Box
              component={"ul"}
              sx={{
                width: "100%",
              }}
              paddingLeft={0}
              display={"flex"}
              gap="6%"
            >
              <Box component={"li"} width={"20%"}>
                <Box
                  sx={{
                    backgroundColor: "var(--primary-color);",
                    padding: "1.5rem",
                    borderRadius: "8px",
                  }}
                >
                  <Image
                    src={icFastFood}
                    width={0}
                    height={0}
                    style={{ width: "100%", height: "auto" }}
                    alt="ic_reason_01"
                  />
                </Box>
                <Typography
                  component={"p"}
                  sx={{
                    color: "var(--white);",
                    fontWeight: "400",
                    fontSize: "20px",
                    textAlign: "center",
                  }}
                >
                  Fast Food
                </Typography>
              </Box>
              <Box component={"li"} width={"20%"}>
                <Box
                  sx={{
                    backgroundColor: "var(--primary-color);",
                    padding: "1.5rem",
                    borderRadius: "8px",
                  }}
                >
                  <Image
                    src={icCookie}
                    width={0}
                    height={0}
                    style={{ width: "100%", height: "auto" }}
                    alt="ic_reason_01"
                  />
                </Box>
                <Typography
                  component={"p"}
                  sx={{
                    color: "var(--white);",
                    fontWeight: "400",
                    fontSize: "20px",
                    textAlign: "center",
                  }}
                >
                  Fast Food
                </Typography>
              </Box>
              <Box component={"li"} width={"20%"}>
                <Box
                  sx={{
                    backgroundColor: "var(--primary-color);",
                    padding: "1.5rem",
                    borderRadius: "8px",
                  }}
                >
                  <Image
                    src={icWine}
                    width={0}
                    height={0}
                    style={{ width: "100%", height: "auto" }}
                    alt="ic_reason_01"
                  />
                </Box>
                <Typography
                  component={"p"}
                  sx={{
                    color: "var(--white);",
                    fontWeight: "400",
                    fontSize: "20px",
                    textAlign: "center",
                  }}
                >
                  Fast Food
                </Typography>
              </Box>
            </Box>
            <br />
            <br />
            <Stack
              direction={"row"}
              alignItems={"center"}
              gap={"2rem"}
              sx={{ backgroundColor: "#fff" }}
              borderLeft={"10px solid var(--primary-color);"}
              borderRadius={"8px"}
              padding={"1rem"}
            >
              <Typography
                variant="h5"
                color={"var(--primary-color)"}
                padding={"0 2rem"}
                fontSize={"30px"}
                fontWeight={"bold"}
              >
                30+
              </Typography>
              <Stack direction={"column"} justifyContent={"center"}>
                <Typography variant="h6" color={"var(--black-1)"}>
                  Year of
                </Typography>
                <Typography
                  variant="h5"
                  color={"var(--black-1)"}
                  fontWeight={600}
                >
                  Experienced
                </Typography>
              </Stack>
            </Stack>
          </div>
        </Stack>

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className={styles.achievement}>
          <div className={styles.blurAchievement}></div>
          <Row className={styles.achieveContainer} gutter={[0, 24]}>
            <Col
              span={24}
              sm={{ span: 12 }}
              md={{ span: 6 }}
              style={{ textAlign: "center" }}
            >
              <Image src={icChef} alt="icon_chef"></Image>
              <Typography component={"h6"} color={"var(--white)"}>
                Professional Chefs
              </Typography>
              <Typography component={"h5"} variant="h5" color={"var(--white)"}>
                420
              </Typography>
            </Col>

            <Col
              span={24}
              sm={{ span: 12 }}
              md={{ span: 6 }}
              style={{ textAlign: "center" }}
            >
              <Image src={icItemFood} alt="icon_food_item"></Image>
              <Typography component={"h6"} color={"var(--white)"}>
                Items Of Food
              </Typography>
              <Typography component={"h5"} variant="h5" color={"var(--white)"}>
                320
              </Typography>
            </Col>

            <Col
              span={24}
              sm={{ span: 12 }}
              md={{ span: 6 }}
              style={{ textAlign: "center" }}
            >
              <Image src={icYearExp} alt="ic_year_exp"></Image>
              <Typography component={"h6"} color={"var(--white)"}>
                Years Of Experienced
              </Typography>
              <Typography component={"h5"} variant="h5" color={"var(--white)"}>
                30+
              </Typography>
            </Col>

            <Col
              span={24}
              sm={{ span: 12 }}
              md={{ span: 6 }}
              style={{ textAlign: "center" }}
            >
              <Image src={icPizza} alt="ic_pizza"></Image>
              <Typography component={"h6"} color={"var(--white)"}>
                Happy Customers
              </Typography>
              <Typography component={"h5"} variant="h5" color={"var(--white)"}>
                220
              </Typography>
            </Col>
          </Row>
        </div>
      </Box>
      <br />
      <br />
      <br />
      <br />
      <Box padding={{ xs: "2rem 1rem", sm: "2rem 0" }}>
        <Box>
          <Typography
            sx={{ color: "var(--primary-color)" }}
            variant="h5"
            textAlign="center"
          >
            Choose & pick
          </Typography>
          <Typography variant="h3" color={"var(--white)"} textAlign={"center"}>
            <Box component={"span"} color={"var(--primary-color)"}>
              Fr
            </Box>
            om Our Menu
          </Typography>
        </Box>
        <br />
        <br />
        <Box>
          <Stack direction={"row"} justifyContent={"space-around"}>
            <Button
              sx={{
                width: "100%",
                padding: "0.5rem 2rem",
                color: "var(--white)",
                ":hover": { color: "var(--primary-color);", fontWeight: "600" },
              }}
            >
              Food
            </Button>
            <Button
              sx={{
                width: "100%",
                padding: "0.5rem 2rem",
                color: "var(--white)",
                ":hover": { color: "var(--primary-color);", fontWeight: "600" },
              }}
            >
              Drink
            </Button>
            <Button
              sx={{
                width: "100%",
                padding: "0.5rem 2rem",
                color: "var(--white)",
                ":hover": { color: "var(--primary-color);", fontWeight: "600" },
              }}
            >
              Other
            </Button>
          </Stack>
          <br />
          <br />
          <Row gutter={[24, 0]}>
            <Col span={0} sm={{ span: 24 }} md={{ span: 8 }}>
              <Image
                style={{ borderRadius: "8px", width: "100%" }}
                src={food05}
                width={0}
                height={0}
                alt="food_first"
              ></Image>
            </Col>
            <Col span={12} sm={{ span: 12 }} md={{ span: 8 }}>
              <MenuFoodCard
                img={food05}
                name="Lettuce Leaf"
                price={30}
                discount={10}
                desc="Lacus nisi, et ac dapibus velit in consequat."
              />
              <MenuFoodCard
                img={food05}
                name="Lettuce Leaf"
                price={30}
                desc="Lacus nisi, et ac dapibus velit in consequat."
              />
              <MenuFoodCard
                img={food05}
                name="Lettuce Leaf"
                price={30}
                desc="Lacus nisi, et ac dapibus velit in consequat."
              />
              <MenuFoodCard
                img={food05}
                name="Lettuce Leaf"
                price={30}
                desc="Lacus nisi, et ac dapibus velit in consequat."
              />
            </Col>
            <Col span={12} sm={{ span: 12 }} md={{ span: 8 }}>
              <MenuFoodCard
                img={food05}
                name="Lettuce Leaf"
                price={30}
                desc="Lacus nisi, et ac dapibus velit in consequat."
              />
              <MenuFoodCard
                img={food05}
                name="Lettuce Leaf"
                price={30}
                desc="Lacus nisi, et ac dapibus velit in consequat."
              />
              <MenuFoodCard
                img={food05}
                name="Lettuce Leaf"
                price={30}
                desc="Lacus nisi, et ac dapibus velit in consequat."
              />
              <MenuFoodCard
                img={food05}
                name="Lettuce Leaf"
                price={30}
                desc="Lacus nisi, et ac dapibus velit in consequat."
              />
            </Col>
          </Row>
        </Box>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <Box>
          <Box>
            <Typography
              sx={{ color: "var(--primary-color)", sm: { textAlign: "left" } }}
              variant="h5"
              textAlign="center"
            >
              Testimonials
            </Typography>
            <Typography
              variant="h3"
              color={"var(--white)"}
              textAlign={"center"}
              sx={{ sm: { textAlign: "left" } }}
            >
              <Box component={"span"} color={"var(--primary-color)"}>
                Wh
              </Box>
              at our client are saying
            </Typography>
          </Box>
          <br />
          <br />
          <br />
          <Carousel
            autoplay
            autoplaySpeed={2000}
            style={{ maxWidth: "70%", margin: "0 auto" }}
            dots={{ className: styles.dotCarouselFeedBack }}
          >
            {feedbacks
              ? feedbacks.map((feedback) => (
                  <FeedBack
                    key={feedback.content}
                    avatar={food010}
                    comment={feedback.content}
                    name={feedback.name}
                    rating={feedback.rating}
                  ></FeedBack>
                ))
              : "loading"}
          </Carousel>
        </Box>
      </Box>
    </MainLayout>
  );
};

export default Home;
