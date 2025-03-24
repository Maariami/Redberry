import React from "react";
import styles from "./Selected.module.css";

type Props = {};

const Selected = (props: Props) => {
  return (
    <div className={styles.name}>
      <p>გიორგი გიორგაძე</p>
      <img src="/images/x.png" alt="" />
    </div>
  );
};

export default Selected;
