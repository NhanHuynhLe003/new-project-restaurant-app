import { Box, Button, Stack, Typography } from "@mui/material";
import * as React from "react";
import styles from "../../styles/checkout/checkoutPage.module.css";
import { LeftCheckout } from "../../components/checkoutPage";
import { MainLayout } from "../../components/layouts/main";
import { CheckoutModel } from "../../models";
import { useForm } from "react-hook-form";
import CartItemCheckout from "../../components/checkoutPage/cart-item-checkout";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { cartModel } from "../../models/cart";
import { API, Amplify } from "aws-amplify";
import amplifyConfig from "../../amplifyconfig.json";
const API_GW_NAME = "ag-manage-restaurant-project";
Amplify.configure(amplifyConfig);

export interface CheckoutPageProps {
  cartUser: cartModel;
  checkoutData: any;
}
const initValues: CheckoutModel = {
  order_address: {
    user_street: "",
    user_city: "",
    user_district: "",
  },
  order_billingAddress: true,
  order_email: "",
  order_phoneNumber: "",
  order_totalPrice: 0,
  order_userName: {
    user_firstName: "",
    user_lastName: "",
  },
  order_zipCode: "",
};
export default function CheckoutPage({
  cartUser,
  checkoutData,
}: CheckoutPageProps) {
  async function handleSubmitCheckout() {
    const formData: any = await getValues();
    formData.cartUser = cartUser;
    formData.checkoutData = checkoutData;
    alert("Data Test::: " + JSON.stringify(formData));
  }
  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: { ...initValues },
  });
  return (
    <MainLayout>
      <Box>
        <Stack
          direction={"row"}
          flexWrap={"wrap"}
          component={"form"}
          justifyContent={"space-between"}
          onSubmit={handleSubmit(handleSubmitCheckout)}
        >
          <Box className={styles.leftCheckout}>
            <Typography component={"h2"} variant="h5" pb="1rem">
              Shipping Address
            </Typography>
            <LeftCheckout
              control={control}
              isSubmitting={isSubmitting}
            ></LeftCheckout>
            <Stack
              className={styles.btnContainer}
              direction={"row"}
              gap={"1rem"}
              width={"100%"}
            >
              <Button
                sx={{
                  color: "#333",
                  background: "#fff",
                  width: "50%",
                  py: "0.7rem",
                }}
              >
                <FaArrowLeft style={{ margin: "0 1rem" }}></FaArrowLeft> Back to
                cart
              </Button>
              <Button
                type="submit"
                sx={{
                  color: "#fff",
                  background: "var(--primary-color)",
                  py: "0.7rem",
                  width: "50%",
                  ":hover": {
                    color: "var(--primary-color)",
                    background: "#fff",
                  },
                }}
              >
                Place an order{" "}
                <FaArrowRight style={{ margin: "0 1rem" }}></FaArrowRight>
              </Button>
            </Stack>
          </Box>
          <Box
            className={styles.rightCheckout}
            sx={{ boxShadow: "0 0 2px #ccc" }}
          >
            <Box className={styles.cartItemContainer}>
              {cartUser &&
                cartUser.cart_products &&
                cartUser.cart_products.map((item, index) => {
                  return (
                    <CartItemCheckout
                      key={index}
                      item={{
                        image: item.img ?? "",
                        name: item.name ?? "",
                        price: item.price || 0,
                        quantity: item.quantity || 0,
                      }}
                    ></CartItemCheckout>
                  );
                })}
            </Box>

            <Box className={styles.checkoutBillingCalculated} pt={"1rem"}>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                className={styles.subTotal}
              >
                <Typography>Sub-total</Typography>
                <Typography>{checkoutData.totalPrice}₫</Typography>
              </Stack>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                className={styles.shipping}
              >
                <Typography>Shipping</Typography>
                <Typography>{checkoutData.feeShip}</Typography>
              </Stack>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                className={styles.discount}
              >
                <Typography>Discount</Typography>
                <Typography>{checkoutData.totalDiscount}</Typography>
              </Stack>
              {/* <Stack
                direction={"row"}
                justifyContent={"space-between"}
                className={styles.tax}
              >
                <Typography>Tax</Typography>
                <Typography>10%</Typography>
              </Stack> */}
              <Stack
                sx={{ borderTop: "1px solid #ebebeb", pt: "1rem", mt: "1rem" }}
                direction={"row"}
                justifyContent={"space-between"}
                className={styles.tax}
              >
                <Typography style={{ fontWeight: 600 }}>Total</Typography>
                <Typography>{checkoutData.totalCheckout}₫</Typography>
              </Stack>
            </Box>
            <br />

            <Button
              type="submit"
              sx={{
                color: "#fff",
                background: "var(--primary-color)",
                py: "0.25rem",
                width: "100%",
                ":hover": {
                  color: "var(--primary-color)",
                  background: "#fff",
                },
              }}
            >
              Place an order
            </Button>
          </Box>
        </Stack>
      </Box>
      <Box my={"5rem"}></Box>
    </MainLayout>
  );
}
export const getServerSideProps: GetServerSideProps<CheckoutPageProps> = async (
  context: GetServerSidePropsContext
) => {
  const cartUserId = context.params?.cartUserId;
  const idCart = context.query?.cartId || "cart_001";

  let cartUserResult: cartModel = {
    cart_cartId: "",
    cart_products: [],
    cart_state: "",
    cart_userId: "",
  };
  let checkoutDataResponse: any = {};
  try {
    const dataCart = await API.get(
      API_GW_NAME,
      `/carts/${cartUserId}?cartId=${idCart}`,
      {}
    );
    cartUserResult = { ...dataCart };
    for (let i = 0; i < dataCart?.cart_products?.length; i++) {
      // lay ra sp trong dsach gio hang
      const productInCart = dataCart?.cart_products[i];
      const { productId, productType } = productInCart;
      // kiểm tra lại thông tin của food trước khi truyền đi tránh trường hợp ng khác can thiệp sửa dữ liệu
      const productFoodFound =
        productId &&
        productType &&
        (await API.get(
          API_GW_NAME,
          `/foods/${productId}?type=${productType}`,
          {}
        ));
      if (!productFoodFound) throw new Error("Product is not existed! ");

      cartUserResult.cart_products[i].price = productFoodFound.food_price;
      cartUserResult.cart_products[i].name = productFoodFound.food_name;
      cartUserResult.cart_products[i].img = productFoodFound.food_img;

      // console.log("dataResponse::: ", dataResponse);
    }
    const bodyReqCheckout = { ...cartUserResult };
    checkoutDataResponse = await API.get(API_GW_NAME, "/checkouts", {
      body: bodyReqCheckout,
    });
  } catch (err) {
    console.error(err);
  }
  checkoutDataResponse = JSON.parse(checkoutDataResponse?.payload.body);
  checkoutDataResponse = checkoutDataResponse.payload;
  console.log("checkoutDataResponse:::", checkoutDataResponse);
  return {
    props: {
      cartUser: cartUserResult,
      checkoutData: checkoutDataResponse,
    },
  };
};
