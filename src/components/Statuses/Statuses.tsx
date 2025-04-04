"use client";
import React, { useState, useEffect } from "react";
import styles from "./Statuses.module.css";

type StatusItem = {
  id: number;
  name: string;
};

type Props = {
  defaultStatus: string; // API-provided status
  taskId: string; // ID needed for PATCH
  onStatusChange?: (newStatus: string) => void; // Optional callback
};

const API_TOKEN = "9e8fae87-b024-4cd6-ad8f-dffb3840af32";

const Status = ({ defaultStatus, taskId, onStatusChange }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [statuses, setStatuses] = useState<StatusItem[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>(defaultStatus);

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
  }, [defaultStatus]);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = async (statusName: string) => {
    setSelectedStatus(statusName);
    setIsOpen(false);

    try {
      const statusId = statuses.find((s) => s.name === statusName)?.id;
      console.log("Selected Status:", statusName);
      console.log("Resolved Status ID:", statusId);
      console.log("Updating task:", taskId);

      if (!statusId) throw new Error("Status ID not found");

      const res = await fetch(
        `https://momentum.redberryinternship.ge/api/tasks/${taskId}`,
        {
          method: "PUT", // Try PUT instead of PATCH
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status_id: statusId }),
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        console.error("API Error Response:", errorText);
        throw new Error("Failed to update status");
      }

      console.log("Status updated successfully");

      if (onStatusChange) {
        onStatusChange(statusName);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
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
