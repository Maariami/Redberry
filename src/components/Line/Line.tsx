"use client";
import React from "react";
import Task from "../Task/Task";
import TaskHeader from "../TaskHeader/TaskHeader";
import styles from "./Line.module.css";

type Color = "pink" | "red" | "blue" | "yellow";
type Status = "დასაწყები" | "პროგრესში" | "დასრულებული" | "მზად ტესტირებისთვის";

type Props = {
  color: Color;
  status: Status;
  tasks: any[]; // tasks are passed from parent
  selectedItems: { name: string; category: string }[];
};

const Line = ({ color, status, tasks, selectedItems }: Props) => {
  // Filter tasks by status
  let filteredTasks = tasks.filter((task) => task.status.name === status);

  // Extract selected filters
  const selectedDepartments = selectedItems
    .filter((item) => item.category === "department")
    .map((item) => item.name);

  const selectedPriorities = selectedItems
    .filter((item) => item.category === "priority")
    .map((item) => item.name);

  const selectedEmployees = selectedItems
    .filter((item) => item.category === "employee")
    .map((item) => item.name);

  // Apply filters
  if (selectedItems.length > 0) {
    filteredTasks = filteredTasks.filter((task) => {
      const taskDepartment = task.department?.name;
      const taskPriority = task.priority?.name;
      const taskEmployee = `${task.employee?.name} ${task.employee?.surname}`;

      const matchesDepartment =
        selectedDepartments.length === 0 ||
        selectedDepartments.includes(taskDepartment);

      const matchesPriority =
        selectedPriorities.length === 0 ||
        selectedPriorities.includes(taskPriority);

      const matchesEmployee =
        selectedEmployees.length === 0 ||
        selectedEmployees.includes(taskEmployee);

      return matchesDepartment && matchesPriority && matchesEmployee;
    });
  }

  return (
    <div className={styles.line}>
      <TaskHeader color={color} />
      {filteredTasks.map((task, index) => (
        <Task key={index} task={task} color={color} border={color} />
      ))}
    </div>
  );
};

export default Line;
