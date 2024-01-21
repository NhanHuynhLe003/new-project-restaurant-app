import {
  MenuOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Col, Drawer, Input, Menu, Row } from "antd";
import React, { useEffect, useState } from "react";

import { Alert, Box, CircularProgress, Snackbar, Stack } from "@mui/material";
import { Amplify, Auth } from "aws-amplify";
import Link from "next/link";
import amplifyConfig from "../../../amplifyconfig.json";
import styles from "../../../styles/header/navbar.module.css";
import { navRoute } from "./routes-nav";

import { useRouter } from "next/router";
import { useAuth } from "../../../contexts/AuthContext";

Amplify.configure(amplifyConfig);

const API_GW_NAME = "ag-manage-restaurant-project";
const API_KEY = "dgt6PuOZHY1Ot9ZXtbN0x1ZpZyRcilJY2phtxcnB";

const { Search } = Input;
export default function NavBar() {
  const { isAuthenticated, checkUser, isAdminAuth } = useAuth();
  React.useEffect(() => {
    checkUser();
  }, []);
  const router = useRouter();

  const [visibleDrawer, setVisibleDrawer] = useState(false);

  const [messageAuth, setMessageAuth] = useState({
    isActive: false,
    state: 1,
    message: "Login Success",
  });
  const [isLoading, setLoading] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [curLinkActive, setCurLinkActive] = useState("");

  useEffect(() => {
    const handleStart = () => {
      setLoading(true);
    };
    const handleComplete = () => {
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router.events]);

  function handleCloseAlert() {
    setMessageAuth((prev) => ({ ...prev, isActive: false }));
  }
  async function handleAuthClick() {
    if (isAuthenticated) {
      try {
        setLogoutLoading(true);
        await Auth.signOut();
        checkUser();

        setLogoutLoading(false);
        setMessageAuth((prev) => ({
          ...prev,
          state: 2,
          message: "Đăng xuất thành công",
          isActive: true,
        }));
        //refresh page
        router.push("/");
      } catch (error) {
        await Auth.signOut();

        setMessageAuth((prev) => ({
          ...prev,
          state: 0,
          message: "Đăng xuất không thành công, vui long thử lại ",
          isActive: true,
        }));
      }
      return;
    }
    // await Auth.signOut();

    router.push("/login");
  }

  const RouteMap = navRoute.filter((route) =>
    isAuthenticated
      ? isAdminAuth
        ? route
        : !route.isAdmin
      : !route.requiredLogin
  );

  const handleCartUser = async () => {
    try {
      const user = await Auth.currentUserInfo();
      const linkToCartUserLogined = `/cart/${user.username}`;
      router.push(linkToCartUserLogined);
    } catch (err) {
      setMessageAuth((prev) => ({
        ...prev,
        state: 1,
        message: "Vui lòng đăng nhập để xem giỏ hàng",
        isActive: true,
      }));
    }
  };

  const handleDrawerOpen = () => {
    setVisibleDrawer(true);
  };

  const handleDrawerClose = () => {
    setVisibleDrawer(false);
  };

  return (
    <nav className={styles.NavBar}>
      <Snackbar
        open={messageAuth.isActive}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={
            messageAuth.state === 0
              ? "error"
              : messageAuth.state === 1
              ? "info"
              : "success"
          }
          sx={{ width: "100%" }}
        >
          {messageAuth.message}
        </Alert>
      </Snackbar>
      <Row
        className={styles.NavContainer}
        justify="space-between"
        align="middle"
      >
        <Col
          className={styles.LogoPage}
          span={24}
          xl={{ span: 2 }}
          style={{ fontSize: "24px", fontWeight: "bold" }}
        >
          <span style={{ color: "var(--primary-color)" }}>Food</span>Tuck
        </Col>
        <Col
          span={0}
          sm={{ span: 24 }}
          md={{ span: 10 }}
          className={styles.menuCol}
        >
          <ul className={styles.listPage}>
            {RouteMap &&
              RouteMap.map((route, index) => {
                return (
                  <Stack
                    onClick={() => setCurLinkActive(route.path)}
                    component={"li"}
                    key={route.page}
                    direction={"row"}
                    alignItems={"center"}
                  >
                    <CircularProgress
                      style={{
                        width: "1rem",
                        height: "1rem",
                        color: "var(--primary-color)",
                        marginRight: "0.25rem",
                        display:
                          isLoading && curLinkActive === route.path
                            ? "block"
                            : "none",
                      }}
                    ></CircularProgress>
                    <Link
                      className={
                        router.pathname === route.path
                          ? styles.activeLink
                          : styles.routeLink
                      }
                      href={route.path}
                    >
                      {route.page}
                    </Link>
                  </Stack>
                );
              })}
          </ul>
        </Col>
        <Col
          span={24}
          sm={{ span: 24 }}
          md={{ span: 10 }}
          className={styles.actionCol}
        >
          <Stack
            flexDirection={{ xs: "column", sm: "row" }}
            alignItems={"center"}
            justifyContent={"center"}
            gap={"1rem"}
            flexWrap={{ sm: "wrap" }}
          >
            <Stack
              component={"ul"}
              justifyContent={{ xs: "space-between", sm: "flex-start" }}
              direction={"row"}
              flexWrap={{ xs: "wrap", sm: "nowrap" }}
              className={styles.pageActionControl}
            >
              <Stack
                component={"li"}
                title="search product"
                direction={"row"}
                // width={{ xs: showSearch ? "100%" : "auto", sm: "auto" }}
                // order={{ xs: showSearch ? "2" : "1", sm: "1" }}
              >
                <Button
                  type="text"
                  style={{ color: "#fff" }}
                  onClick={() => setShowSearch(!showSearch)}
                >
                  <SearchOutlined />
                </Button>
              </Stack>
              <Box component={"li"} title="user information">
                <Button type="text" style={{ color: "#fff" }}>
                  <UserOutlined />
                </Button>
              </Box>
              <Box component={"li"} title="go to shopping cart">
                <Button
                  onClick={handleCartUser}
                  type="text"
                  style={{ color: "#fff" }}
                >
                  <ShoppingCartOutlined />
                </Button>
              </Box>
              <Box component={"li"} title="user information">
                <Button
                  onClick={handleAuthClick}
                  type="text"
                  style={{ color: "#fff", fontWeight: "bold" }}
                >
                  {isAuthenticated ? "Logout" : "Login"}{" "}
                  {logoutLoading ? (
                    <CircularProgress
                      style={{
                        width: "16px",
                        height: "16px",
                        marginLeft: "1rem",
                        color: "var(--primary-color)",
                      }}
                    ></CircularProgress>
                  ) : (
                    ""
                  )}
                </Button>
              </Box>
              <Box
                color="#fff"
                component={"li"}
                display={{ xs: "block", sm: "none" }}
                className={styles.menuIcon}
              >
                <Button
                  type="text"
                  style={{ color: "#fff" }}
                  icon={<MenuOutlined />}
                  onClick={handleDrawerOpen}
                />
              </Box>
            </Stack>
            <Box>
              <Search
                type="text"
                style={{
                  display: `${showSearch ? "block" : "none"}`,

                  color: "var(--white)",
                  // padding: "4px 8px",
                  flexGrow: 1,
                }}
                enterButton={
                  <Button
                    style={{
                      backgroundColor: "var(--primary-color)",
                      fontWeight: "600",
                      color: "#fff",
                    }}
                  >
                    <SearchOutlined />
                  </Button>
                }
              ></Search>
            </Box>
          </Stack>
        </Col>
      </Row>
      <Drawer
        title="Menu"
        placement="right"
        onClose={handleDrawerClose}
        open={visibleDrawer}
      >
        <Menu theme="dark" mode="vertical">
          {RouteMap.map((route, index) => (
            <Menu.Item key={index}>
              <Link href={route.path}>{route.page}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Drawer>
    </nav>
  );
}
