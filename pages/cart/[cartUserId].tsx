import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Box, Stack, Typography } from "@mui/material";
import { Col, Input, Row } from "antd";
import { SearchProps } from "antd/es/input";
import { API, Amplify, Auth } from "aws-amplify";
import clsx from "clsx";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import * as React from "react";
import amplifyConfig from "../../amplifyconfig.json";
import CartItem from "../../components/cart/cart-item";
import { MainLayout } from "../../components/layouts/main";
import { cartModel } from "../../models/cart";
import styles from "../../styles/cart/cart.module.css";
const { v4: uuidv4 } = require("uuid");

const API_GW_NAME = "ag-manage-restaurant-project";
Amplify.configure(amplifyConfig);

const { Search } = Input;
const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
  console.log(value);
export interface CartPageProps {
  cartPayload: cartModel;
}

export default function CartPage({ cartPayload }: CartPageProps) {
  const router = useRouter();
  const cartUserId = React.useRef(router.query?.cartUserId);
  const [isCorrectCart, setIsCorrectCart] = React.useState(false);
  const [totalCartProduct, setTotalCartProduct] = React.useState(0);
  const [discountPrice, setDiscountPrice] = React.useState(0);

  React.useLayoutEffect(() => {
    async function checkCorrectUserCart() {
      try {
        const user = await Auth.currentUserInfo();
        const curQueryUrl = router.query?.cartUserId;
        setIsCorrectCart(curQueryUrl === user.username);
      } catch (err) {
        console.error(err);
      }

      // chỉ hiển thị giỏ hàng với user đã đăng nhập
    }
    checkCorrectUserCart();
  }, []);

  React.useEffect(() => {
    //update tổng số lượng
    let totalProductCart = 0;
    for (let i = 0; i < cartPayload?.cart_products?.length; i++) {
      let prod = cartPayload?.cart_products[i];

      prod.price
        ? (totalProductCart += Number(prod.price) * Number(prod.quantity))
        : (totalProductCart += 0);
    }

    setTotalCartProduct(totalProductCart);
  });
  return (
    <MainLayout>
      {isCorrectCart ? (
        <Box sx={{ mb: "10rem" }}>
          <Box>
            <Row>
              <Col sm={{ span: 8 }} xs={{ span: 0 }}>
                <Typography variant="h5" component={"h2"} fontWeight={"600"}>
                  Product
                </Typography>
              </Col>
              <Col sm={{ span: 4 }} xs={{ span: 0 }}>
                <Typography variant="h5" component={"h2"} fontWeight={"600"}>
                  Price
                </Typography>
              </Col>
              <Col sm={{ span: 4 }} xs={{ span: 0 }}>
                <Typography variant="h5" component={"h2"} fontWeight={"600"}>
                  Quantity
                </Typography>
              </Col>
              <Col sm={{ span: 4 }} xs={{ span: 0 }}>
                <Typography variant="h5" component={"h2"} fontWeight={"600"}>
                  Total
                </Typography>
              </Col>
              <Col sm={{ span: 4 }} xs={{ span: 0 }}>
                <Typography variant="h5" component={"h2"} fontWeight={"600"}>
                  Remove
                </Typography>
              </Col>
            </Row>
            {cartPayload && cartPayload.cart_products.length > 0 ? (
              cartPayload.cart_products.map((foodProduct) => {
                return (
                  <CartItem
                    cartUserId={
                      typeof cartUserId.current === "string"
                        ? cartUserId.current
                        : "none"
                    }
                    productId={foodProduct.productId}
                    productType={foodProduct.productType}
                    key={foodProduct.productId}
                    img={foodProduct.img}
                    name={foodProduct.name || ""}
                    price={foodProduct.price || 0}
                    quantity={foodProduct.quantity}
                    rating={4}
                  ></CartItem>
                );
              })
            ) : (
              <h4
                style={{
                  textAlign: "center",
                  margin: "10% auto",
                  opacity: 0.4,
                  width: "90%",
                }}
              >
                Chưa có sản phẩm trong giỏ hàng
              </h4>
            )}
          </Box>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            gap={"1rem"}
            mt={"8rem"}
          >
            <Stack
              sx={{
                width: { sm: "50%", xs: "90%" },
                border: "1px solid #ccc",
                mx: { xs: "auto" },
                p: "1rem 1rem 2rem 1rem",
                borderRadius: "6px",
                height: "fit-content",
              }}
            >
              <Typography component={"h3"} variant="h5" fontWeight={"bold"}>
                Mã giảm giá
              </Typography>
              <Box component={"p"} sx={{ opacity: 0.4 }}>
                Nếu bạn có mã giảm giá, bạn có thể áp dụng tại đây
              </Box>
              <Search
                className={styles.inputContainerCoupon}
                placeholder="Nhập mã tại đây"
                onSearch={onSearch}
                enterButton={
                  <button className={styles.applyBtn}>Áp Dụng</button>
                }
              />
            </Stack>
            <Stack
              sx={{
                width: { sm: "50%", xs: "90%" },
                border: "1px solid #ccc",
                // p: "1rem",
                mx: { xs: "auto" },

                position: "relative",
                borderRadius: "6px",
              }}
            >
              <Box sx={{ p: "1rem 1rem 0.5rem 1rem" }}>
                <Typography component={"h3"} variant="h5" fontWeight={"bold"}>
                  Tổng đơn hàng
                </Typography>
                <Stack
                  justifyContent={"space-between"}
                  flexDirection={"row"}
                  alignItems={"center"}
                >
                  <p className={clsx(styles.subtotal, styles.leftColBill)}>
                    Giá trị đơn hàng
                  </p>
                  <p
                    className={clsx(styles.priceSubtotal, styles.rightColBill)}
                  >
                    {totalCartProduct || 0}
                  </p>
                </Stack>

                <Stack
                  justifyContent={"space-between"}
                  flexDirection={"row"}
                  alignItems={"center"}
                  sx={{ opacity: 0.4 }}
                >
                  <p className={clsx(styles.subShipCharge, styles.leftColBill)}>
                    Phí giao hàng
                  </p>
                  <p className={clsx(styles.shipCharge, styles.rightColBill)}>
                    0
                  </p>
                </Stack>

                <Stack
                  justifyContent={"space-between"}
                  flexDirection={"row"}
                  alignItems={"center"}
                  sx={{ opacity: 0.4 }}
                >
                  <p className={clsx(styles.subShipCharge, styles.leftColBill)}>
                    Giảm giá
                  </p>
                  <p className={clsx(styles.shipCharge, styles.rightColBill)}>
                    {discountPrice}
                  </p>
                </Stack>
              </Box>

              <Box>
                <Stack
                  justifyContent={"space-between"}
                  flexDirection={"row"}
                  alignItems={"center"}
                  p={"0.5rem 1rem"}
                  borderTop={"1px solid #ccc"}
                >
                  <p className={clsx(styles.subTotalCart, styles.leftColBill)}>
                    Tổng tiền
                  </p>
                  <p className={clsx(styles.totalCart, styles.rightColBill)}>
                    {totalCartProduct - discountPrice}
                  </p>
                </Stack>
              </Box>

              <button className={styles.checkoutBtn}>Kiểm tra đơn hàng</button>
            </Stack>
          </Stack>
        </Box>
      ) : (
        <Box sx={{ textAlign: "center" }}>
          <h2 style={{ width: "90%" }}>Giỏ hàng không tồn tại</h2>
        </Box>
      )}
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps<CartPageProps> = async (
  context: GetServerSidePropsContext
) => {
  const cartUserId = context.params?.cartUserId;
  const idCart = context.query?.cartId || "cart_001";

  // Tối ưu yêu cầu người dùng

  // context.res.setHeader(
  //   "Cache-Control",
  //   "s-maxage=5, stale-while-revalidate=5"
  // );

  let dataResponse: cartModel = {
    cart_cartId: "",
    cart_products: [],
    cart_state: "",
    cart_userId: "",
  };

  try {
    const dataCart = await API.get(
      API_GW_NAME,
      `/carts/${cartUserId}?cartId=${idCart}`,
      {}
    );
    dataResponse = { ...dataCart };

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

      dataResponse.cart_products[i].price = productFoodFound.food_price;
      dataResponse.cart_products[i].name = productFoodFound.food_name;
      dataResponse.cart_products[i].img = productFoodFound.food_img;

      // console.log("dataResponse::: ", dataResponse);
    }
  } catch (err) {
    console.error(err);
  }
  // const foodInCart = await API.get(API_GW_NAME, `/foods/${foodIdParams}`, {});
  return {
    props: {
      cartPayload: dataResponse,
    },
  };
};
