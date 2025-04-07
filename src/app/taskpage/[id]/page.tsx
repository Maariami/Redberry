"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Round from "@/components/Tags/Round/Round";
import Square from "@/components/Tags/Square/Square";
import styles from "./singletask.module.css";
import Header from "@/components/Header/Header";
import Status from "@/components/Statuses/Statuses";
import AddWorker from "@/components/AddWorker/AddWorker";
import Button3 from "@/components/Buttons/Button3/Button3";
import Reply from "@/components/Comments/Reply/Reply";

const API_TOKEN = "9e8fae87-b024-4cd6-ad8f-dffb3840af32";

const TaskPage = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [statuses, setStatuses] = useState([]);

  // Fetch task, comments, and statuses
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const [taskRes, commentsRes, statusesRes] = await Promise.all([
          fetch(`https://momentum.redberryinternship.ge/api/tasks/${id}`, {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
              "Content-Type": "application/json",
            },
          }),
          fetch(
            `https://momentum.redberryinternship.ge/api/tasks/${id}/comments`,
            {
              headers: {
                Authorization: `Bearer ${API_TOKEN}`,
                "Content-Type": "application/json",
              },
            }
          ),
          fetch("https://momentum.redberryinternship.ge/api/statuses", {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
              "Content-Type": "application/json",
            },
          }),
        ]);

        if (!taskRes.ok || !commentsRes.ok || !statusesRes.ok) {
          throw new Error("Something failed to load");
        }

        const [taskData, commentsData, statusesData] = await Promise.all([
          taskRes.json(),
          commentsRes.json(),
          statusesRes.json(),
        ]);

        setTask(taskData);
        setComments(commentsData);
        setStatuses(statusesData); // Store statuses
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleNewCommentSubmit = async () => {
    if (!newComment.trim()) return;

    try {
      const res = await fetch(
        `https://momentum.redberryinternship.ge/api/tasks/${id}/comments`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: newComment, task_id: id }),
        }
      );

      if (!res.ok) throw new Error("Failed to post comment");

      const newCommentData = await res.json();

      setComments((prev) =>
        prev.some((c) => c.id === newCommentData.id)
          ? prev
          : [newCommentData, ...prev]
      );

      setNewComment("");
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  const totalCommentsAndSubComments = comments.reduce((acc, comment) => {
    return acc + 1 + (comment.sub_comments?.length || 0);
  }, 0);

  const handleStatusChange = (newStatus) => {
    setTask((prevTask) => ({
      ...prevTask,
      status: { ...prevTask.status, name: newStatus.name },
    }));
  };

  if (loading) return <p>Loading...</p>;
  if (!task) return <p>Task not found</p>;

  return (
    <>
      <Header />
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.taskDetails}>
            <Square priority={task.priority.name} size="big" />
            <Round text={task.department.name} status={task.status.name} />
          </div>
          <h1 className={styles.title}>{task.name}</h1>
          <p className={styles.description}>{task.description}</p>

          <div className={styles.details}>
            <div className={styles.detailsheader}>დავალების დეტალები</div>

            <div className={styles.detail}>
              <div className={styles.lefts}>
                <img src="/images/pie-chart.png" alt="" />
                სტატუსი
              </div>
              <div className={styles.rights}>
                <Status
                  statuses={statuses} // Pass statuses as a prop
                  onSelectStatus={handleStatusChange} // Pass handler to change status
                />
              </div>
            </div>

            <div className={styles.detail}>
              <div className={styles.lefts}>
                <img src="/images/Frame 1000005864.png" alt="" />
                თანამშრომელი
              </div>
              <div className={styles.rights}>
                <AddWorker
                  name={task.employee.name}
                  photo={task.employee.avatar}
                  image="show"
                />
              </div>
            </div>

            <div className={styles.detail}>
              <div className={styles.lefts}>
                <img src="/images/calendar-line.png" alt="" />
                დავალების ვადა
              </div>
              <div className={styles.rights}>
                {new Date(task.due_date).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.comments}>
          <div className={styles.newcomment}>
            <textarea
              className={styles.addcomment}
              name="addcomment"
              placeholder="დაწერე კომენტარი"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
            <div className={styles.button3}>
              <Button3 text="დააკომენტარე" onClick={handleNewCommentSubmit} />
            </div>
          </div>

          <div className={styles.commenthead}>
            <p>კომენტარები</p>
            <p className={styles.number}>{totalCommentsAndSubComments}</p>
          </div>

          <div className={styles.actualcommet}>
            {comments.map((comment) => (
              <div key={comment.id} className={styles.actualcommet}>
                <Reply comment={comment} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskPage;
