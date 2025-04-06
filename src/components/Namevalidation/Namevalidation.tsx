import React from "react";
import styles from "./Namevalidation.module.css";

type Props = {
  text: string;
  value: string;
  onChange: (value: string) => void; // Add this prop to handle input change
};

const Namevalidation = ({ text, value, onChange }: Props) => {
  return (
    <>
      <p className={styles.title}>*{text}</p>
      <div className={styles.box}>
        <input
          type="text"
          value={value} // Bind the input to the value prop
          onChange={(e) => onChange(e.target.value)} // Call the onChange function on input change
        />
        <img src="/images/information.png" alt="" />
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

export default Namevalidation;
