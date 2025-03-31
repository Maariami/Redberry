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
  selectedItems: string[]; // Add selectedItems prop
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

  // Filter tasks based on the current line's status and selectedItems
  let filteredTasks = tasks.filter((task) => task.status.name === status);

  // If there are selected items, further filter tasks based on departments, priorities, and employees
  if (selectedItems.length > 0) {
    filteredTasks = filteredTasks.filter((task) => {
      const taskDepartment = task.department?.name;
      const taskPriority = task.priority?.name;
      const taskEmployee = `${task.employee?.name} ${task.employee?.surname}`;

      // Check if the task matches any of the selected items
      return selectedItems.some((item) =>
        [taskDepartment, taskPriority, taskEmployee].includes(item)
      );
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
