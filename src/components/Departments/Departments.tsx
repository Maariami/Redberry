"use client";
import React, { useState, useEffect } from "react";
import styles from "./Departments.module.css";

type Department = {
  id: number;
  name: string;
};

type DepartmentsProps = {
  className?: string;
  selectedDepartment: string | null;
  onSelectDepartment: (departmentName: string) => void;
};

const Departments = ({
  className,
  selectedDepartment,
  onSelectDepartment,
}: DepartmentsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [departments, setDepartments] = useState<Department[]>([]);

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

  const handleDepartmentClick = (departmentName: string) => {
    onSelectDepartment(departmentName); // Update the parent with selected department
    setIsOpen(false); // Close the dropdown after selecting a department
  };

  return (
    <div className={styles[className]}>
      <p className={styles.title}>დეპარტამენტი*</p>
      <div
        className={`${styles.box} ${isOpen ? styles.clicked : ""}`}
        onClick={handleClick}
      >
        <input
          placeholder="დეპარტამენტი"
          type="text"
          value={selectedDepartment || ""}
          readOnly
        />
        <img
          className={`${isOpen ? styles.rotated : ""}`}
          src="/images/down.png"
          alt="Toggle"
        />
      </div>

      {isOpen && (
        <div className={styles.newDiv}>
          {departments.length > 0 ? (
            departments.map((department) => (
              <p
                key={department.id}
                className={styles.dropdownItem}
                onClick={() => handleDepartmentClick(department.name)}
              >
                {department.name}
              </p>
            ))
          ) : (
            <p>მონაცემები არ არის</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Departments;
