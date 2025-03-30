import React from "react";
import styles from "./Uploaded.module.css";

type Props = {};

const Uploaded = (props: Props) => {
  return (
    <>
      <p className={styles.title}>ავატარი*</p>
      <div className={styles.block}>
        <img
          className={styles.avatar}
          src="/images/Frame 1000005909.png"
          alt=""
        />
        <img
          className={styles.trash}
          src="/images/Frame 1000006036.png"
          alt=""
        />
      </div>
    </>
  );
};

export default Uploaded;
