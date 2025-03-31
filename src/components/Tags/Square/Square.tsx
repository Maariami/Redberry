import React from "react";
import styles from "./Square.module.css";
import clsx from "clsx";

type Priority = "მაღალი" | "საშუალო" | "დაბალი";
type Size = "big" | "small";
type Props = {
  priority: Priority;
  size: Size;
};

const getPriorityIcon = (priority: Priority) => {
  switch (priority) {
    case "მაღალი":
      return { icon: "/images/High.png", label: "მაღალი", color: "red" };
    case "საშუალო":
      return { icon: "/images/Medium.png", label: "საშუალო", color: "yellow" };
    case "დაბალი":
      return { icon: "/images/Low.png", label: "დაბალი", color: "green" };
    default:
      return { icon: "/images/Medium.png", label: "Medium", color: "none" };
  }
};

const Square = ({ priority, size }: Props) => {
  const { icon, label, color } = getPriorityIcon(priority);
  return (
    <div className={clsx(styles.button, styles[color], styles[size])}>
      <img src={icon} alt={label} />
      {label}
    </div>
  );
};

export default Square;
