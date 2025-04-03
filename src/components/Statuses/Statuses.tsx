"use client";
import React, { useState, useEffect } from "react";
import styles from "./Statuses.module.css";

type StatusItem = {
  id: number;
  name: string;
};

type Props = {
  defaultStatus: string; // Receive the API status as a prop
};

const Status = ({ defaultStatus }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [statuses, setStatuses] = useState<StatusItem[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>(defaultStatus); // Use API status as default

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

        // If defaultStatus isn't found in the API, fallback to the first item
        if (
          !data.some((status) => status.name === defaultStatus) &&
          data.length > 0
        ) {
          setSelectedStatus(data[0].name);
        }
      } catch (error) {
        console.error("Error fetching statuses:", error);
      }
    };
    fetchStatuses();
  }, [defaultStatus]); // Run when the API status changes

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (statusName: string) => {
    setSelectedStatus(statusName);
    setIsOpen(false);
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
        <p>{selectedStatus}</p>
        <img
          className={`${styles.img} ${isOpen ? styles.active : ""}`}
          src="/images/down.png"
          alt="Toggle"
        />
      </div>

      {isOpen && (
        <div className={styles.newDiv}>
          {statuses.map((status) => (
            <div
              key={status.id}
              className={styles.statusItem}
              onClick={() => handleSelect(status.name)}
            >
              <p>{status.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Status;
