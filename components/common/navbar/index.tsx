import { Col, Row } from "antd";
import * as React from "react";
import styles from "../../../styles/header/navbar.module.css";
import {
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { navRoute } from "./routes-nav";

export interface NavBarProps {}

export default function NavBar(props: NavBarProps) {
  const RouteMap = navRoute.filter((route) => !route.requiredLogin);
  console.log(RouteMap);

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
              <li key={index}>{route.page}</li>
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
