import React from "react";
import styles from "./Header.module.css";
import Button1 from "../Buttons/Button1/Button1";
import Button2 from "../Buttons/Button2/Button2";
import Link from "next/link";

const Header = () => {
  return (
    <header className={styles.header}>
      <Link className={styles.momentum} href="/">
        Momentum <img src="/images/Hourglass.png" alt="" />
      </Link>
      <div className={styles.buttons}>
        <Button1></Button1>
        <Button2></Button2>
      </div>
    </header>
  );
};

export default Header;
