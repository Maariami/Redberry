"use client";
import React, { useState } from "react";
import Header from "@/components/Header/Header";
import styles from "./page.module.css";
import Namevalidation from "@/components/Namevalidation/Namevalidation";
import Description from "@/components/Description/Description";
import Priority from "@/components/priorityselector/Priority";
import Status from "@/components/Statuses/Statuses";
import Departments from "@/components/Departments/Departments";
import EmployeesDropdown from "@/components/Employees/Employees";
import DatePicker from "@/components/Calendar/DataPicker";

type Employee = {
  id: number;
  name: string;
  surname: string;
  avatar: string | null;
  department_id: number;
};

type PriorityItem = {
  id: number;
  name: string;
  icon: string;
};

type StatusItem = {
  id: number;
  name: string;
};

type Props = {};

const Page = (props: Props) => {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  );
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [selectedPriority, setSelectedPriority] = useState<PriorityItem | null>(
    null
  );
  const [selectedStatus, setSelectedStatus] = useState<StatusItem | null>(null);
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [taskDate, setTaskDate] = useState<Date | null>(null);
  const [taskTitle, setTaskTitle] = useState<string>("");

  const handleSelectDepartment = (departmentName: string) => {
    setSelectedDepartment(departmentName);
  };

  const handleSelectEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
  };

  const handleSelectPriority = (priority: PriorityItem) => {
    setSelectedPriority(priority);
  };

  const handleSelectStatus = (status: StatusItem) => {
    setSelectedStatus(status);
  };

  const handleDescriptionChange = (description: string) => {
    setTaskDescription(description);
  };

  const handleDateChange = (date: Date | null) => {
    setTaskDate(date);
  };

  const handleTitleChange = (title: string) => {
    setTaskTitle(title);
  };

  const handleCreateTask = async () => {
    const taskData = {
      name: taskTitle,
      description: taskDescription,
      due_date: taskDate,
      status: selectedStatus
        ? { id: selectedStatus.id, name: selectedStatus.name }
        : null,
      priority: selectedPriority
        ? {
            id: selectedPriority.id,
            name: selectedPriority.name,
            icon: selectedPriority.icon,
          }
        : null,
      department: selectedDepartment,
      employee: selectedEmployee
        ? {
            id: selectedEmployee.id,
            name: selectedEmployee.name,
            surname: selectedEmployee.surname,
            avatar: selectedEmployee.avatar,
            department_id: selectedEmployee.department_id,
          }
        : null,
    };

    console.log("Task Data:", taskData);

    const token = "9e8fae87-b024-4cd6-ad8f-dffb3840af32";

    try {
      const response = await fetch(
        "https://momentum.redberryinternship.ge/api/tasks",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(taskData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create task");
      }

      const result = await response.json();
      console.log("Task created successfully:", result);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <>
      <Header />
      <div className={styles.main}>შექმენი ახალი დავალება</div>
      <div className={styles.box}>
        <div className={styles.left}>
          <div>
            <Namevalidation
              text="სათაური"
              value={taskTitle}
              onChange={handleTitleChange}
            />
          </div>
          <div>
            <Description
              length="long"
              text="აღწერა"
              value={taskDescription}
              onChange={handleDescriptionChange}
            />
          </div>
          <div className={styles.drops}>
            <Priority onSelectPriority={handleSelectPriority} />
            <Status onSelectStatus={handleSelectStatus} />
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.department}>
            <Departments
              selectedDepartment={selectedDepartment}
              onSelectDepartment={handleSelectDepartment}
            />
          </div>
          <div className={styles.employee}>
            <EmployeesDropdown
              selectedEmployee={selectedEmployee}
              onSelectEmployee={handleSelectEmployee}
            />
          </div>
          <div className={styles.date}>
            <DatePicker onChange={handleDateChange} value={taskDate} />
          </div>
          <button className={styles.create} onClick={handleCreateTask}>
            დავალების შექმნა
          </button>
        </div>
      </div>
    </>
  );
};

export default Page;
