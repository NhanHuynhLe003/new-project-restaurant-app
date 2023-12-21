import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Box, Button, Card, CircularProgress, Typography } from "@mui/material";
import { API, Amplify, Auth } from "aws-amplify";
import { format } from "date-fns";
import * as React from "react";
import { useForm } from "react-hook-form";
import amplifyConfig from "../../amplifyconfig.json";
import { InputField } from "../../components/form";
import CheckBoxField from "../../components/form/checkbox-field";
import SelectFieldForm from "../../components/form/select-field-form";
import SwitchField from "../../components/form/switch-field";
import TextEditor from "../../components/form/text-editor";
import UploadFile from "../../components/uploadFile";
import foodTags from "../../jsons/foodtags.json";
import ingredients from "../../jsons/ingredients.json";
import { NextPageWithLayout } from "../../models";
import { MainLayout } from "../../components/layouts/main";
import { FoodModel } from "../../models";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { resolve } from "styled-jsx/css";
const { v4: uuidv4 } = require("uuid");
export interface CreateFoodPageProps {}

Amplify.configure(amplifyConfig);

const API_GW_NAME = "ag-manage-restaurant-project";
const API_KEY = "dgt6PuOZHY1Ot9ZXtbN0x1ZpZyRcilJY2phtxcnB";

const CreateFoodPage: NextPageWithLayout = (props: CreateFoodPageProps) => {
  logoutIfNotAdmin();
  async function logoutIfNotAdmin() {
    const user = await Auth.currentSession(); // lay ra thong tin user
    const role = await user.getAccessToken().payload["cognito:groups"];
    if (!role.includes("admin")) {
      await Auth.signOut().then(() => alert("Only Admin can access"));
    }
  }

  const [maxTag, setMaxTag] = React.useState(8);
  const [clickMoreTag, setClickMoreTag] = React.useState(false);
  const [maxIngredients, setMaxIngredients] = React.useState(8);
  const [clickMoreIngredients, setClickMoreIngredients] = React.useState(false);
  const [fileUpload, setFileUpload] = React.useState<File>();
  const [loadingAuth, setLoadingAuth] = React.useState(true);
  const initValues = {
    img: fileUpload,
    description: "",
    availability: true,
    ingredients: {},
    name: "",
    type: "",
    price: 0,
    tags: {},
  };

  const schema = yup.object().shape({
    description: yup.string(),
    availability: yup.boolean().default(true),
    ingredients: yup.object(),
    name: yup.string().required("name food must be filled"),
    type: yup.string().required("type food must be filled"),
    price: yup.number().required("price is not empty"),
    tags: yup.object(),
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
    if (file) {
      setFileUpload(file);
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
              console.log("[1]::", urlImgRes);
              //add urlImage Uploaded to img link
              resolve(urlImgRes);
            }
            console.log(response);
          } catch (err) {
            console.error(err);
            reject(err);
          }
        };
        reader.readAsDataURL(file);
      });
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
        food_id: uuidv4(),
        food_img: urlImageUploaded,
        food_desc: val.description,
        food_availability: val.availability,
        food_ingredients: val.ingredients,
        food_name: val.name,
        food_rating: 0.0,
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
      const food = await API.post(API_GW_NAME, "/foods", headerReq);
      reset();

      return food;
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Box>
      <Typography component={"h2"} variant="h3" textAlign={"center"}>
        Create Food
      </Typography>

      {loadingAuth ? (
        <Authenticator>
          {({ signOut, user }) => {
            if (user) {
              setLoadingAuth(true);
            }
            return (
              <Card sx={{ width: "60%", mx: "auto", my: 4, p: 4 }}>
                <br />
                <Box
                  component={"form"}
                  onSubmit={handleSubmit(handleSubmitForm)}
                >
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

                  <SelectFieldForm
                    label={"type"}
                    name="type"
                    control={control}
                    options={["food", "drink", "other"]}
                    disabled={isSubmitting ? true : false}
                  />
                  <br />
                  <label htmlFor="foodAvailability">Food availability</label>
                  <SwitchField
                    id="foodAvailability"
                    name="availability"
                    control={control}
                    defaultChecked
                    disabled={isSubmitting ? true : false}
                  />
                  <br />
                  <Typography component={"h3"} variant="h5">
                    Food Tag
                  </Typography>
                  <ul style={{ padding: 0 }}>
                    {foodTags.map((tag, index) => {
                      if (index < maxTag)
                        return (
                          <li key={tag} style={{ listStyleType: "none" }}>
                            <label htmlFor={tag} style={{ cursor: "pointer" }}>
                              <CheckBoxField
                                disabled={isSubmitting ? true : false}
                                id={tag}
                                name={`tags.${tag}`}
                                control={control}
                              ></CheckBoxField>
                              <span>{tag}</span>
                            </label>
                          </li>
                        );
                    })}
                    <Button
                      disabled={isSubmitting ? true : false}
                      type="button"
                      endIcon={
                        clickMoreTag ? <CircularProgress size={20} /> : ""
                      }
                      onClick={async () => {
                        setClickMoreTag(true);
                        await new Promise((resolve) =>
                          setTimeout(resolve, 800)
                        );
                        setMaxTag((prev) => (prev === 8 ? foodTags.length : 8));
                        setClickMoreTag(false);
                      }}
                    >
                      View More Tag
                    </Button>
                  </ul>
                  <br />
                  <Typography component={"h3"} variant="h5">
                    Food Ingredients
                  </Typography>

                  <ul style={{ padding: 0 }}>
                    {ingredients.map((ingre, index) => {
                      if (index < maxIngredients)
                        return (
                          <li key={ingre} style={{ listStyleType: "none" }}>
                            <label
                              htmlFor={ingre}
                              style={{ cursor: "pointer" }}
                            >
                              <CheckBoxField
                                disabled={isSubmitting ? true : false}
                                id={ingre}
                                name={`ingredients.${ingre}`}
                                control={control}
                              ></CheckBoxField>
                              <span>{ingre}</span>
                            </label>
                          </li>
                        );
                    })}
                    <Button
                      type="button"
                      disabled={isSubmitting ? true : false}
                      endIcon={
                        clickMoreIngredients ? (
                          <CircularProgress size={20} />
                        ) : (
                          ""
                        )
                      }
                      onClick={async () => {
                        setClickMoreIngredients(true);
                        await new Promise((resolve) =>
                          setTimeout(resolve, Math.random() * 600)
                        );
                        setMaxIngredients((prev) =>
                          prev === 8
                            ? ingredients.length - 25
                            : prev === ingredients.length - 25
                            ? ingredients.length - 10
                            : prev === ingredients.length - 10
                            ? ingredients.length
                            : 8
                        );
                        setClickMoreIngredients(false);
                      }}
                    >
                      View More Ingredients
                    </Button>
                  </ul>

                  <br />
                  <Typography component={"h3"} variant="h5">
                    Food Image
                  </Typography>
                  <br />
                  <Box sx={{ width: "60%", margin: "1rem auto" }}>
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
                  <Button
                    disabled={isSubmitting ? true : false}
                    type="submit"
                    endIcon={
                      isSubmitting ? <CircularProgress></CircularProgress> : ""
                    }
                    sx={{ px: 8, py: 2, mx: "auto", display: "block" }}
                  >
                    Create Food
                  </Button>
                </Box>
              </Card>
            );
          }}
        </Authenticator>
      ) : (
        <Box textAlign={"center"}>
          <CircularProgress sx={{ fontSize: "5em" }} />
        </Box>
      )}
    </Box>
  );
};
CreateFoodPage.Layout = MainLayout;

export default CreateFoodPage;
