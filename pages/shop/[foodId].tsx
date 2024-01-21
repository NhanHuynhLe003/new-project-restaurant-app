import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  HeartOutlined,
  MinusOutlined,
  PlusOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Carousel, Col, Rate, Row } from "antd";
import { CarouselRef } from "antd/es/carousel";
import { API, Amplify, Auth } from "aws-amplify";
import clsx from "clsx";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import Image from "next/image";
import * as React from "react";
import amplifyConfig from "../../amplifyconfig.json";
import avatarUser from "../../assets/images/avt-user.jpg";
import food001 from "../../assets/images/food_img02.jpg";
import { MainLayout } from "../../components/layouts/main";
import FoodItem from "../../components/shop/foodItem";
import listUserComment from "../../jsons/usercomments.json";
import { FoodModel } from "../../models";
import { productCart } from "../../models/cart";
import styles from "../../styles/shop/foodDetail.module.css";
import { updateProductCart } from "../../utils";
import { handleConvertObjectDdb } from "../../utils/handleResDataDynamodb";

export interface FoodDetailProps {
  food: FoodModel;
  foodList: FoodModel[];
}
const API_GW_NAME = "ag-manage-restaurant-project";
Amplify.configure(amplifyConfig);
export default function FoodDetail({ food, foodList }: FoodDetailProps) {
  const [feedbackBtn, setFeedBackBtn] = React.useState(0);
  const [maxComment, setMaxComment] = React.useState(10);
  const [quantity, setQuantity] = React.useState(1);
  const [widthWindow, setWidthWindow] = React.useState(-1);
  const [foodRelativeList, setFoodRelativeList] = React.useState<FoodModel[]>(
    []
  );
  const viewMoreBtnRef = React.useRef<HTMLButtonElement>(null);
  const foodRelativeRef = React.useRef<CarouselRef>(null);

  async function handleAddToCart(product: productCart) {
    const user = await Auth.currentUserInfo();
    const userName = await user.username;

    const apiUpdateCart = `https://svkcor3qaj.execute-api.us-east-1.amazonaws.com/v1/carts`;

    const res = await updateProductCart({
      apiUrl: apiUpdateCart,
      cartUserId: userName,
      product,
    });
    console.log("UPDATED PROD::: ", res);
  }
  React.useEffect(() => {
    const handleWindowResize = () => {
      setWidthWindow(window.innerWidth);
    };
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);
  React.useEffect(() => {
    if (foodList) {
      const foodListRelate = foodList.filter(
        (product) =>
          product.food_tags &&
          Object.keys(product.food_tags).some(
            (tag) => food.food_tags && Object.keys(food.food_tags).includes(tag)
          ) &&
          food.food_id !== product.food_id
      );
      setFoodRelativeList([...foodListRelate]);
    }
  }, []);
  if (!food) return <div>No Data</div>;

  function handleClickFeedback(key: number) {
    setFeedBackBtn(key);
  }
  function handleChangeQuantity(num: number) {
    setQuantity(num);
  }

  function handleViewMoreReview(len: number) {
    setMaxComment(len);
    if (len >= listUserComment.length && viewMoreBtnRef.current) {
      viewMoreBtnRef.current.style.display = "none";
    }
  }

  function handleClickNext() {
    foodRelativeRef.current && foodRelativeRef.current.next();
  }
  function handleClickPrev() {
    foodRelativeRef.current && foodRelativeRef.current.prev();
  }
  return (
    <MainLayout>
      <Box px={{ sm: "10%", xs: "1rem" }} pt={{ xs: "4rem" }} pb={"3rem"}>
        <Stack
          direction={{ md: "row", xs: "column" }}
          gap={{ xs: "1rem", sm: "3rem" }}
          mb={{ sm: "4rem" }}
        >
          <Box
            width={{ xs: "100%", md: "50%" }}
            height={"auto"}
            display={"flex"}
            alignItems={"center"}
            boxShadow={"0 0 10px #ccc"}
            borderRadius={"8px"}
            mb={{ xs: "2rem", md: "10rem" }}
            position={"relative"}
          >
            <Box
              display={food.food_discount ? "block" : "none"}
              color={"#fff"}
              bgcolor={"var(--error)"}
              fontWeight={"600"}
              position={"absolute"}
              padding={"1rem 3rem"}
              fontSize={"1.25rem"}
              borderRadius={"8px"}
              sx={{ transform: "rotate(-45deg)", top: "10%", left: "0" }}
            >
              SALE {food.food_discount}%
            </Box>
            <Image
              alt={`food-img-${food.food_name}`}
              src={food.food_img}
              width={0}
              height={0}
              style={{ width: "100%", height: "auto" }}
            ></Image>
          </Box>
          <Box width={{ md: "50%", xs: "100%" }} height={"auto"}>
            <Typography
              variant="h2"
              textTransform={"capitalize"}
              color={"var(--primary-color)"}
            >
              {food.food_name}
            </Typography>
            <br />
            <div
            // dangerouslySetInnerHTML={{ __html: food.food_desc || "" }}
            >
              <Typography component={"p"}>
                {food.food_info ||
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam pellentesque bibendum non dui volutpat fringilla bibendum. Urna, urna, vitae feugiat pretium donec id elementum. Ultrices mattis sed vitae mus risus. Lacus nisi, et ac dapibus sit eu velit in consequat."}
              </Typography>
            </div>
            <Box width={"100%"} height={"1px"} my="2rem" bgcolor={"#ccc"}></Box>
            <Typography variant="h4" fontWeight={"bold"}>
              {food.food_price}$
            </Typography>
            <br />
            <Stack direction={"row"} gap={"1rem"} alignItems={"center"}>
              <Rate
                disabled
                defaultValue={food.food_rating}
                allowHalf
                style={{ color: "var(--primary-color)", fontSize: "1rem" }}
              ></Rate>

              <Typography borderLeft={"1px solid #ccc"} paddingLeft={"1rem"}>
                {food.food_rating?.toFixed(2)} Rating
              </Typography>

              <Typography borderLeft={"1px solid #ccc"} paddingLeft={"1rem"}>
                {food.food_review ? food.food_review.toFixed(2) : 0} Review
              </Typography>
            </Stack>
            <br />
            <Stack direction={"row"} gap={"2rem"}>
              <Stack
                className={styles.productQuantityControl}
                direction={"row"}
                width={"fit-content"}
                border={"1px solid #ccc"}
              >
                <Button
                  onClick={() => handleChangeQuantity(quantity - 1)}
                  sx={{
                    borderRadius: 0,
                    backgroundColor: "var(--white)",
                    color: "var(--primary-color)",
                    cursor: "pointer",
                    transition: 200,
                    py: "0.75rem",
                    ":hover": {
                      backgroundColor: "var(--primary-color)",
                      color: "var(--white)",
                    },
                  }}
                >
                  <MinusOutlined></MinusOutlined>
                </Button>
                <Box
                  component={"input"}
                  type="number"
                  value={quantity}
                  onChange={(e) => handleChangeQuantity(Number(e.target.value))}
                  width={"3rem"}
                  className={styles.inputQuantity}
                  sx={{
                    outline: "none",
                    borderTop: "none",
                    padding: "0.5rem",
                    borderBottom: "none",
                    borderLeft: "1px solid #ccc",
                    borderRight: "1px solid #ccc",
                    height: "100%",
                    textAlign: "center",
                    fontSize: "1rem",
                  }}
                ></Box>
                <Button
                  onClick={() => handleChangeQuantity(quantity + 1)}
                  sx={{
                    py: "0.75rem",
                    borderRadius: 0,
                    backgroundColor: "var(--white)",
                    color: "var(--primary-color)",
                    cursor: "pointer",
                    transition: 200,
                    ":hover": {
                      backgroundColor: "var(--primary-color)",
                      color: "var(--white)",
                    },
                  }}
                >
                  <PlusOutlined></PlusOutlined>
                </Button>
              </Stack>
              <Button
                onClick={() =>
                  handleAddToCart({
                    productId: food.food_id,
                    productType: food.food_type,
                    quantity: 1,
                    old_quantity: 0,
                    img: food.food_img,
                    name: food.food_name,
                    price: food.food_price,
                    rating: food.food_rating,
                  })
                }
                sx={{
                  bgcolor: "var(--primary-color)",
                  color: "#fff",
                  p: "0.5rem 1.5rem",
                  ":hover": {
                    bgcolor: "#fff",
                    color: "var(--primary-color)",
                  },
                }}
                startIcon={<ShoppingCartOutlined></ShoppingCartOutlined>}
              >
                Add to cart
              </Button>
            </Stack>
            <Box width={"100%"} height={"1px"} my="2rem" bgcolor={"#ccc"}></Box>
            <Button
              startIcon={<HeartOutlined></HeartOutlined>}
              sx={{
                color: "var(--primary-color)",
              }}
            >
              Add to Wishlist
            </Button>
            <Typography component={"p"} fontSize={"1.25rem"}>
              <b>Category:</b> {food.food_type}
            </Typography>
            <Typography component={"p"} fontSize={"1.25rem"}>
              <b>Tag:</b>{" "}
              {food.food_tags && Object.keys(food.food_tags).join(", ")}
            </Typography>
          </Box>
        </Stack>
        <br />
        <br />
        <Box component={"section"}>
          <Stack direction={"row"}>
            <Button
              onClick={() => handleClickFeedback(0)}
              className={clsx(styles.controlFeedbackBtn, styles.descBtn, {
                [styles.activeBtn]: feedbackBtn === 0,
              })}
            >
              Description
            </Button>
            <Button
              onClick={() => handleClickFeedback(1)}
              className={clsx(styles.controlFeedbackBtn, styles.previewBtn, {
                [styles.activeBtn]: feedbackBtn === 1,
              })}
            >
              Preview (24)
            </Button>
          </Stack>

          <div
            style={{ display: feedbackBtn === 0 ? "block" : "none" }}
            dangerouslySetInnerHTML={{ __html: food.food_desc || "" }}
          ></div>
          <Box sx={{ display: feedbackBtn === 1 ? "block" : "none" }}>
            {listUserComment &&
              listUserComment.map((user, index) => {
                if (index >= maxComment) return;
                return (
                  <Stack
                    key={user.comment}
                    className={styles.user}
                    my={{ sm: "2rem", xs: "1rem" }}
                    gap={"1rem"}
                    direction={"row"}
                  >
                    <Box width={"6%"} sx={{ borderRadius: "50%" }}>
                      <Image
                        alt={`avatar-user-1`}
                        src={avatarUser}
                        width={0}
                        height={0}
                        style={{
                          width: "100%",
                          height: "auto",
                          borderRadius: "50%",
                        }}
                      ></Image>
                    </Box>
                    <Box width={"94%"}>
                      <Typography component={"h6"} variant="h6">
                        {user.username}
                      </Typography>
                      <Rate
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--primary-color)",
                        }}
                        defaultValue={user.rating}
                        allowHalf
                        disabled
                      ></Rate>
                      <Typography
                        component={"p"}
                        style={{ opacity: 0.4, fontSize: "0.75rem" }}
                      >
                        {user.commentDate.toString()}
                      </Typography>

                      <Box component={"p"}>{user.comment}</Box>

                      <Row gutter={[8, 8]}>
                        {/* list Img Here */}
                        {user.feedbackImages &&
                          user.feedbackImages.map((imgFeedback, index) => (
                            <Col key={index} span={12} sm={8} md={6}>
                              <Image
                                src={food001}
                                alt={`food_img_0${index}`}
                                width={0}
                                height={0}
                                style={{ width: "100%", height: "auto" }}
                              ></Image>
                            </Col>
                          ))}
                      </Row>
                    </Box>
                  </Stack>
                );
              })}
            <Stack alignItems={"center"}>
              <Button
                onClick={() => handleViewMoreReview(maxComment + 10)}
                ref={viewMoreBtnRef}
                sx={{
                  color: "var(--primary-color)",
                  width: "fit-content",
                  padding: "0.5rem 2rem",
                  ":hover": {
                    color: "var(--white)",
                    bgcolor: "var(--primary-color)",
                  },
                }}
              >
                View More Reviews
              </Button>
            </Stack>
          </Box>
        </Box>
        <br />
        <br />
        <br />
        <Box>
          <Stack
            className={styles.titleSimilarProduct}
            direction={"row"}
            justifyContent={"space-between"}
          >
            <Typography variant={"h4"}>Similar Products</Typography>
            <Stack direction={"row"}>
              <Button
                onClick={handleClickPrev}
                sx={{
                  height: "fit-content",

                  color: "var(--primary-color)",

                  ":hover": {
                    background: "var(--primary-color)",
                    color: "var(--white)",
                  },
                }}
              >
                <ArrowLeftOutlined></ArrowLeftOutlined>
              </Button>
              <Button
                onClick={handleClickNext}
                sx={{
                  height: "fit-content",
                  color: "var(--primary-color)",
                  ":hover": {
                    background: "var(--primary-color)",
                    color: "var(--white)",
                  },
                }}
              >
                <ArrowRightOutlined></ArrowRightOutlined>
              </Button>
            </Stack>
          </Stack>
          <br />
          <br />
          <Carousel
            slidesPerRow={widthWindow < 600 && widthWindow !== -1 ? 1 : 3}
            lazyLoad="progressive"
            draggable
            ref={foodRelativeRef}
          >
            {foodRelativeList &&
              foodRelativeList.map((foodAttr) => (
                <Box key={foodAttr.food_id} sx={{ p: "0.25rem 1rem" }}>
                  <FoodItem
                    {...foodAttr}
                    horizontal={widthWindow < 600 && widthWindow !== -1}
                  ></FoodItem>
                </Box>
              ))}
          </Carousel>
          <br />
        </Box>
        <br />
        <br />
      </Box>
    </MainLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const foodListData: FoodModel[] = await API.get(API_GW_NAME, "/foods", {});
  const dataConvert = handleConvertObjectDdb(foodListData);
  return {
    paths: dataConvert.map((food, index) => ({
      params: { foodId: `${food.food_id}-type=${food.food_type}` },
    })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<FoodDetailProps> = async (
  context: GetStaticPropsContext
) => {
  let foodIdParams = context.params?.foodId;

  if (!foodIdParams) return { notFound: true };
  if (typeof foodIdParams == "string") {
    foodIdParams = foodIdParams.replace("-type", "?type");
  }

  const data = await API.get(API_GW_NAME, `/foods/${foodIdParams}`, {});

  const foodList = await API.get(API_GW_NAME, "/foods", {});

  return {
    props: {
      food: data,
      foodList: handleConvertObjectDdb(foodList),
    },
    revalidate: 180,
  };
};
