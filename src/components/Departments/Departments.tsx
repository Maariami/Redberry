"use client";
import React, { useState, useEffect } from "react";
import styles from "./Departments.module.css";

const Departments = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [departments, setDepartments] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://momentum.redberryinternship.ge/api/departments"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch departments");
        }
        const data = await response.json();
        setDepartments(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <p className={styles.title}>დეპარტამენტი*</p>
      <div
        className={`${styles.box} ${isOpen ? styles.clicked : ""}`}
        onClick={handleClick}
      >
        <input placeholder="დეპარტამენტი" type="text" name="" id="" readOnly />
        <img
          className={`${isOpen ? styles.rotated : ""}`}
          src="/images/down.png"
          alt=""
        />
      </div>

      {isOpen && (
        <div className={styles.newDiv}>
          {departments.length > 0 ? (
            departments.map((department, idx) => (
              <p key={idx} className={styles.dropdownItem}>
                {department.name}
              </p>
            ))
          ) : (
            <p>მონაცემები არ არის</p>
          )}
        </div>
      )}
    </>
  );
};

export default Departments;
