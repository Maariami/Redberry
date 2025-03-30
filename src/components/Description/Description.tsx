import React from "react";
import styles from "./Description.module.css";
import { clsx } from "clsx";

type Props = { length: "short" | "long"; text: string };

const Description = ({ length, text }: Props) => {
  return (
    <>
      <p className={styles.title}>{text}</p>
      <div className={clsx(styles.box, styles[length])}>
        <textarea type="text" name="" id="" />
      </div>
      <div className={styles.validate}>
        <img src="/images/check.png" alt="" />
        <p>მინიმუმ 2 სიმბოლო</p>
      </div>
      <div className={styles.validate}>
        <img src="/images/check.png" alt="" />
        <p>მინიმუმ 255 სიმბოლო</p>
      </div>
    </>
  );
};

export default Description;
