import React from "react";
import styles from "./Upload.module.css";

type Props = {};

const Upload = (props: Props) => {
  return (
    <>
      <p className={styles.title}>ავატარი*</p>
      <div className={styles.block}>
        <img src="/images/gallery-export.png" alt="" />
        <p>ატვითე ფოტო</p>
      </div>
    </>
  );
};

export default Upload;
