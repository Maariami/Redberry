import React from "react";
import styles from "./Button2.module.css";
import Link from "next/link";

const Button2 = () => {
  return (
    <button className={styles.button}>
      <p>+</p>
      <Link href="/newtask"> შექმენი ახალი დავალება</Link>
    </button>
  );
};

export default Button2;
