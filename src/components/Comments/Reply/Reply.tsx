"use client";
import React, { useState } from "react";
import styles from "./Reply.module.css";
import Button4 from "@/components/Buttons/Button4/Button4";
import Button3 from "@/components/Buttons/Button3/Button3";
import Statement from "@/components/Comments/Statement/Statement";

const API_TOKEN = "9e8fae87-b024-4cd6-ad8f-dffb3840af32";

type SubComment = {
  id: number;
  text: string;
  author_nickname: string;
  author_avatar: string;
};

type Props = {
  comment: {
    id: number;
    author_nickname: string;
    author_avatar: string;
    text: string;
    task_id: number;
    sub_comments?: SubComment[];
  };
};

const Reply = ({ comment }: Props) => {
  const [showTextarea, setShowTextarea] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [subComments, setSubComments] = useState<SubComment[]>(
    comment.sub_comments || []
  );

  const toggleTextarea = () => {
    setShowTextarea(!showTextarea);
  };

  const handleNewReplySubmit = async () => {
    if (!replyText.trim()) return;

    try {
      const response = await fetch(
        `https://momentum.redberryinternship.ge/api/tasks/${comment.task_id}/comments`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: replyText,
            parent_id: comment.id, // Important: marks it as a reply (Statement)
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to post sub-comment");

      const newReply = await response.json();
      setSubComments((prev) => [...prev, newReply]);
      setReplyText("");
      setShowTextarea(false);
    } catch (error) {
      console.error("Error posting reply:", error);
    }
  };

  return (
    <div className={styles.comment}>
      <img
        className={styles.image}
        src={comment.author_avatar}
        alt={comment.author_nickname}
      />
      <div className={styles.info}>
        <h2>{comment.author_nickname}</h2>
        <p>{comment.text}</p>

        {showTextarea && (
          <div className={styles.newcomment}>
            <textarea
              className={styles.addcomment}
              placeholder="დაწერე კომენტარი"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <div className={styles.button3}>
              <Button3 text="დააკომენტარე" onClick={handleNewReplySubmit} />
            </div>
          </div>
        )}

        <Button4 onClick={toggleTextarea} />

        {subComments.length > 0 && (
          <div className={styles.replytocomment}>
            {subComments.map((reply) => (
              <Statement key={reply.id} comment={reply} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reply;
