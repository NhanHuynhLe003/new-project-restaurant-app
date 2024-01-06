import { Box, Stack, Typography, Button } from "@mui/material";
import { Input, ConfigProvider, Divider, Row, Col } from "antd";
import * as React from "react";
import styles from "../../styles/footer/footer.module.css";
import Image from "next/image";
import icClock from "../../assets/icons/ClockClockwise.svg";
import food001 from "../../assets/images/food_img02.jpg";
import Link from "next/link";
import {
  ContactsOutlined,
  InfoCircleOutlined,
  MenuOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import MenuFoodCard from "../Home/menu-food-card";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const usefulLink = [
  {
    page: "About",
    path: "/about",
    ic: <InfoCircleOutlined />,
  },
  {
    page: "Shop",
    path: "/shop",
    ic: <ShoppingOutlined />,
  },
  {
    page: "Menu",
    path: "/menu",
    ic: <MenuOutlined />,
  },
  {
    page: "Contact",
    path: "/contact",
    ic: <ContactsOutlined />,
  },
];
export interface FooterProps {}
const { Search } = Input;
export function Footer(props: FooterProps) {
  return (
    <Box component={"footer"}>
      <Box px={"10%"} pt={"6rem"} pb="3rem" bgcolor={"var(--dark-1)"}>
        <Stack
          direction={{ sm: "row", xs: "column" }}
          justifyContent={"space-between"}
          borderBottom={"2px solid var(--primary-color)"}
          pb={"2rem"}
          gap={{ xs: "2rem" }}
        >
          <Box>
            <Typography variant="h4" color={"var(--white)"}>
              <Box color={"var(--primary-color)"} component={"span"}>
                St
              </Box>
              ill You Need Our Support ?
            </Typography>
            <Typography component={"p"} color={"var(--white)"} fontSize={16}>
              Don’t wait make a smart & logical quote here. Its pretty easy.
            </Typography>
          </Box>

          <Box
            position={"relative"}
            width={{ xs: "100%", md: "50%", lg: "40%" }}
            height={"fit-content"}
          >
            <input
              className={styles.SubscribeInput}
              type="email"
              placeholder="Enter your email"
            ></input>
            <Button
              sx={{
                height: "100%",
                backgroundColor: "#fff",
                color: "var(--primary-color)",
                position: "absolute",
                ":hover": {
                  color: "var(--white)",
                },
                top: 0,
                right: 0,
              }}
            >
              Subscribe Now
            </Button>
          </Box>
        </Stack>
        <br />
        <br />
        <br />
        <br />
        <Row gutter={{ xs: 16, sm: 32 }}>
          <Col span={12} md={10}>
            <Box>
              <Typography
                color={"var(--white)"}
                variant="h5"
                fontWeight={"bold"}
              >
                About Us
              </Typography>
              <br />
              <Typography component="p" color={"var(--white)"}>
                orporate clients and leisure travelers hasbeen relying on
                Groundlink for dependablesafe, and professional chauffeured
                carservice in major cities across World.
              </Typography>
              <br />
              <Stack direction={{ sm: "row", xs: "column" }} gap={"1rem"}>
                <Box
                  width={{ sm: "25%", xs: "100%" }}
                  bgcolor={"var(--primary-color)"}
                  p={"1rem"}
                  height={"fit-content"}
                >
                  <Image
                    alt="img-ic-clock"
                    src={icClock}
                    width={0}
                    height={0}
                    style={{ width: "100%", height: "auto" }}
                  ></Image>
                </Box>
                <Stack width={{ sm: "75%", xs: "100%" }} color={"var(--white)"}>
                  <Typography variant="h6" flexGrow={1}>
                    Opening Houres
                  </Typography>
                  <Typography component="p" flexGrow={1}>
                    Mon - Sat(8.00 - 6.00)
                  </Typography>
                  <Typography component="p">Sunday - Closed</Typography>
                </Stack>
              </Stack>
            </Box>
          </Col>
          <Col span={12} md={5}>
            <Typography color={"var(--white)"} variant="h5" fontWeight={"bold"}>
              Useful Links
            </Typography>
            <Box component={"ul"} className={styles.linkContainer}>
              {usefulLink &&
                usefulLink.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={styles.linkNavFooter}
                  >
                    {link.ic} {link.page}
                  </Link>
                ))}
            </Box>
          </Col>
          <Col span={24} md={9} className={styles.lastColFooter}>
            <Typography color={"var(--white)"} variant="h5" fontWeight={"bold"}>
              Recent Post
            </Typography>
            <Stack direction={"column"} gap={"1rem"} mt={"1rem"}>
              <MenuFoodCard
                img={food001}
                name="Is fastfood good for
your body?"
                desc="February 28,2022"
              ></MenuFoodCard>
            </Stack>
            <Stack direction={"column"} gap={"1rem"}>
              <MenuFoodCard
                img={food001}
                name="Is fastfood good for
your body?"
                desc="February 28,2022"
              ></MenuFoodCard>
            </Stack>
            <Stack direction={"column"} gap={"1rem"}>
              <MenuFoodCard
                img={food001}
                name="Is fastfood good for
your body?"
                desc="February 28,2022"
              ></MenuFoodCard>
            </Stack>
            <Stack direction={"column"} gap={"1rem"}>
              <MenuFoodCard
                img={food001}
                name="Is fastfood good for
your body?"
                desc="February 28,2022"
              ></MenuFoodCard>
            </Stack>
          </Col>
        </Row>
      </Box>
      <Stack
        flexWrap={"wrap"}
        direction={"row"}
        justifyContent={"space-between"}
        padding={"1rem 10%"}
        bgcolor={"var(--gray-2)"}
        alignItems={"center"}
      >
        <Typography width={"fit-content"} variant="h6" color={"#fff"}>
          Copyright © 2022 by Ayeman. All Rights Reserved.
        </Typography>
        <Stack
          component={"ul"}
          direction={"row"}
          sx={{ listStyleType: "none", gap: "1rem" }}
        >
          <Box component={"li"} className={styles.icProvider}>
            <FaFacebookF />
          </Box>
          <Box component={"li"} className={styles.icProvider}>
            <FaTwitter />
          </Box>

          <Box component={"li"} className={styles.icProvider}>
            <FaInstagram />
          </Box>
          <Box component={"li"} className={styles.icProvider}>
            <FaYoutube />
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}
