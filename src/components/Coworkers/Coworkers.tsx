"use client";
import React, { useState } from "react";
import styles from "./Coworkers.module.css";
import AddWorker from "../AddWorker/AddWorker";

const Coworkers = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <p className={styles.title}>პასუხისმგებელი თანამშრომელი*</p>
      <div
        className={`${styles.box} ${isOpen ? styles.clicked : ""}`}
        onClick={handleClick}
      >
        <input placeholder="დასაწყები" type="text" name="" id="" />
        <img
          className={`${isOpen ? styles.rotated : ""}`}
          src="/images/down.png"
          alt=""
        />
      </div>

      {isOpen && (
        <div className={styles.newDiv}>
          <AddWorker image="add"></AddWorker>
          <AddWorker image="show"></AddWorker>
          <AddWorker image="show"></AddWorker>
          <AddWorker image="show"></AddWorker>
        </div>
      )}
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

export default Coworkers;
