"use client";
import React, { useEffect, useState } from "react";
import Task from "../Task/Task";
import TaskHeader from "../TaskHeader/TaskHeader";
import styles from "./Line.module.css";

type Color = "pink" | "red" | "blue" | "yellow";
type Status = "დასაწყები" | "პროგრესში" | "დასრულებული" | "მზად ტესტირებისთვის"; // Adjust this based on actual status values from the API

type Props = {
  color: Color;
  status: Status;
};

const Line = ({ color, status }: Props) => {
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
  const filteredTasks = tasks.filter((task) => task.status.name === status);

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
