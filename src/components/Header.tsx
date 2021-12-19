import { NextComponentType } from "next";
import styles from "../styles/scss/Header.module.scss";

const Header: NextComponentType = () => {
  return (
    <div className={styles.header}>
      <h2>MCU Reccomendation For You</h2>
    </div>
  );
};

export default Header;
