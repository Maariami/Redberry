import React from "react";
import styles from "./Header.module.css";
import Button1 from "../Buttons/Button1/Button1";
import Button2 from "../Buttons/Button2/Button2";

type Props = {};

const Header = (props: Props) => {
  return (
    <header className={styles.header}>
      <div className={styles.momentum}>
        Momentum <img src="/images/Hourglass.png" alt="" />
      </div>
      <div className={styles.buttons}>
        <Button1></Button1>
        <Button2></Button2>
      </div>
    </header>
  );
};

export default Header;
