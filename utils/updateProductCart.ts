import { Amplify, Auth, API } from "aws-amplify";
import amplifyConfig from "../amplifyconfig.json";
const API_GW_NAME = "ag-manage-restaurant-project";
Amplify.configure(amplifyConfig);
const updateProductCart = async ({
  apiUrl = "",
  cartUserId = "",
  cartId = "cart_001",
  product = {},
}) => {
  const res = await API.post(API_GW_NAME, "/carts", {
    body: {
      cart_userId: cartUserId,
      cart_cartId: cartId,
      cart_state: "active",
      product: { ...product, discounts: [] },
    },
  });

  return res;
};

export { updateProductCart };
