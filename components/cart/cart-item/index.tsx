import {
  Box,
  Button,
  Stack,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { Col, Rate, Row } from "antd";
import Image, { StaticImageData } from "next/image";
import * as React from "react";
import styles from "../../../styles/cart/cart-item.module.css";
import { productCart } from "../../../models/cart";

export default function CartItem({
  img,
  name,
  rating,
  quantity,
  price,
}: productCart) {
  const [prodQuan, setProdQuan] = React.useState(quantity);
  function handleIncQuan() {
    setProdQuan(prodQuan + 1);
  }

  function handleDesQuan() {
    setProdQuan(prodQuan - 1);
  }

  return (
    <Row style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <Col sm={{ span: 8 }} className={styles.centerCol}>
        <Stack direction={"row"} gap={"0.5rem"} alignItems={"center"}>
          <Image
            src={img || "https://placehold.co/300x150"}
            alt={`name-product-${name}`}
            width={0}
            height={0}
            style={{ width: "30%", height: "auto" }}
          ></Image>

          <Box>
            <Typography component={"p"} fontWeight={"600"} fontSize={"14px"}>
              {name}
            </Typography>
            <Rate allowHalf value={rating || 5} disabled></Rate>
          </Box>
        </Stack>
      </Col>
      <Col sm={{ span: 4 }} className={styles.centerCol}>
        {price}đ
      </Col>
      <Col sm={{ span: 4 }} className={styles.centerCol}>
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
        style={{ fontWeight: "bold" }}
        className={styles.centerCol}
      >
        {Number(price) * Number(prodQuan)}đ
      </Col>
      <Col sm={{ span: 4 }} className={styles.centerCol}>
        <Button
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
  );
}
