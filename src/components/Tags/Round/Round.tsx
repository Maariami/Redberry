import clsx from "clsx";
import React from "react";
import styles from "./Round.module.css";
type Color = "pink" | "orange" | "blue" | "green";

type Props = {
  text: string;
  color: Color;
};
const Round = ({ text, color }: Props) => {
  return <div className={clsx(styles.tag, styles[color])}>{text}</div>;
};

export default Round;
