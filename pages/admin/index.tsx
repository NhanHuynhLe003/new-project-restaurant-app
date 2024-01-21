import { ConfigProvider, Spin, Table } from "antd";
import * as React from "react";
import { MainLayout } from "../../components/layouts/main";
import amplifyConfig from "../../amplifyconfig.json";
import {
  Alert,
  AlertProps,
  Box,
  Button,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { ColumnsType } from "antd/es/table";
import { FoodModel, NextPageWithLayout } from "../../models";
import { GetStaticProps, GetStaticPropsContext } from "next";
import { API, Amplify, Auth } from "aws-amplify";
import { handleConvertObjectDdb } from "../../utils/handleResDataDynamodb";
import Image from "next/image";
import styles from "../../styles/admin/main.module.css";
import { useRouter } from "next/router";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import SubmitDeleteAlert from "../../components/admin/submit-delete-alert";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useAuth } from "../../contexts/AuthContext";

const API_GW_NAME = "ag-manage-restaurant-project";
Amplify.configure(amplifyConfig);

export interface FoodListProps {
  foodListData: FoodModel[];
}

export interface AdminPageProps {}

const AdminPage = ({ foodListData }: FoodListProps) => {
  const { isAuthenticated, checkUser, isAdminAuth } = useAuth();
  const columns: ColumnsType<FoodModel> = [
    {
      title: "",
      width: 50,
      dataIndex: "stt",
      key: "stt",
      // fixed: "left",
    },
    {
      title: "Name",
      width: 150,
      dataIndex: "food_name",
      key: "food_name",
      // fixed: "left",
    },

    {
      title: "Id",
      dataIndex: "food_id",
      key: "food_id",
      ellipsis: { showTitle: true },
      width: 200,
    },
    {
      title: "Type",
      dataIndex: "food_type",
      key: "food_type",
      ellipsis: { showTitle: true },
      width: 100,
    },
    {
      title: "Image",
      dataIndex: "food_img",
      key: "food_img",
      ellipsis: { showTitle: true },
      width: 200,
      render: (value) => (
        <Box textAlign={"center"}>
          <Image
            alt={`food-Image-${value}`}
            src={value}
            width={0}
            height={0}
            style={{ width: "5rem", height: "auto" }}
          ></Image>
        </Box>
      ),
    },
    {
      title: "Description",
      dataIndex: "food_desc",
      key: "food_desc",
      ellipsis: { showTitle: true },
      width: 400,
    },
    {
      title: "Rating",
      dataIndex: "food_rating",
      key: "food_rating",
      ellipsis: { showTitle: true },
      width: 70,
    },
    {
      title: "Ingredients",
      dataIndex: "food_ingredients",
      key: "food_ingredients",

      width: 200,
      render: (ingres) => (
        <Box>
          {ingres &&
            Object.keys(ingres).length > 0 &&
            Object.keys(ingres).join(", ")}
        </Box>
      ),
      ellipsis: { showTitle: true },
    },
    {
      title: "Tags",
      dataIndex: "food_tags",
      key: "food_tags",
      render: (tags) => (
        <Box>
          {tags && Object.keys(tags).length > 0 && Object.keys(tags).join(", ")}
        </Box>
      ),
      ellipsis: { showTitle: true },
      width: 200,
    },
    {
      title: "Price",
      dataIndex: "food_price",
      key: "food_price",
      ellipsis: { showTitle: true },
      width: 150,
    },
    {
      title: "Discount",
      dataIndex: "food_discount",
      key: "food_discount",
      ellipsis: { showTitle: true },
      width: 200,
    },
    {
      title: "Availability",
      dataIndex: "food_availability",
      key: "food_availability",
      ellipsis: { showTitle: true },
      width: 100,
    },
    {
      title: "Information",
      dataIndex: "food_info",
      key: "food_info",
      ellipsis: { showTitle: true },
      width: 400,
    },
    {
      title: "UpdatedAt",
      dataIndex: "updated_at",
      key: "updated_at",
      ellipsis: { showTitle: true },
      width: 200,
    },

    {
      title: "Action",
      key: "operation",
      fixed: "right",

      width: "4%",
      render: (product, record, index) => (
        <Stack direction={"column"} gap={"0.5rem"}>
          <Button
            title="Chỉnh sửa sản phẩm"
            onClick={() =>
              handleDirectToUpdateProduct(product.food_id, product.food_type)
            }
            variant="contained"
            color="success"
            fullWidth
          >
            <EditOutlined />
          </Button>{" "}
          <SubmitDeleteAlert
            deleteUrl={`/foods/${product.food_id}?type=${product.food_type}`}
          ></SubmitDeleteAlert>
        </Stack>
      ),
    },
  ];

  const router = useRouter();

  const [loading, setLoading] = React.useState({
    state: false,
    element: "",
  });

  React.useEffect(() => {
    console.log("ADMIN CHANGED::: ", isAdminAuth);
  }, [isAdminAuth]);
  const [onCloseAlert, setOnCloseAlert] = React.useState(!isAdminAuth);

  function handleDirectToUpdateProduct(food_id: string, food_type: string) {
    setLoading((prev) => ({ ...prev, element: "create-food" }));
    router.push(`/admin/update/${food_id}-type=${food_type}`);
  }
  function handleDirectCreateFood() {
    setLoading((prev) => ({ ...prev, element: "create-food" }));
    router.push("/admin/create-food");
  }

  function handleDirectCreateDiscount() {
    setLoading((prev) => ({ ...prev, element: "create-discount" }));
    router.push("/admin/create-discount");
  }

  React.useEffect(() => {
    const handleStart = () => {
      setLoading((prev) => ({ ...prev, state: true }));
    };
    const handleComplete = () => {
      setLoading((prev) => ({ ...prev, state: true }));
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router.events]);
  return (
    <MainLayout lightMode={true}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={onCloseAlert}
        onClose={() => setOnCloseAlert(false)}
        autoHideDuration={4000}
      >
        <Alert
          onClose={() => setOnCloseAlert(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Only Admin Can Access!
        </Alert>
      </Snackbar>
      {isAdminAuth ? (
        <Box>
          <Stack
            direction={"row"}
            justifyContent={"flex-end"}
            gap={"1rem"}
            m={"2rem 0"}
          >
            <Button
              variant="contained"
              onClick={handleDirectCreateFood}
              startIcon={
                loading.element === "create-food" &&
                loading.state && (
                  <ConfigProvider theme={{ token: { colorPrimary: "#ccc" } }}>
                    <Spin></Spin>
                  </ConfigProvider>
                )
              }
            >
              Create Product
            </Button>
            <Button
              variant="contained"
              color="warning"
              onClick={handleDirectCreateDiscount}
              startIcon={
                loading.element === "create-discount" &&
                loading.state && (
                  <ConfigProvider theme={{ token: { colorPrimary: "#ccc" } }}>
                    <Spin></Spin>
                  </ConfigProvider>
                )
              }
            >
              Create Discount
            </Button>
          </Stack>
          <ConfigProvider
            theme={{
              components: {
                Pagination: {
                  colorPrimary: "var(--primary-color)",
                  colorBgBase: "#ccc",
                },
              },
            }}
          >
            <Table
              pagination={{
                hideOnSinglePage: true,
                className: styles.paginateTable,
                style: { color: "red" },
              }}
              bordered
              style={{ textAlign: "center" }}
              columns={columns}
              dataSource={foodListData}
              scroll={{ x: 3200 }}
            />
          </ConfigProvider>
          ;
        </Box>
      ) : (
        <h3 style={{ color: "#fff", textAlign: "center" }}>Access Denied</h3>
      )}
    </MainLayout>
  );
};

export const getStaticProps: GetStaticProps<FoodListProps> = async (
  context: GetStaticPropsContext
) => {
  const data: FoodModel[] = await API.get(API_GW_NAME, "/foods", {});

  const newData =
    data && data.map((food, index) => ({ ...food, stt: index + 1 }));
  return {
    props: {
      foodListData: handleConvertObjectDdb(newData),
    },
    revalidate: 5,
  };
};

export default AdminPage;
