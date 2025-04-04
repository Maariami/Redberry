"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Round from "@/components/Tags/Round/Round";
import Square from "@/components/Tags/Square/Square";
import styles from "./singletask.module.css";
import Header from "@/components/Header/Header";
import Status from "@/components/Statuses/Statuses";
import AddWorker from "@/components/AddWorker/AddWorker";
import Button3 from "@/components/Buttons/Button3/Button3";
import Reply from "@/components/Comments/Reply/Reply"; // Assuming this is for displaying replies

const API_TOKEN = "9e8fae87-b024-4cd6-ad8f-dffb3840af32"; // API token

const TaskPage = () => {
  const { id } = useParams(); // Get task ID from the URL
  const [task, setTask] = useState(null);
  const [comments, setComments] = useState([]); // State for comments
  const [newComment, setNewComment] = useState(""); // State for new comment text
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchTask = async () => {
      try {
        const response = await fetch(
          `https://momentum.redberryinternship.ge/api/tasks/${id}`,
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
              "Content-Type": "application/json",
            },
          }
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

    // Fetch comments
    const fetchComments = async () => {
      try {
        const commentsResponse = await fetch(
          `https://momentum.redberryinternship.ge/api/tasks/${id}/comments`,
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!commentsResponse.ok) throw new Error("Comments not found");
        const commentsData = await commentsResponse.json();
        setComments(commentsData);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchTask();
    fetchComments(); // Fetch comments
  }, [id]);

  // Handle new comment submission
  const handleNewCommentSubmit = async () => {
    if (!newComment.trim()) return; // Don't submit empty comments

    try {
      const response = await fetch(
        `https://momentum.redberryinternship.ge/api/tasks/${id}/comments`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: newComment,
            task_id: id,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to post comment");

      const newCommentData = await response.json();

      // Prevent duplicate by checking if comment already exists in state
      setComments((prevComments) => {
        if (!prevComments.some((comment) => comment.id === newCommentData.id)) {
          return [newCommentData, ...prevComments];
        }
        return prevComments;
      });

      setNewComment(""); // Clear the textarea after submission
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  // Calculate the total number of comments and sub-comments
  const totalCommentsAndSubComments = comments.reduce((acc, comment) => {
    const subCommentsCount = comment.sub_comments
      ? comment.sub_comments.length
      : 0;
    return acc + 1 + subCommentsCount; // 1 for the comment itself and sub-comments count
  }, 0);

  // Handle status update in the parent (TaskPage)
  const handleStatusChange = (newStatus: string) => {
    setTask((prevTask) => ({
      ...prevTask,
      status: { ...prevTask.status, name: newStatus }, // Update status in task state
    }));
  };

  if (loading) return <p>Loading...</p>;
  if (!task) return <p>Task not found.</p>;

  return (
    <>
      <Header></Header>
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
                  defaultStatus={task.status.name}
                  taskId={id}
                  onStatusChange={handleStatusChange}
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
                ></AddWorker>
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
              onChange={(e) => setNewComment(e.target.value)} // Update state with textarea value
            ></textarea>
            <div className={styles.button3}>
              <Button3
                text="დააკომენტარე"
                onClick={handleNewCommentSubmit}
              ></Button3>
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
