"use client";
import React, { useEffect, useState } from "react";
import styles from "./Lines.module.css";
import Line from "../Line/Line";

const API_TOKEN = "9e8fae87-b024-4cd6-ad8f-dffb3840af32";

type Props = {
  selectedItems: { name: string; category: string }[];
};

const Lines = ({ selectedItems }: Props) => {
  const [tasks, setTasks] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          "https://momentum.redberryinternship.ge/api/tasks",
          {
            headers: { Authorization: `Bearer ${API_TOKEN}` },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch tasks");

        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!tasks) return <div>დავალებები ვერ მოიძებნა</div>;

  return (
    <div className={styles.lines}>
      <Line
        color="yellow"
        status="დასაწყები"
        tasks={tasks}
        selectedItems={selectedItems}
      />
      <Line
        color="red"
        status="პროგრესში"
        tasks={tasks}
        selectedItems={selectedItems}
      />
      <Line
        color="pink"
        status="მზად ტესტირებისთვის"
        tasks={tasks}
        selectedItems={selectedItems}
      />
      <Line
        color="blue"
        status="დასრულებული"
        tasks={tasks}
        selectedItems={selectedItems}
      />
    </div>
  );
};

export default Lines;
