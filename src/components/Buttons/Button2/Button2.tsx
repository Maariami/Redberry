import React from "react";
import { clsx } from "clsx";
import styles from "./Button2.module.css";
import Link from "next/link";

type Props = {};

const Button2 = (props: Props) => {
  return (
    <button className={styles.button}>
      <p>+</p>
      <Link href="/newtask"> შექმენი ახალი დავალება</Link>
    </button>
  );
};

export default Button2;
