import { Alert, Box, Button, Snackbar, Stack, Typography } from "@mui/material";
import { Col, Rate, Row, Spin } from "antd";
import { API } from "aws-amplify";
import Image from "next/image";
import { useRouter } from "next/router";
import * as React from "react";
import { productCart } from "../../../models/cart";
import styles from "../../../styles/cart/cart-item.module.css";
import clsx from "clsx";

const API_GW_NAME = "ag-manage-restaurant-project";
const API_KEY = "dgt6PuOZHY1Ot9ZXtbN0x1ZpZyRcilJY2phtxcnB";

export interface cartProductProps extends productCart {
  cartUserId: string;
  cartId?: string;
}

export default function CartItem({
  cartUserId,
  cartId = "cart_001",
  productId,
  img,
  name,
  rating,
  quantity,
  price,
}: cartProductProps) {
  const [prodQuan, setProdQuan] = React.useState(quantity);

  const [messageAuth, setMessageAuth] = React.useState({
    isActive: false,
    autoHideTime: 10000,
    state: 2,
    message: <span></span>,
  });
  const router = useRouter();

  function handleIncQuan() {
    setProdQuan(prodQuan + 1);
  }

  function handleDesQuan() {
    prodQuan > 1 ? setProdQuan(prodQuan - 1) : setProdQuan(1);
  }
  function handleCloseAlert() {
    setMessageAuth((prev) => ({ ...prev, isActive: false }));
  }

  async function handleDeleteCart() {
    const options = {
      body: {
        cart_userId: cartUserId, //user so huu cart, co the dung userId khi login
        cart_cartId: cartId, //tao ngau nhien
        cart_state: "active", //['active', 'completed', 'failed', 'pending']
        product: {
          productId: productId,
        },
      },
    };
    try {
      setMessageAuth((prev) => ({
        ...prev,
        state: 1,
        autoHideTime: 10000,
        message: (
          <span>
            <Spin></Spin>{" "}
            <span
              style={{
                paddingLeft: "1rem",
                color: "#808080",
              }}
            >
              Đang xóa sản phẩm
            </span>
          </span>
        ),
        isActive: true,
      }));
      const response = await API.del(
        API_GW_NAME,
        "/carts/product",
        options
      ).then(() => router.push(`/cart/${cartUserId}`));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <Snackbar
        open={messageAuth.isActive}
        autoHideDuration={messageAuth.autoHideTime}
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
        style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}
        className={styles.itemCartCard}
      >
        <Col xs={{ span: 8 }} className={styles.centerCol}>
          <Stack direction={"row"} gap={"0.5rem"} alignItems={"center"}>
            <Image
              src={img || "https://placehold.co/300x150"}
              alt={`name-product-${name}`}
              width={0}
              height={0}
              className={styles.imgCartItem}
              // style={{ width: "30%", height: "auto" }}
            ></Image>

            <Box>
              <Typography
                component={"p"}
                fontWeight={"600"}
                className={styles.titleItemCart}
              >
                {name}
              </Typography>
              <Box display={{ xs: "none", sm: "block" }}>
                <Rate allowHalf value={rating || 5} disabled></Rate>
              </Box>
            </Box>
          </Stack>
        </Col>
        <Col
          sm={{ span: 4 }}
          className={clsx(styles.centerCol, styles.hideCol)}
        >
          <span style={{ fontSize: 16 }}>{price}đ</span>
        </Col>
        <Col sm={{ span: 4 }} xs={{ span: 8 }} className={styles.centerCol}>
          <Stack
            direction={"row"}
            style={{
              border: "1px solid #ccc",
              borderRadius: "1rem",
              width: "fit-content",
            }}
            alignItems={"center"}
          >
            <button
              onClick={handleDesQuan}
              style={{
                padding: "0.5rem 1rem",
                border: "none",
                borderRadius: "16px 0 0 16px",
                cursor: "pointer",
              }}
            >
              -
            </button>
            <input
              disabled
              type="text"
              placeholder="quantity?"
              value={prodQuan}
              style={{
                width: "2rem",
                textAlign: "center",
                border: "none",
              }}
            ></input>
            <button
              onClick={handleIncQuan}
              style={{
                cursor: "pointer",
                padding: "0.5rem 1rem",
                border: "none",
                borderRadius: "0 16px 16px 0",
              }}
            >
              +
            </button>
          </Stack>
        </Col>
        <Col
          sm={{ span: 4 }}
          style={{ fontWeight: "bold", fontSize: 16 }}
          className={styles.centerCol}
        >
          {Number(price) * Number(prodQuan)}đ
        </Col>
        <Col sm={{ span: 3 }} className={styles.centerCol}>
          <Button
            onClick={handleDeleteCart}
            disabled={messageAuth.state === 1}
            variant="text"
            fullWidth
            color="inherit"
            sx={{
              ":hover": {
                color: "var(--primary-color)",
              },
            }}
          >
            X
          </Button>
        </Col>
      </Row>
    </>
  );
}
