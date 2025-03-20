import React from "react";
import Task from "../Task/Task";
import TaskHeader from "../TaskHeader/TaskHeader";
import styles from "./Line.module.css";

type Color = "pink" | "red" | "blue" | "yellow";
type Props = {
  color: Color;
};

const Line = ({ color }: Props) => {
  return (
    <div className={styles.line}>
      <TaskHeader color={color}></TaskHeader>
      <Task priority="high" color="blue" border={color}></Task>
      <Task priority="low" color="yellow" border={color}></Task>
      <Task priority="medium" color="orange" border={color}></Task>
      <Task priority="high" color="pink" border={color}></Task>
    </div>
  );
};

export default Line;
