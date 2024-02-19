import { Box, Stack, Typography } from "@mui/material";
import * as React from "react";
import styles from "../../styles/checkout/cartItemCheckout.module.css";
import Image from "next/image";

export interface CartItem {
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface CartItemCheckoutProps {
  item: CartItem;
}

export default function CartItemCheckout(props: CartItemCheckoutProps) {
  const { item } = props;

  return (
    <Stack className={styles.cartItemCheckout}>
      <Box className={styles.cartItemImg}>
        <Image
          src={item.image}
          alt={item.name}
          width={0}
          height={0}
          loading="lazy"
        />
      </Box>
      <Box className={styles.cartInfo}>
        <Box className={styles.cartItemName}>{item.name}</Box>
        <Box className={styles.cartItemPrice}>{item.price}₫</Box>
      </Box>
      <Stack
        className={styles.cartQuantityItem}
        justifyContent={"center"}
        alignContent={"center"}
      >
        <Typography
          component={"p"}
          sx={{ fontSize: 16, fontWeight: "500", opacity: 0.8 }}
        >
          x {item.quantity}
        </Typography>
      </Stack>
    </Stack>
  );
}
