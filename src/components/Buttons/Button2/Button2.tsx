import React from "react";
import { clsx } from "clsx";
import styles from "./Button2.module.css";

type Props = {};

const Button2 = (props: Props) => {
  return (
    <div className={styles.button}>
      <p>+</p> შექმენი ახალი დავალება
    </div>
  );
};

export default Button2;
