"use client";

import React, { useState } from "react";
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

  // Track which dropdown is open
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleDropdownToggle = (dropdownName: string) => {
    // If the clicked dropdown is already open, close it. Otherwise, open it and close the others.
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
        alert("დავალება წარმატებით შეიქმნა!");
      } else {
        const text = await response.text();
        throw new Error(`Unexpected response format: ${text}`);
      }
    } catch (error: any) {
      console.error("❌ Error creating task:", error);
      alert("შეცდომა: " + error.message);
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
                    <Status onSelectStatus={setSelectedStatus} />
                  </div>
                </div>
              </div>

              <div className={styles.right}>
                <div className={styles.department}>
                  <Departments
                    selectedDepartment={selectedDepartment}
                    onSelectDepartment={setSelectedDepartment}
                  />
                </div>
                <div className={styles.employee}>
                  <EmployeesDropdown
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
