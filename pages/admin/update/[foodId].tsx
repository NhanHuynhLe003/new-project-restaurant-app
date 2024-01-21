import { Authenticator } from "@aws-amplify/ui-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Card, CircularProgress, Typography } from "@mui/material";
import { Rate } from "antd";
import { API, Amplify, Auth } from "aws-amplify";
import { format } from "date-fns";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import * as React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import amplifyConfig from "../../../amplifyconfig.json";
import {
  AutoCompleteField,
  InputArea,
  InputField,
} from "../../../components/form";
import SelectFieldForm from "../../../components/form/select-field-form";
import SwitchField from "../../../components/form/switch-field";
import TextEditor from "../../../components/form/text-editor";
import UploadFile from "../../../components/uploadFile";
import ingredients from "../../../jsons/ingredientsV2.json";
import foodTags from "../../../jsons/tagsV2.json";
import { FoodModel } from "../../../models";
import { handleConvertObjectDdb } from "../../../utils/handleResDataDynamodb";
import { MainLayout } from "../../../components/layouts/main";
import { useAuth } from "../../../contexts/AuthContext";
const { v4: uuidv4 } = require("uuid");
export interface UpdateFoodPageProps {
  food: FoodModel;
}
const API_GW_NAME = "ag-manage-restaurant-project";
const API_KEY = "dgt6PuOZHY1Ot9ZXtbN0x1ZpZyRcilJY2phtxcnB";
Amplify.configure(amplifyConfig);
export default function UpdateFoodPage({ food }: UpdateFoodPageProps) {
  const { isAuthenticated, checkUser, isAdminAuth } = useAuth();
  const router = useRouter();

  const [fileUpload, setFileUpload] = React.useState<File>();
  const [loadingAuth, setLoadingAuth] = React.useState(true);
  const [imageFile, setImageFile] = React.useState<string | null>(
    food.food_img
  );
  const initValues = {
    id: food.food_id,
    img: food.food_img,
    description: food.food_desc,
    availability: food.food_availability,
    ingredients: food.food_ingredients,
    name: food.food_name,
    type: food.food_type,
    info: food.food_info,
    price: food.food_price,
    rating: food.food_rating,
    discount: food.food_discount,
    tags: food.food_tags,
  };

  const schema = yup.object().shape({
    id: yup.string().default(initValues.id),
    img: yup.string().default(initValues.img),
    description: yup
      .string()
      .label("Description")
      .default(initValues.description),
    availability: yup.boolean().default(initValues.availability),
    ingredients: yup.object().default(initValues.ingredients),
    rating: yup.number().default(initValues.rating ? initValues.rating : 0),
    discount: yup.string().default(initValues.discount),
    name: yup
      .string()
      .label("Name")
      .min(6)
      .trim()
      .default(initValues.name)
      .required("Please enter the name of the food."),
    info: yup.string().label("Info").default(initValues.info),
    type: yup
      .string()
      .label("Type")
      .default(initValues.type)
      .required("Please select the type of food."),
    price: yup
      .number()
      .label("Price")
      .default(initValues.price)
      .required("Please enter the price of the food."),
    tags: yup.object().default(initValues.tags),
  });

  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: { ...initValues },
    resolver: yupResolver(schema),
  });

  function getFileUrl(file: File) {
    //lấy file từ component bên trong
    if (file) {
      setFileUpload(file);
      const reader = new FileReader();
      reader.onloadend = async () => {
        setImageFile(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  }

  async function UploadImageToS3(
    file: File | undefined,
    fileName: string | undefined
  ) {
    if (file) {
      //read file and convert file to base64 and upload
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onloadend = async () => {
          try {
            const base64Str = reader.result?.toString().split(",")[1];

            const currentDate = new Date();

            // Format the date as "ddmmyyhhmmss"
            const formattedDate = format(currentDate, "dd-MM-yy/HHmmss");
            const headerReq = {
              body: {
                fileBuffer: base64Str,
                fileName: `${formattedDate}-${fileName}`,
              },
            };

            const response = await API.post(
              API_GW_NAME,
              "/image-food",
              headerReq
            );

            if (response) {
              const urlImgRes = response.imgPageUrl;

              //add urlImage Uploaded to img link
              resolve(urlImgRes);
            }
          } catch (err) {
            console.error(err);
            reject(err);
          }
        };
        reader.readAsDataURL(file);
      }).catch((err) => console.error(err));
    }
  }

  async function handleSubmitForm() {
    try {
      const urlImageUploaded = await UploadImageToS3(
        fileUpload,
        fileUpload?.name
      );
      const user = await Auth.currentSession(); // lay ra thong tin user
      const role = await user.getAccessToken().payload["cognito:groups"];

      const idToken = await user.getIdToken().getJwtToken();
      const val = await getValues();

      const payload = {
        food_id: val.id,
        food_img: urlImageUploaded || val.img,
        food_desc: val.description,
        food_availability: val.availability,
        food_ingredients: val.ingredients,
        food_discount: val.discount,
        food_info: val.info,
        food_name: val.name,
        food_rating: val.rating,
        food_type: val.type,
        food_price: val.price,
        food_tags: val.tags,
        created_at: String(new Date()),
        updated_at: String(new Date()),
      };

      const headerReq = {
        body: payload,
        headers: {
          Authorization: idToken,
          "x-api-key": API_KEY,
        },
      };
      const food = await API.post(API_GW_NAME, `/foods`, headerReq);
      //reset food after post food succeess
      reset();
      router.push("/admin");

      return food;
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <MainLayout>
      {isAdminAuth ? (
        <Box>
          <Typography
            component={"h1"}
            variant="h3"
            textAlign={"center"}
            color={"var(--primary-color)"}
          >
            Cập nhật thực đơn
          </Typography>

          {loadingAuth ? (
            <Card sx={{ width: "80%", mx: "auto", my: 4, p: 4 }}>
              <br />
              <Box component={"form"} onSubmit={handleSubmit(handleSubmitForm)}>
                <InputField
                  name="name"
                  label="name"
                  control={control}
                  disabled={isSubmitting ? true : false}
                ></InputField>

                <br />

                <InputField
                  name="price"
                  label="price"
                  control={control}
                  type="number"
                  disabled={isSubmitting ? true : false}
                ></InputField>
                <br />
                <br />
                <Typography component={"h3"} variant="h5">
                  Phân loại món ăn
                </Typography>
                <br />
                <SelectFieldForm
                  label={"type"}
                  name="type"
                  control={control}
                  options={["uncategorized", "food", "drink", "other"]}
                  disabled={isSubmitting ? true : false}
                />
                <br />
                <br />
                <br />
                <Typography component={"h3"} variant="h5">
                  Giới thiệu
                </Typography>
                <br />
                <InputArea
                  style={{
                    width: "100%",
                    minHeight: "8rem",
                    padding: "0.5rem",
                  }}
                  name="info"
                  label="info"
                  control={control}
                  disabled={isSubmitting ? true : false}
                  placeholder="nhập giới thiệu cho món ăn "
                ></InputArea>
                <br />
                <br />
                <Typography component={"h3"} variant="h5">
                  Tag
                </Typography>
                <br />
                <AutoCompleteField
                  disabled={isSubmitting}
                  control={control}
                  dataList={foodTags}
                  name={"tags"}
                  placeholder="Chọn tag hiện có hoặc tạo 1 tag mới"
                ></AutoCompleteField>
                <br />
                <br />
                <Typography component={"h3"} variant="h5">
                  Đánh giá
                </Typography>
                <br />
                <Rate
                  onChange={(rating) => setValue("rating", rating)}
                  defaultValue={5}
                ></Rate>
                <br />
                <br />
                <br />
                <Typography component={"h3"} variant="h5">
                  Giảm giá sản phẩm
                </Typography>

                <InputField
                  control={control}
                  name="discount"
                  label={"nhập phần trăm giảm giá (vd: 10)"}
                ></InputField>
                <br />
                <br />
                <br />
                <Typography component={"h3"} variant="h5">
                  Thành phần món ăn
                </Typography>
                <br />
                <AutoCompleteField
                  disabled={isSubmitting}
                  control={control}
                  dataList={ingredients}
                  name={"ingredients"}
                  placeholder="Chọn thành phần món ăn hiện có hoặc tạo 1 thành phần mới"
                ></AutoCompleteField>

                <br />
                <Typography component={"h3"} variant="h5">
                  Hình ảnh món ăn
                </Typography>
                <br />
                <Box sx={{ width: "60%", margin: "1rem auto" }}>
                  {imageFile ? (
                    <Image
                      width={0}
                      height={0}
                      style={{ width: "100%", height: "auto" }}
                      src={imageFile}
                      alt={`img-preview`}
                    ></Image>
                  ) : (
                    <></>
                  )}
                  <UploadFile
                    handleChangFile={getFileUrl}
                    disabled={isSubmitting ? true : false}
                  />
                </Box>
                <br />
                <br />
                <TextEditor name="description" control={control} />
                <br />
                <br />
                <label htmlFor="foodAvailability">kích hoạt sản phẩm</label>
                <SwitchField
                  id="foodAvailability"
                  name="availability"
                  control={control}
                  defaultChecked
                  disabled={isSubmitting ? true : false}
                />
                <br />
                <Button
                  disabled={isSubmitting ? true : false}
                  type="submit"
                  endIcon={
                    isSubmitting ? <CircularProgress></CircularProgress> : ""
                  }
                  sx={{ px: 8, py: 2, mx: "auto", display: "block" }}
                >
                  Cập nhật
                </Button>
              </Box>
            </Card>
          ) : (
            <Box textAlign={"center"}>
              <CircularProgress sx={{ fontSize: "5em" }} />
            </Box>
          )}
        </Box>
      ) : (
        <Box>
          <h3>Access Denied</h3>
        </Box>
      )}
    </MainLayout>
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

export const getStaticProps: GetStaticProps<UpdateFoodPageProps> = async (
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
    revalidate: 30,
  };
};
