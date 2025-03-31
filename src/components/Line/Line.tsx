"use client";
import React, { useEffect, useState } from "react";
import Task from "../Task/Task";
import TaskHeader from "../TaskHeader/TaskHeader";
import styles from "./Line.module.css";

type Color = "pink" | "red" | "blue" | "yellow";
type Status = "დასაწყები" | "პროგრესში" | "დასრულებული" | "მზად ტესტირებისთვის";

type Props = {
  color: Color;
  status: Status;
  selectedItems: { name: string; category: string }[];
};

const Line = ({ color, status, selectedItems }: Props) => {
  const [tasks, setTasks] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const API_TOKEN = "9e8fae87-b024-4cd6-ad8f-dffb3840af32";

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          "https://momentum.redberryinternship.ge/api/tasks",
          {
            headers: { Authorization: `Bearer ${API_TOKEN}` },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }

        const taskData = await response.json();
        setTasks(taskData);
      } catch (error) {
        console.error("Error fetching task:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!tasks) {
    return <div>No task data available</div>;
  }

  // Filter tasks based on the current line's status
  let filteredTasks = tasks.filter((task) => task.status.name === status);

  // Categorize selectedItems into departments, priorities, and employees
  const selectedDepartments = selectedItems
    .filter((item) => item.category === "department")
    .map((item) => item.name);
  const selectedPriorities = selectedItems
    .filter((item) => item.category === "priority")
    .map((item) => item.name);
  const selectedEmployees = selectedItems
    .filter((item) => item.category === "employee")
    .map((item) => item.name);

  // Apply AND filtering based on selectedItems
  if (selectedItems.length > 0) {
    filteredTasks = filteredTasks.filter((task) => {
      const taskDepartment = task.department?.name;
      const taskPriority = task.priority?.name;
      const taskEmployee = `${task.employee?.name} ${task.employee?.surname}`;

      // Check if the task matches all specified filters
      const matchesDepartment =
        selectedDepartments.length === 0 ||
        selectedDepartments.includes(taskDepartment);
      const matchesPriority =
        selectedPriorities.length === 0 ||
        selectedPriorities.includes(taskPriority);
      const matchesEmployee =
        selectedEmployees.length === 0 ||
        selectedEmployees.includes(taskEmployee);

      // Task must match all conditions (AND)
      return matchesDepartment && matchesPriority && matchesEmployee;
    });
  }

  return (
    <div className={styles.line}>
      <TaskHeader color={color} />
      {filteredTasks.map((task, index) => (
        <Task task={task} key={index.toString()} color={color} border={color} />
      ))}
    </div>
  );
};

export default Line;
