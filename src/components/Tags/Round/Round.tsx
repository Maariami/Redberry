import clsx from "clsx";
import React from "react";
import styles from "./Round.module.css";

type Color = "pink" | "red" | "blue" | "yellow";

type Props = {
  color: Color;
};

const getColor = (color: Color) => {
  switch (color) {
    case "pink":
      return { text: "დიზაინი" };
    case "red":
      return { text: "მარკეტინგი" };
    case "blue":
      return { text: "ლოჯისტიკა" };
    case "yellow":
      return { text: "ინფ. ტექ." };
    default:
      return { text: "დიზაინი" };
  }
};

const Round = ({ color }: Props) => {
  const { text } = getColor(color);
  return <div className={clsx(styles.tag, styles[color])}>{text}</div>;
};

export default Round;
