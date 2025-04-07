"use client";

import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
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

type Department = {
  id: number;
  name: string;
};

const Page = () => {
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
  const [taskDate, setTaskDate] = useState<Date | null>(null);
  const [statuses, setStatuses] = useState<StatusItem[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]); // State for departments

  // Add state to track which dropdown is open
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Fetch statuses and departments on component mount
  useEffect(() => {
    const fetchStatusesAndDepartments = async () => {
      const token = "9e8fae87-b024-4cd6-ad8f-dffb3840af32";

      try {
        // Fetch statuses
        const statusResponse = await fetch(
          "https://momentum.redberryinternship.ge/api/statuses",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!statusResponse.ok) {
          throw new Error("Failed to fetch statuses");
        }
        const statusData = await statusResponse.json();
        setStatuses(statusData);

        // Fetch departments
        const departmentResponse = await fetch(
          "https://momentum.redberryinternship.ge/api/departments",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!departmentResponse.ok) {
          throw new Error("Failed to fetch departments");
        }
        const departmentData = await departmentResponse.json();
        setDepartments(departmentData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStatusesAndDepartments();
  }, []);

  const handleDropdownToggle = (dropdownName: string) => {
    setOpenDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  };

  const handleCreateTask = async (values: {
    title: string;
    description: string;
  }) => {
    const taskData = {
      name: values.title,
      description: values.description,
      due_date: taskDate?.toISOString() || "",
      status_id: selectedStatus?.id || 1,
      priority_id: selectedPriority?.id || 1,
      employee_id: selectedEmployee?.id || 1,
    };

    console.log("📦 Task data being sent:", taskData);

    const token = "9e8fae87-b024-4cd6-ad8f-dffb3840af32";

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create task: ${errorText}`);
      }

      const contentType = response.headers.get("content-type");
      if (contentType?.includes("application/json")) {
        const result = await response.json();
        console.log("✅ Task created successfully:", result);
      } else {
        const text = await response.text();
        throw new Error(`Unexpected response format: ${text}`);
      }
    } catch (error: any) {
      console.error("❌ Error creating task:", error);
    }
  };

  return (
    <>
      <Header />
      <div className={styles.main}>შექმენი ახალი დავალება</div>
      <Formik
        initialValues={{
          title: "",
          description: "",
        }}
        onSubmit={handleCreateTask}
      >
        {(formik) => (
          <Form onSubmit={(e) => e.preventDefault()}>
            <div className={styles.box}>
              <div className={styles.left}>
                <div>
                  <Namevalidation text="სათაური" name="title" />
                </div>
                <div>
                  <Description length="long" text="აღწერა" name="description" />
                </div>
                <div className={styles.drops}>
                  {/* Priority Dropdown */}
                  <div
                    onClick={() => handleDropdownToggle("priority")}
                    className={openDropdown === "priority" ? styles.open : ""}
                  >
                    <Priority onSelectPriority={setSelectedPriority} />
                  </div>

                  {/* Status Dropdown */}
                  <div
                    onClick={() => handleDropdownToggle("status")}
                    className={openDropdown === "status" ? styles.open : ""}
                  >
                    <Status
                      statuses={statuses} // Pass fetched statuses here
                      onSelectStatus={setSelectedStatus} // Handle selection
                    />
                  </div>
                </div>
              </div>

              <div className={styles.right}>
                <div className={styles.department}>
                  <Departments
                    className="depo"
                    selectedDepartment={selectedDepartment}
                    onSelectDepartment={setSelectedDepartment}
                    departments={departments} // Pass fetched departments here
                  />
                </div>
                <div className={styles.employee}>
                  <EmployeesDropdown
                    className="emplo"
                    selectedEmployee={selectedEmployee}
                    onSelectEmployee={setSelectedEmployee}
                  />
                </div>
                <div className={styles.date}>
                  <DatePicker onChange={setTaskDate} value={taskDate} />
                </div>

                {/* Submit Button */}
                <button
                  className={styles.create}
                  type="button"
                  onClick={() => formik.submitForm()}
                >
                  დავალების შექმნა
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Page;
