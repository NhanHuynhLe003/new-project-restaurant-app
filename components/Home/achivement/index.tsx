import * as React from "react";
import styles from "../../../styles/Home.module.css";
import { Col, Row } from "antd";
import Image from "next/image";
import { Typography } from "@mui/material";
export interface acheiveIconModel {
  img: string;
  title: string;
  content: string;
}
export interface AcheivementProps {
  iconList: acheiveIconModel[];
}

export default function Acheivement({ iconList }: AcheivementProps) {
  return (
    <div className={styles.achievement}>
      <div className={styles.blurAchievement}></div>
      <Row className={styles.achieveContainer} gutter={[0, 24]}>
        {iconList &&
          iconList.map((item, index) => (
            <Col
              key={index + item.title}
              span={24}
              sm={{ span: 12 }}
              md={{ span: 6 }}
              style={{ textAlign: "center" }}
            >
              <Image src={item.img} alt={"icon-" + item.title}></Image>
              <Typography component={"h6"} color={"var(--white)"}>
                {item.title}
              </Typography>
              <Typography component={"h5"} variant="h5" color={"var(--white)"}>
                {item.content}
              </Typography>
            </Col>
          ))}
      </Row>
    </div>
  );
}
