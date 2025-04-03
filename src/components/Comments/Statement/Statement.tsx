import React from "react";
import styles from "./Statement.module.css";

// Define the shape of the props expected by the component
type Props = {
  comment: {
    author_nickname: string;
    author_avatar: string;
    text: string;
  };
};

const Statement = ({ comment }: Props) => {
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
      </div>
    </div>
  );
};

export default Statement;
