import clsx from "clsx";
import React from "react";
import styles from "./TaskHeader.module.css";
type Color = "pink" | "red" | "blue" | "yellow";

type Props = {
  color: Color;
};
const getcolor = (color: Color) => {
  switch (color) {
    case "pink":
      return { text: "მზად ტესტირებისთვის" };
    case "red":
      return { text: "პროგრესში" };
    case "blue":
      return { text: "დასრულებული" };
    case "yellow":
      return { text: "დასაწყები" };
    default:
      return { text: "დასაწყები" };
  }
};

const TaskHeader = ({ color }: Props) => {
  const { text } = getcolor(color);
  return <div className={clsx(styles.header, styles[color])}>{text}</div>;
};

export default TaskHeader;
