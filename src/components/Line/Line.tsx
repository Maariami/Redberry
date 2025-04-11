"use client";
import React from "react";
import Task from "../Task/Task";
import TaskHeader from "../TaskHeader/TaskHeader";
import styles from "./Line.module.css";

// Inline TaskType
type TaskType = {
  id: number;
  name: string;
  description: string;
  due_date: string;
  priority: {
    id: number;
    name: string;
  };
  employee: {
    id: number;
    name: string;
    surname: string;
    avatar: string;
  };
  department: {
    id: number;
    name: string;
  };
  status: {
    id: number;
    name: string;
  };
  total_comments: number;
};

type Props = {
  color: string;
  status: string;
  tasks: TaskType[];
  selectedItems: { name: string; category: string }[];
};

const Line = ({ color, status, tasks, selectedItems }: Props) => {
  let filteredTasks = tasks.filter((task) => task.status.name === status);

  const selectedDepartments = selectedItems
    .filter((item) => item.category === "department")
    .map((item) => item.name);

  const selectedPriorities = selectedItems
    .filter((item) => item.category === "priority")
    .map((item) => item.name);

  const selectedEmployees = selectedItems
    .filter((item) => item.category === "employee")
    .map((item) => item.name);

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
