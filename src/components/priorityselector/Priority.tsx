"use client";
import React, { useState, useEffect } from "react";
import styles from "./Priority.module.css";

type PriorityItem = {
  id: number;
  name: string;
  icon: string;
};

type Props = {
  onSelectPriority: (priority: PriorityItem) => void;
};

const Priority = ({ onSelectPriority }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [priorities, setPriorities] = useState<PriorityItem[]>([]);
  const [selectedPriority, setSelectedPriority] = useState<PriorityItem | null>(
    null
  );

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

  const handleSelect = (priority: PriorityItem) => {
    setSelectedPriority(priority);
    setIsOpen(false);
    onSelectPriority(priority); // Pass the selected priority to parent component
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
        <div className={styles.selectedPriority}>
          {selectedPriority ? (
            <>
              <img
                src={selectedPriority.icon}
                alt={selectedPriority.name}
                className={styles.selectedPriorityIcon}
              />
              <p>{selectedPriority.name}</p>
            </>
          ) : (
            <p>პრიორიტეტები</p>
          )}
        </div>
        <img
          className={`${styles.img} ${isOpen ? styles.active : ""}`}
          src="/images/down.png"
          alt="Toggle"
        />
      </div>

      {isOpen && (
        <div className={styles.newDiv}>
          {priorities.map((priority) => (
            <div
              key={priority.id}
              className={styles.priorityItem}
              onClick={() => handleSelect(priority)}
            >
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
