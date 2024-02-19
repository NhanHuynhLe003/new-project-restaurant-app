import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Alert, Box, Snackbar, Stack, Typography } from "@mui/material";
import { Col, Input, Row, Spin } from "antd";
import { SearchProps } from "antd/es/input";
import { API, Amplify, Auth } from "aws-amplify";
import clsx from "clsx";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { NextRouter, useRouter } from "next/router";
import * as React from "react";
import amplifyConfig from "../../amplifyconfig.json";
import CartItem from "../../components/cart/cart-item";
import { MainLayout } from "../../components/layouts/main";
import { cartModel } from "../../models/cart";
import styles from "../../styles/cart/cart.module.css";
import DiscountItemApply from "../../components/cart/discount-item-apply";
const { v4: uuidv4 } = require("uuid");

const API_GW_NAME = "ag-manage-restaurant-project";
Amplify.configure(amplifyConfig);

const { Search } = Input;

export interface CartPageProps {
  cartPayload: cartModel;
  totalPriceCalculated: {
    totalPrice: number;
    totalDiscount: number;
    feeShip: number;
    totalCheckout: number;
  };
}

export type messageAuthType = {
  isActive: boolean;
  state: number;
  autoHideTime: null | number;
  message: React.ReactNode;
};

export default function CartPage({
  cartPayload,
  totalPriceCalculated,
}: CartPageProps) {
  const router = useRouter();
  // useRef nên có kiểu trả về để biêt kiểu dữ liệu
  const applyInputRef = React.useRef<any>(null);
  const cartUserId = React.useRef(router.query?.cartUserId);
  const [valueApplyInput, setValueApplyInput] = React.useState("");
  const [isCorrectCart, setIsCorrectCart] = React.useState(false);

  const [messageAuth, setMessageAuth] = React.useState<messageAuthType>({
    isActive: false,
    state: 2,
    autoHideTime: null,
    message: <span></span>,
  });

  const onApplyDiscount = async (data: {
    codeValue: string;
    cartUserId: any;

    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>;
  }) => {
    try {
      const bodyHeader = {
        cart_userId: data.cartUserId, //user so huu cart, co the dung userId khi login
        cart_cartId: "cart_001", //tao ngau nhien
        cart_state: "active", //['active', 'completed', 'failed', 'pending']
        discount_id: data?.codeValue.trim(),
        discount_code: data?.codeValue.trim(),
      };

      setMessageAuth((prev) => ({
        ...prev,
        state: 1,
        autoHideTime: null,
        message: (
          <span>
            <Spin></Spin>{" "}
            <span
              style={{
                paddingLeft: "1rem",
                color: "#808080",
              }}
            >
              Đang kiểm tra vouncher
            </span>
          </span>
        ),
        isActive: true,
      }));

      // console.log("CODE::::", data.codeValue);
      await API.post(API_GW_NAME, "/carts/discount", {
        body: bodyHeader,
      }).then((_) => router.push(`/cart/${data.cartUserId}`));

      //clear input after called api
      setValueApplyInput("");
      setMessageAuth((prev) => ({
        ...prev,
        state: 2,
        autoHideTime: 1500,
        message: (
          <span>
            <span
              style={{
                paddingLeft: "1rem",
                color: "#808080",
              }}
            >
              Áp dụng vouncher thành công
            </span>
          </span>
        ),
        isActive: true,
      }));
    } catch (err) {
      setMessageAuth((prev) => ({
        ...prev,
        state: 0,
        autoHideTime: 2500,
        message: (
          <span>
            <span
              style={{
                paddingLeft: "1rem",
                color: "#808080",
              }}
            >
              Áp dụng vouncher không thành công
            </span>
          </span>
        ),
        isActive: true,
      }));
      console.error(err);
    }
  };

  function handleCloseAlert() {
    setMessageAuth((prev) => ({ ...prev, isActive: false }));
  }

  const handleClickCheckoutBtn = () => {
    // lay ra cartUserId tu url
    const cartUserIdPath = router.asPath.split("/")[2];

    router.push(`/checkout/${cartUserIdPath}`);
  };
  React.useEffect(() => {
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

  return (
    <MainLayout>
      <Snackbar
        autoHideDuration={messageAuth.autoHideTime}
        open={messageAuth.isActive}
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
      {isCorrectCart ? (
        <Box sx={{ mb: "10rem" }}>
          <Box>
            {cartPayload &&
            cartPayload.cart_products &&
            cartPayload.cart_products.length > 0 ? (
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
                placeholder="Nhập mã tại đây, ví dụ: HAPPYNEWYEAR2024 hoặc LIXI2024"
                onSearch={(val: string) => {
                  setValueApplyInput(val);
                  onApplyDiscount &&
                    onApplyDiscount({
                      codeValue: val,
                      cartUserId: cartUserId.current ?? "",
                    });
                }}
                onChange={(e) => setValueApplyInput(e.target.value)}
                value={valueApplyInput}
                enterButton={
                  <button className={styles.applyBtn}>Áp Dụng</button>
                }
              />
              <Box className={styles.discountCartContainer}>
                {cartPayload.cart_discounts &&
                  cartPayload.cart_discounts.map((discount, index) => {
                    return (
                      <DiscountItemApply
                        discountValue={
                          discount.discount_type === "percentage"
                            ? discount.discount_value + "%"
                            : discount.discount_value + "₫"
                        }
                        key={discount.discount_code}
                        cartUserId={cartPayload.cart_userId}
                        discountCode={discount.discount_code}
                        discountName={discount.discount_code}
                      ></DiscountItemApply>
                    );
                  })}
              </Box>
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
                    {totalPriceCalculated.totalPrice || 0}
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
                    {totalPriceCalculated.feeShip}
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
                    {totalPriceCalculated.totalDiscount}
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
                    {totalPriceCalculated.totalCheckout}
                  </p>
                </Stack>
              </Box>

              <button
                onClick={handleClickCheckoutBtn}
                className={styles.checkoutBtn}
              >
                Kiểm tra đơn hàng
              </button>
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
  let totalPriceCalculated = {
    totalPrice: 0,
    totalDiscount: 0,
    feeShip: 0,
    totalCheckout: 0,
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

    // tiền tạm tính
    const bodyReqCheckout = { ...dataResponse };
    // console.log("BODY REQ: ", bodyReqCheckout);
    const checkoutResponse = await API.get(API_GW_NAME, "/checkouts", {
      body: bodyReqCheckout,
    });
    const payloadConverted = JSON.parse(checkoutResponse.payload.body);

    totalPriceCalculated = payloadConverted.payload;
  } catch (err) {
    console.error(err);
  }
  // const foodInCart = await API.get(API_GW_NAME, `/foods/${foodIdParams}`, {});
  return {
    props: {
      cartPayload: dataResponse,
      totalPriceCalculated,
    },
  };
};
