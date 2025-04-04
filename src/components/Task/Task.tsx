"use client";
import React from "react";
import Link from "next/link";
import Styles from "./Task.module.css";
import Square from "../Tags/Square/Square";
import Round from "../Tags/Round/Round";
import { clsx } from "clsx";

type Border = "pink" | "red" | "blue" | "yellow";
type Color = "pink" | "red" | "blue" | "yellow";

const Task = ({
  color,
  border,
  task,
}: {
  color: Color;
  border: Border;
  task: any;
}) => {
  const {
    id,
    name,
    description,
    due_date,
    priority,
    employee,
    total_comments,
  } = task;
  const dueDate = new Date(due_date).toLocaleDateString();

  return (
    <Link
      href={`/taskpage/${id}`} // Correct dynamic route using task ID
      className={clsx(Styles.task, Styles[border])}
    >
      <div className={Styles.head}>
        <div className={Styles.buttons}>
          <Square priority={priority.name} size="small" />
          <Round text={task.department.name} color={color} />
        </div>
        <div className={Styles.date}>{dueDate}</div>
      </div>
      <div className={Styles.middle}>
        <h2>{name}</h2>
        <p>{description}</p>
      </div>
      <div className={Styles.bottom}>
        <img
          src={employee.avatar}
          alt={employee.name}
          className={Styles.avatar}
        />
        <p>
          {employee.name} {employee.surname}
        </p>
        <div className={Styles.comments}>
          <img src="/images/Comments.png" alt="" />
          <p>{total_comments}</p>
        </div>
      </div>
    </Link>
  );
};

export default Task;
