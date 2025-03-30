"use client";
import React, { useState, useEffect } from "react";
import styles from "./Priority.module.css";

type PriorityItem = {
  id: number;
  name: string;
  icon: string;
};

type Props = {};

const Priority = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [priorities, setPriorities] = useState<PriorityItem[]>([]);

  useEffect(() => {
    const fetchPriorities = async () => {
      try {
        const response = await fetch(
          "https://momentum.redberryinternship.ge/api/priorities"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch priorities");
        }
        const data = await response.json();
        setPriorities(data);
      } catch (error) {
        console.error("Error fetching priorities:", error);
      }
    };
    fetchPriorities();
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
        პრიორიტეტი*
      </p>
      <div
        className={`${styles.box} ${isOpen ? styles.clicked : ""}`}
        onClick={handleClick}
      >
        <p>პრიორიტეტები</p>
        <img
          className={`${styles.img} ${isOpen ? styles.active : ""}`}
          src="/images/down.png"
          alt="Toggle"
        />
      </div>

      {isOpen && (
        <div className={styles.newDiv}>
          {priorities.map((priority) => (
            <div key={priority.id} className={styles.priorityItem}>
              <img
                src={priority.icon}
                alt={priority.name}
                className={styles.priorityIcon}
              />
              <p>{priority.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Priority;
