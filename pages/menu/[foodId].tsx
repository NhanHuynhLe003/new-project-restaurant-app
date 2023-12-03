import { API, Amplify } from "aws-amplify";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import * as React from "react";
import { useRouter } from "next/router";
import { FoodModel } from "../../models";
import amplifyConfig from "../../amplifyconfig.json";
import { handleConvertObjectDdb } from "../../utils/handleResDataDynamodb";
export interface FoodDetailProps {
  food: FoodModel;
}
const API_GW_NAME = "ag-manage-restaurant-project";
Amplify.configure(amplifyConfig);
export default function FoodDetail({ food }: FoodDetailProps) {
  // const router = useRouter();

  // const { foodId } = router.query;
  // console.log(foodId);

  if (!food) return <div>No Data</div>;
  return (
    <div>
      <h1>Food Detail</h1>
      {/* <p>{food.food_img}</p> */}
      <p>{food.food_name}</p>
      <p>{food.food_desc}</p>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const foodListData: FoodModel[] = await API.get(API_GW_NAME, "/foods", {});
  const dataConvert = handleConvertObjectDdb(foodListData);
  return {
    paths: dataConvert.map((food, index) => ({
      params: { foodId: `${food.food_id}-type=${food.food_type}` },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<FoodDetailProps> = async (
  context: GetStaticPropsContext
) => {
  let foodIdParams = context.params?.foodId;

  if (!foodIdParams) return { notFound: true };
  if (typeof foodIdParams == "string") {
    foodIdParams = foodIdParams.replace("-type", "?type");
  }

  const data = await API.get(API_GW_NAME, `/foods/${foodIdParams}`, {});

  return {
    props: {
      food: data,
    },
    revalidate: 180,
  };
};
