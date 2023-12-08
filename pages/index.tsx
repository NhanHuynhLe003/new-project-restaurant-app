import { MainLayout } from "../components/layouts/main";
import { NextPageWithLayout } from "../models/common";
import styles from "../styles/Home.module.css";

const Home: NextPageWithLayout = () => {
  return <div className={styles.container}>Trang Chu</div>;
};
Home.Layout = MainLayout;

export default Home;
