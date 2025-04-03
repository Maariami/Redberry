import React from "react";
import styles from "./Reply.module.css";
import Button4 from "@/components/Buttons/Button4/Button4";

// Define the shape of the props expected by the component
type Props = {
  comment: {
    author_nickname: string;
    author_avatar: string;
    text: string;
  };
};

const Reply = ({ comment }: Props) => {
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
        <Button4 />
      </div>
    </div>
  );
};

export default Reply;
