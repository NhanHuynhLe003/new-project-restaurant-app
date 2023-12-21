import * as React from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Auth, Amplify, API } from "aws-amplify";
import amplifyConfig from "../amplifyconfig.json";
import { FoodModel } from "../models";
const { v4: uuidv4 } = require("uuid");

const API_GW_NAME = "ag-manage-restaurant-project";
const API_KEY = "dgt6PuOZHY1Ot9ZXtbN0x1ZpZyRcilJY2phtxcnB";

Amplify.configure(amplifyConfig);

export interface LoginProps {}

export default function Login(props: LoginProps) {
  const handleCreateFood = async function (payload: FoodModel) {
    try {
      const user = await Auth.currentSession(); // lay ra thong tin user
      const idToken = await user.getIdToken().getJwtToken();
      console.log("idToken:::", idToken);

      //bắt buộc config api key về throtling ... thì mới sử dụng được
      const headerReq = {
        body: payload,
        headers: {
          Authorization: idToken,
          "x-api-key": API_KEY,
        },
      };
      const food = await API.post(API_GW_NAME, "/foods", headerReq);
    } catch (err) {
      console.error("err:::::", err);
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Login</h1>
      <Authenticator signUpAttributes={["name"]}>
        {({ signOut, user }) => (
          <main>
            <h1>Hello {user?.username}</h1>

            <button onClick={signOut}>Sign out</button>
          </main>
        )}
      </Authenticator>
    </div>
  );
}
