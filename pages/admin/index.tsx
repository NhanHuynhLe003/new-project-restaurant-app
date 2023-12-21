import * as React from "react";
import { MainLayout } from "../../components/layouts/main";
import { Menu, Row, Layout } from "antd";
import Link from "next/link";
import {
  DollarOutlined,
  EditOutlined,
  OrderedListOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { NextPageWithLayout } from "../../models";
import { AnyObject } from "yup";
import { CircularProgress } from "@mui/material";
const { Sider } = Layout;

function createIcon(icon: any) {
  return React.createElement(icon);
}
const pageAdmins = [
  {
    page: "Create Product",
    url: "/admin/create-food",
    ic: createIcon(PlusOutlined),
  },
  {
    page: "Update Product",
    url: "/admin/update-food",
    ic: createIcon(EditOutlined),
  },
  {
    page: "Create Discount",
    url: "/admin/create-discount",
    ic: createIcon(DollarOutlined),
  },
  {
    page: "Create Product",
    url: "/admin/manage-orders",
    ic: createIcon(OrderedListOutlined),
  },
];

export interface AdminPageProps {}

const AdminPage: NextPageWithLayout = (props: AdminPageProps) => {
  const [selectedMenuItem, setSelectedMenuItem] = React.useState("0");

  const handleMenuClick = (key: string) => {
    setSelectedMenuItem(key);
  };
  return (
    <div id="AdminPage">
      <Sider
        theme="light"
        width="920"
        style={{
          margin: "0 auto",
        }}
      >
        <Menu mode="vertical" theme="dark" style={{ textAlign: "center" }}>
          {pageAdmins.map((page, index) => (
            <Menu.Item
              key={"00" + index}
              icon={page.ic}
              style={{
                backgroundColor:
                  selectedMenuItem === "00" + index ? "#FF9F0D" : "",
              }}
              onClick={() => handleMenuClick("00" + index)}
            >
              <Link href={page.url} style={{ position: "relative" }}>
                {page.page}{" "}
                <CircularProgress
                  style={
                    selectedMenuItem === "00" + index
                      ? {
                          width: "20px",
                          height: "20px",
                          color: "#fff",

                          marginLeft: "1rem",
                        }
                      : { display: "none" }
                  }
                ></CircularProgress>
              </Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
    </div>
  );
};

AdminPage.Layout = MainLayout;
export default AdminPage;
