import React from "react";
import styles from "./Statement.module.css";

const Statement = ({ comment }) => {
  return (
    <div className={styles.comment}>
      <img
        className={styles.image}
        src={comment.author_avatar}
        alt={comment.author_nickname}
      />
      <div className={styles.info}>
        <h2 className={styles.userName}>{comment.author_nickname}</h2>
        <p className={styles.commentText}>{comment.text}</p>
      </div>
    </div>
  );
};

export default Statement;
