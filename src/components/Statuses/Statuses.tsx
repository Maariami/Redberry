"use client";
import React, { useState } from "react";
import styles from "./Statuses.module.css";

type StatusItem = {
  id: number;
  name: string;
};

type Props = {
  statuses: StatusItem[]; // Receive statuses as a prop
  onSelectStatus: (status: StatusItem) => void;
};

const Status = ({ statuses, onSelectStatus }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<StatusItem | null>(null);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (status: StatusItem) => {
    setSelectedStatus(status);
    setIsOpen(false);
    onSelectStatus(status); // Pass the selected status to the parent component
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
        <div className={styles.selectedStatus}>
          {selectedStatus ? <p>{selectedStatus.name}</p> : <p>სტატუსები</p>}
        </div>
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
              onClick={() => handleSelect(status)}
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
