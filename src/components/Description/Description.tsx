import React from "react";
import styles from "./Description.module.css";
import { clsx } from "clsx";

type Props = {
  length: "short" | "long";
  text: string;
  value: string; // Bind the value to the textarea
  onChange: (value: string) => void; // Handle changes to the value
};

const Description = ({ length, text, value, onChange }: Props) => {
  return (
    <>
      <p className={styles.title}>{text}</p>
      <div className={clsx(styles.box, styles[length])}>
        <textarea
          value={value} // Bind the textarea to the value prop
          onChange={(e) => onChange(e.target.value)} // Update the parent state when the value changes
        />
      </div>
      <div className={styles.validate}>
        <img src="/images/check.png" alt="" />
        <p>მინიმუმ 2 სიმბოლო</p>
      </div>
      <div className={styles.validate}>
        <img src="/images/check.png" alt="" />
        <p>მინიმუმ 255 სიმბოლო</p>
      </div>
    </>
  );
};

export default Description;
