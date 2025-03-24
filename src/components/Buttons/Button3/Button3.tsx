import React from "react";
import styles from "./Button3.module.css";

type Props = {
  text: string;
};

const Button3 = ({ text }: Props) => {
  return <div className={styles.button}>{text}</div>;
};

export default Button3;
