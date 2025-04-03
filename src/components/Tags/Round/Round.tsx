import clsx from "clsx";
import React from "react";
import styles from "./Round.module.css";

type Color = "pink" | "red" | "blue" | "yellow";
type StatusType =
  | "დასაწყები"
  | "პროგრესში"
  | "მზად ტესტირებისთვის"
  | "დასრულებული";

type Props = {
  color?: Color;
  status?: StatusType;
  text: string;
};

const Round = ({ color, status, text }: Props) => {
  let statusText;

  switch (status) {
    case "დასაწყები":
      statusText = "yellow";
      break;
    case "პროგრესში":
      statusText = "red";
      break;
    case "მზად ტესტირებისთვის":
      statusText = "pink";
      break;
    case "დასრულებული":
      statusText = "blue";
      break;
    default:
      statusText = text; // Default to the passed text if no status
  }

  return (
    <div className={clsx(styles.tag, styles[color], styles[statusText])}>
      {text}
    </div>
  );
};

export default Round;
