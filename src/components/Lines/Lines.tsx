import React from "react";
import styles from "./Lines.module.css";
import Line from "../Line/Line";

type Props = {};

const Lines = (props: Props) => {
  return (
    <div className={styles.lines}>
      <Line color="yellow"></Line>
      <Line color="red"></Line>
      <Line color="pink"></Line>
      <Line color="blue"></Line>
    </div>
  );
};

export default Lines;
