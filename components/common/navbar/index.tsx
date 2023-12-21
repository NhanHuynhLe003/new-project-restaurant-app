import { Col, Row } from "antd";
import * as React from "react";
import styles from "../../../styles/header/navbar.module.css";
import {
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { navRoute } from "./routes-nav";
import { Amplify, Auth } from "aws-amplify";
import amplifyConfig from "../../../amplifyconfig.json";
import Link from "next/link";
export interface NavBarProps {}

const API_GW_NAME = "ag-manage-restaurant-project";
const API_KEY = "dgt6PuOZHY1Ot9ZXtbN0x1ZpZyRcilJY2phtxcnB";

Amplify.configure(amplifyConfig);
export default function NavBar(props: NavBarProps) {
  const [isLogin, setIsLogin] = React.useState(false);
  React.useEffect(() => {
    async function checkAuthen() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        setIsLogin(true);
      } catch (err) {
        setIsLogin(false);
      }
    }
    checkAuthen();
  }, []);
  const RouteMap = navRoute.filter((route) =>
    !isLogin ? !route.requiredLogin : route
  );
  return (
    <nav className={styles.NavBar}>
      <Row
        className={styles.NavContainer}
        justify={"space-between"}
        align={"middle"}
      >
        <Col sm={{ span: 1 }} style={{ fontSize: "24px", fontWeight: "bold" }}>
          <span style={{ color: "var(--primary-color)" }}>Food</span>
          Tuck
        </Col>
        <Col sm={{ span: 10 }}>
          <ul className={styles.listPage}>
            {RouteMap.map((route, index) => (
              <li key={index}>
                <Link
                  style={{ textDecoration: "none", color: "#fff" }}
                  href={route.path}
                >
                  {route.page}
                </Link>
              </li>
            ))}
          </ul>
        </Col>
        <Col sm={{ span: 5 }}>
          <ul className={styles.pageActionControl}>
            <li>
              <button type="button">
                <SearchOutlined />
              </button>
            </li>
            <li>
              <button type="button">
                <UserOutlined />
              </button>
            </li>
            <li>
              <button type="button">
                <ShoppingCartOutlined />
              </button>
            </li>
          </ul>
        </Col>
      </Row>
    </nav>
  );
}
