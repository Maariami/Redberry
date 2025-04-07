"use client";
import React, { useState, useEffect } from "react";
import styles from "./Departments.module.css";

type Department = {
  id: number;
  name: string;
};

type DepartmentsProps = {
  className?: string;
  selectedDepartment: string | null; // This will hold the department ID
  onSelectDepartment: (departmentId: string) => void;
};

const Departments = ({
  className,
  selectedDepartment,
  onSelectDepartment,
}: DepartmentsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedDepartmentName, setSelectedDepartmentName] =
    useState<string>("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/departments");
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

  const handleDepartmentClick = (department: Department) => {
    onSelectDepartment(department.id.toString());
    setSelectedDepartmentName(department.name);
    setIsOpen(false);
  };

  // Update the display name when the selected ID changes
  useEffect(() => {
    if (selectedDepartment && departments.length > 0) {
      const selected = departments.find(
        (dep) => dep.id.toString() === selectedDepartment
      );
      if (selected) {
        setSelectedDepartmentName(selected.name);
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
          value={selectedDepartmentName}
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
