import React from "react";
import styles from "./Lines.module.css";
import Line from "../Line/Line";

const Lines = () => {
  return (
    <div className={styles.lines}>
      <Line color="yellow" status="დასაწყები" /> {/* Not Started */}
      <Line color="red" status="დასრულებული" /> {/* Completed */}
      <Line color="pink" status="მიმდინარე" /> {/* In Progress */}
      <Line color="blue" status="გაუქმებული" /> {/* Cancelled */}
    </div>
  );
};

export default Lines;
