"use client"; // This ensures the code runs only on the client-side

import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const TaskPage = () => {
  const router = useRouter();
  const { id } = router.query; // Get the task ID from the URL
  const [task, setTask] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Use `useEffect` to avoid accessing `router.query` before it is available
  useEffect(() => {
    if (!id) return; // Don't fetch if the ID is not available yet

    const fetchTask = async () => {
      try {
        const response = await fetch(
          `https://momentum.redberryinternship.ge/api/tasks/${id}`
        );
        if (!response.ok) throw new Error("Task not found");
        const data = await response.json();
        setTask(data);
      } catch (error) {
        console.error("Error fetching task:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]); // Fetch when `id` changes

  if (loading) return <p>Loading...</p>;
  if (!task) return <p>Task not found.</p>;

  return (
    <div>
      <h1>{task.name}</h1>
      <p>{task.description}</p>
      <p>Due Date: {new Date(task.due_date).toLocaleDateString()}</p>
      <p>Priority: {task.priority.name}</p>
      <div>
        <img src={task.employee.avatar} alt={task.employee.name} width={50} />
        <p>
          {task.employee.name} {task.employee.surname}
        </p>
      </div>
      <p>Total Comments: {task.total_comments}</p>
    </div>
  );
};

export default TaskPage;
