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
            <button
              onClick={() =>
                handleCreateFood({
                  food_id: uuidv4(),
                  food_img:
                    "https://i.pinimg.com/originals/0e/e0/0f/0ee00fc53821534999a417419c58755f.jpg",
                  food_desc:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, sint. Quia amet ex reiciendis itaque quae quisquam provident odit. Deserunt?",
                  food_availability: true,
                  food_ingredients: [
                    "Buns",
                    "Patty",
                    "Vegetables",
                    "Sauce",
                    "Cheese",
                    "Bacon",
                  ],

                  food_name: "Pizza",
                  food_rating: 4.5,
                  food_type: "fast_food",
                  food_price: 45000,
                  food_tags: ["fast_food", "food", "fat_food"],
                  created_at: String(new Date()),
                  updated_at: String(new Date()),
                })
              }
            >
              Send
            </button>
            <button onClick={signOut}>Sign out</button>
          </main>
        )}
      </Authenticator>
    </div>
  );
}
