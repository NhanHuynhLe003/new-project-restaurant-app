import React, { useCallback, useEffect, useState } from "react";
import { Row, Col, Menu, Drawer, Button, message, Input } from "antd";
import {
  ShoppingCartOutlined,
  UserOutlined,
  MenuOutlined,
  SearchOutlined,
} from "@ant-design/icons";

import { navRoute } from "./routes-nav";
import { Amplify, Auth } from "aws-amplify";
import amplifyConfig from "../../../amplifyconfig.json";
import Link from "next/link";
import styles from "../../../styles/header/navbar.module.css";
import { Alert, Box, CircularProgress, Snackbar, Stack } from "@mui/material";

import { useRouter } from "next/router";

Amplify.configure(amplifyConfig);

const API_GW_NAME = "ag-manage-restaurant-project";
const API_KEY = "dgt6PuOZHY1Ot9ZXtbN0x1ZpZyRcilJY2phtxcnB";

const { Search } = Input;
export default function NavBar() {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(false);
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [messageAuth, setMessageAuth] = useState({
    state: true,
    message: "Login Success",
  });
  const [isLoading, setLoading] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [curLinkActive, setCurLinkActive] = useState("");
  const [logAdmin, setLogAdmin] = useState(false);
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

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  async function handleAuthClick() {
    if (isLogin) {
      try {
        setLogoutLoading(true);
        await Auth.signOut().catch((err) => console.error(err));
        setLogoutLoading(false);
        setMessageAuth({ message: "Logout Success", state: true });
        setOpenAlert(true);
        setIsLogin(false);
      } catch (error) {
        setMessageAuth({ message: "Failed to logout", state: false });
      }
      return;
    }

    router.push("/login");
  }

  React.useEffect(() => {
    async function checkAuthen() {
      try {
        const user = await Auth.currentSession();
        const role = await user?.getAccessToken()?.payload["cognito:groups"];

        if (role) {
          setLogAdmin(true);
        }

        if (user) {
          setIsLogin(true);
        }
      } catch (err) {
        setIsLogin(false);
        setLogAdmin(false);
      }
    }
    checkAuthen();
  }, []);

  const RouteMap = navRoute.filter((route) =>
    isLogin ? (logAdmin ? route : !route.isAdmin) : !route.requiredLogin
  );

  console.log(RouteMap);

  const handleDrawerOpen = () => {
    setVisibleDrawer(true);
  };

  const handleDrawerClose = () => {
    setVisibleDrawer(false);
  };

  return (
    <nav className={styles.NavBar}>
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={messageAuth.state ? "success" : "error"}
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
                <Button type="text" style={{ color: "#fff" }}>
                  <ShoppingCartOutlined />
                </Button>
              </Box>
              <Box component={"li"} title="user information">
                <Button
                  onClick={handleAuthClick}
                  type="text"
                  style={{ color: "#fff", fontWeight: "bold" }}
                >
                  {isLogin ? "Logout" : "Login"}{" "}
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
