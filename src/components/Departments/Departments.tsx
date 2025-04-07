"use client";

import React, { useState, useEffect } from "react";
import styles from "./Departments.module.css";

type Department = {
  id: number;
  name: string;
};

type DepartmentsProps = {
  className?: string;
  selectedDepartment: string | null; // This will hold the department ID as a string
  onSelectDepartment: (departmentId: string) => void;
  departments: Department[]; // Received from parent component as prop
};

const Departments = ({
  className,
  selectedDepartment,
  onSelectDepartment,
  departments = [], // Default to empty array if departments is not passed
}: DepartmentsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDepartmentName, setSelectedDepartmentName] =
    useState<string>("");

  // Handle toggle dropdown
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  // Handle department selection
  const handleDepartmentClick = (department: Department) => {
    onSelectDepartment(department.id.toString());
    setSelectedDepartmentName(department.name);
    setIsOpen(false); // Close dropdown after selection
  };

  // Update selected department name when department ID changes
  useEffect(() => {
    if (selectedDepartment && departments.length > 0) {
      const selected = departments.find(
        (dep) => dep.id.toString() === selectedDepartment
      );
      if (selected) {
        setSelectedDepartmentName(selected.name);
      } else {
        setSelectedDepartmentName(""); // If no department is selected, reset the name
      }
    }
  }, [selectedDepartment, departments]);

  return (
    <div className={styles[className || ""]}>
      <p className={styles.title}>დეპარტამენტი*</p>
      <div
        className={`${styles.box} ${isOpen ? styles.clicked : ""}`}
        onClick={handleClick}
      >
        <input
          placeholder="დეპარტამენტი"
          type="text"
          value={selectedDepartmentName || ""}
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
          {Array.isArray(departments) && departments.length > 0 ? (
            departments.map((department) => (
              <p
                key={department.id}
                className={styles.dropdownItem}
                onClick={() => handleDepartmentClick(department)}
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
