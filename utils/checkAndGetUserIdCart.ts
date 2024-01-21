import { API, Amplify, Auth } from "aws-amplify";
import amplifyConfig from "../amplifyconfig.json";
const { v4: uuidv4 } = require("uuid");

const API_GW_NAME = "ag-manage-restaurant-project";
Amplify.configure(amplifyConfig);
/**
 *
 * @param {WindowLocalStorage} localStorage
 * @returns
 */
const checkAndGetUserIdCart = async (localStorage: any) => {
  let getUserIdCart = "";

  try {
    const curSession = await Auth.currentSession();
    const uNameId = curSession.getIdToken().payload["cognito:username"];
    getUserIdCart = uNameId;
  } catch (msgerr) {
    //check local storage

    const curUIdLocal = localStorage.getItem("Cart_UserId_Key");
    if (!curUIdLocal && msgerr === "No current user") {
      console.log(12345);
      const userIdCart = uuidv4();
      console.log("userIdCart:::", userIdCart);
      localStorage.setItem("Cart_UserId_Key", userIdCart);
      getUserIdCart = userIdCart;
    } else {
      getUserIdCart = curUIdLocal ? curUIdLocal : "";
    }
  }

  return getUserIdCart;
};
export { checkAndGetUserIdCart };
