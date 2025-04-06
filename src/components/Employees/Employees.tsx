"use client";
import React, { useState, useEffect } from "react";
import styles from "./Employees.module.css";

type Employee = {
  id: number;
  name: string;
  surname: string;
  avatar: string | null;
  department_id: number;
};

type EmployeesDropdownProps = {
  className?: string;
  selectedEmployee: Employee | null;
  onSelectEmployee: (employee: Employee) => void;
};

const EmployeesDropdown = ({
  className,
  selectedEmployee,
  onSelectEmployee,
}: EmployeesDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const token = "9e8fae87-b024-4cd6-ad8f-dffb3840af32";
        const response = await fetch(
          "https://momentum.redberryinternship.ge/api/employees",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch employees");
        }
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    }

    fetchEmployees();
  }, []);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleEmployeeClick = (employee: Employee) => {
    onSelectEmployee(employee); // Pass the full employee object
    setIsOpen(false); // Close the dropdown after selecting an employee
  };

  return (
    <div className={styles[className]}>
      <p className={styles.title}>თანამშრომელი*</p>
      <div
        className={`${styles.box} ${isOpen ? styles.clicked : ""}`}
        onClick={handleClick}
      >
        <div className={styles.selectedEmployee}>
          {selectedEmployee ? (
            <>
              <img
                className={styles.avatar}
                src={selectedEmployee.avatar || "/images/default-avatar.png"}
                alt={`${selectedEmployee.name} ${selectedEmployee.surname}`}
              />
              <p>
                {selectedEmployee.name} {selectedEmployee.surname}
              </p>
            </>
          ) : (
            <p>თანამშრომელი</p>
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
          {employees.length > 0 ? (
            employees.map((employee) => (
              <div
                key={employee.id}
                className={styles.dropdownItem}
                onClick={() => handleEmployeeClick(employee)}
              >
                <img
                  className={styles.avatar}
                  src={employee.avatar || "/images/default-avatar.png"}
                  alt={`${employee.name} ${employee.surname}`}
                />
                <p>
                  {employee.name} {employee.surname}
                </p>
              </div>
            ))
          ) : (
            <p>მონაცემები არ არის</p>
          )}
        </div>
      )}
    </div>
  );
};

export default EmployeesDropdown;
