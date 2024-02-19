import foodImgSection01 from "../../../assets/images/food-menu-section-01.jpg";
import foodImgSection02 from "../../../assets/images/food-menu-section-02.jpg";
import foodImgSection03 from "../../../assets/images/food-menu-section-03.jpg";
import type { NextApiRequest, NextApiResponse } from "next";
const listData = [
  {
    imgSection: foodImgSection01, // replace with your image path or StaticImageData
    isImgLeft: true,
    titleSection: "Delicious Foods",
    listMenu: [
      {
        name: "Pizza",
        description: "Delicious pizza with fresh ingredients",
        price: 15,
        gredients: ["Cheese", "Tomato", "Basil"],
      },
      {
        name: "Burger",
        description: "Juicy burger with lettuce and tomato",
        price: 10,
        gredients: ["Beef", "Lettuce", "Tomato"],
      },
      {
        name: "Pasta",
        description: "Italian pasta with a rich tomato sauce",
        price: 12,
        gredients: ["Pasta", "Tomato Sauce"],
      },
      {
        name: "Salad",
        description: "Fresh salad with a variety of vegetables",
        price: 8,
        gredients: ["Lettuce", "Cucumber", "Tomato"],
      },
      {
        name: "Steak",
        description: "Grilled steak with a side of vegetables",
        price: 20,
        gredients: ["Steak", "Vegetables"],
      },
      {
        name: "Fish",
        description: "Grilled fish with a lemon butter sauce",
        price: 18,
        gredients: ["Fish", "Lemon", "Butter"],
      },
    ],
  },
  {
    imgSection: foodImgSection02, // replace with your image path or StaticImageData
    isImgLeft: false,
    titleSection: "Delicious Foods",
    listMenu: [
      {
        name: "Pizza",
        description: "Delicious pizza with fresh ingredients",
        price: 15,
        gredients: ["Cheese", "Tomato", "Basil"],
      },
      {
        name: "Burger",
        description: "Juicy burger with lettuce and tomato",
        price: 10,
        gredients: ["Beef", "Lettuce", "Tomato"],
      },
      {
        name: "Pasta",
        description: "Italian pasta with a rich tomato sauce",
        price: 12,
        gredients: ["Pasta", "Tomato Sauce"],
      },
      {
        name: "Salad",
        description: "Fresh salad with a variety of vegetables",
        price: 8,
        gredients: ["Lettuce", "Cucumber", "Tomato"],
      },
      {
        name: "Steak",
        description: "Grilled steak with a side of vegetables",
        price: 20,
        gredients: ["Steak", "Vegetables"],
      },
      {
        name: "Fish",
        description: "Grilled fish with a lemon butter sauce",
        price: 18,
        gredients: ["Fish", "Lemon", "Butter"],
      },
    ],
  },
  {
    imgSection: foodImgSection03, // replace with your image path or StaticImageData
    isImgLeft: true,
    titleSection: "Delicious Foods",
    listMenu: [
      {
        name: "Pizza",
        description: "Delicious pizza with fresh ingredients",
        price: 15,
        gredients: ["Cheese", "Tomato", "Basil"],
      },
      {
        name: "Burger",
        description: "Juicy burger with lettuce and tomato",
        price: 10,
        gredients: ["Beef", "Lettuce", "Tomato"],
      },
      {
        name: "Pasta",
        description: "Italian pasta with a rich tomato sauce",
        price: 12,
        gredients: ["Pasta", "Tomato Sauce"],
      },
      {
        name: "Salad",
        description: "Fresh salad with a variety of vegetables",
        price: 8,
        gredients: ["Lettuce", "Cucumber", "Tomato"],
      },
      {
        name: "Steak",
        description: "Grilled steak with a side of vegetables",
        price: 20,
        gredients: ["Steak", "Vegetables"],
      },
      {
        name: "Fish",
        description: "Grilled fish with a lemon butter sauce",
        price: 18,
        gredients: ["Fish", "Lemon", "Butter"],
      },
    ],
  },
  {
    imgSection: foodImgSection01, // replace with your image path or StaticImageData
    isImgLeft: false,
    titleSection: "Delicious Foods",
    listMenu: [
      {
        name: "Pizza",
        description: "Delicious pizza with fresh ingredients",
        price: 15,
        gredients: ["Cheese", "Tomato", "Basil"],
      },
      {
        name: "Burger",
        description: "Juicy burger with lettuce and tomato",
        price: 10,
        gredients: ["Beef", "Lettuce", "Tomato"],
      },
      {
        name: "Pasta",
        description: "Italian pasta with a rich tomato sauce",
        price: 12,
        gredients: ["Pasta", "Tomato Sauce"],
      },
      {
        name: "Salad",
        description: "Fresh salad with a variety of vegetables",
        price: 8,
        gredients: ["Lettuce", "Cucumber", "Tomato"],
      },
      {
        name: "Steak",
        description: "Grilled steak with a side of vegetables",
        price: 20,
        gredients: ["Steak", "Vegetables"],
      },
      {
        name: "Fish",
        description: "Grilled fish with a lemon butter sauce",
        price: 18,
        gredients: ["Fish", "Lemon", "Butter"],
      },
    ],
  },
];
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  res.status(200).json(listData);
}
