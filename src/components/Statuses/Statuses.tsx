"use client";
import React, { useState, useEffect } from "react";
import styles from "./Statuses.module.css";

type StatusItem = {
  id: number;
  name: string;
};

const Status = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [statuses, setStatuses] = useState<StatusItem[]>([]);

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const response = await fetch(
          "https://momentum.redberryinternship.ge/api/statuses"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch statuses");
        }
        const data = await response.json();
        setStatuses(data);
      } catch (error) {
        console.error("Error fetching statuses:", error);
      }
    };
    fetchStatuses();
  }, []);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.container}>
      <p
        className={`${styles.title} ${isOpen ? styles.titlepurp : ""}`}
        onClick={handleClick}
      >
        სტატუსი*
      </p>
      <div
        className={`${styles.box} ${isOpen ? styles.clicked : ""}`}
        onClick={handleClick}
      >
        <p>სტატუსი</p>
        <img
          className={`${styles.img} ${isOpen ? styles.active : ""}`}
          src="/images/down.png"
          alt="Toggle"
        />
      </div>

      {isOpen && (
        <div className={styles.newDiv}>
          {statuses.map((status) => (
            <div key={status.id} className={styles.statusItem}>
              <p>{status.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Status;
