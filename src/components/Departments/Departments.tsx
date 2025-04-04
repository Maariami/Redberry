import React, { useState, useEffect } from "react";
import styles from "./Departments.module.css";

type DepartmentsProps = {
  className?: string; // Optional className prop
  selectedDepartment: string | null; // Prop to get the selected department from the parent
  onSelectDepartment: (departmentName: string) => void; // Callback to pass selected department back to the parent
};

const Departments = ({
  className,
  selectedDepartment,
  onSelectDepartment,
}: DepartmentsProps) => {
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
          value={selectedDepartment || ""} // Display selected department
          readOnly
        />
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
              <p
                key={idx}
                className={styles.dropdownItem}
                onClick={() => handleDepartmentClick(department.name)} // Call the handler with the department name
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
