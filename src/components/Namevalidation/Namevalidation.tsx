import React from "react";
import styles from "./Namevalidation.module.css";

type Props = {};

const Namevalidation = (props: Props) => {
  return (
    <>
      <p className={styles.title}>*სახელი</p>
      <div className={styles.box}>
        <input type="text" name="" id="" />
        <img src="/images/information.png" alt="" />
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

export default Namevalidation;
