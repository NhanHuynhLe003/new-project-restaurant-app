import * as React from "react";
import { InputField } from "../../components/form";
import { useForm } from "react-hook-form";
import SwitchField from "../../components/form/switch-field";
import SelectFieldForm from "../../components/form/select-field-form";
import { API, Amplify } from "aws-amplify";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import CheckBoxField from "../../components/form/checkbox-field";
const { v4: uuidv4 } = require("uuid");
export interface CreateFoodPageProps {}
import foodTags from "../../jsons/foodtags.json";
import ingredients from "../../jsons/ingredients.json";
import UploadFile from "../../components/uploadFile";
import { UploadProps, message } from "antd";
import TextEditor from "../../components/form/text-editor";
import amplifyConfig from "../../amplifyconfig.json";
import ConvertFileBuffer from "../../utils/convertBufferFile";
import { GetStaticProps, GetStaticPropsContext } from "next";

Amplify.configure(amplifyConfig);

const API_GW_NAME = "ag-manage-restaurant-project";
const API_KEY = "dgt6PuOZHY1Ot9ZXtbN0x1ZpZyRcilJY2phtxcnB";

export default function CreateFoodPage(props: CreateFoodPageProps) {
  const [maxTag, setMaxTag] = React.useState(8);
  const [clickMoreTag, setClickMoreTag] = React.useState(false);
  const [description, setDescription] = React.useState("");
  const [maxIngredients, setMaxIngredients] = React.useState(8);
  const [clickMoreIngredients, setClickMoreIngredients] = React.useState(false);

  const [fileUpload, setFileUpload] = React.useState<File>();

  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      img: fileUpload,
      description: "",
      availability: true,
      ingredients: [],
      name: "",
      type: "",
      price: 0,
      tags: [],
      created_at: String(new Date()),
      updated_at: String(new Date()),
    },
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
      const reader = new FileReader();

      reader.onloadend = async () => {
        try {
          const base64Str = reader.result?.toString().split(",")[1];
          console.log(reader.result);
          const headerReq = {
            body: {
              fileBuffer: base64Str,
              fileName,
            },
          };

          const response = await API.post(
            API_GW_NAME,
            "/image-food",
            headerReq
          );
          console.log(response);
        } catch (err) {
          console.error(err);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  async function handleSubmitForm() {
    await UploadImageToS3(fileUpload, fileUpload?.name);

    setValue("img", fileUpload);

    const val = getValues();
    console.log(val);
  }

  return (
    <Card sx={{ width: "60%", mx: "auto", my: 8, p: 4 }}>
      <Typography component={"h2"} variant="h3" textAlign={"center"}>
        Create Food
      </Typography>
      <br />
      <Box component={"form"} onSubmit={handleSubmit(handleSubmitForm)}>
        <InputField name="name" label="name" control={control}></InputField>

        <br />

        <InputField
          name="price"
          label="price"
          control={control}
          type="number"
        ></InputField>

        <SelectFieldForm
          label={"type"}
          name="type"
          control={control}
          options={["opt1", "opt2", "opt3"]}
        />
        <br />
        <label htmlFor="foodAvailability">Food availability</label>
        <SwitchField
          id="foodAvailability"
          name="availability"
          control={control}
          defaultChecked
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
            type="button"
            endIcon={clickMoreTag ? <CircularProgress size={20} /> : ""}
            onClick={async () => {
              setClickMoreTag(true);
              await new Promise((resolve) => setTimeout(resolve, 800));
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
                  <label htmlFor={ingre} style={{ cursor: "pointer" }}>
                    <CheckBoxField
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
            endIcon={clickMoreIngredients ? <CircularProgress size={20} /> : ""}
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
          <UploadFile handleChangFile={getFileUrl} />
        </Box>
        <br />
        <br />
        <TextEditor name="description" control={control} />
        <br />
        <br />
        <Button
          type="submit"
          sx={{ px: 8, py: 2, mx: "auto", display: "block" }}
        >
          Create Food
        </Button>
      </Box>
    </Card>
  );
}

export const getStaticProps: GetStaticProps<CreateFoodPageProps> = async (
  context: GetStaticPropsContext
) => {
  const data = await API.get(API_GW_NAME, "/foods", {});

  return {
    props: {},
    revalidate: 180,
  };
};
