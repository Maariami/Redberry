"use client";

import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik"; // Import Formik and Form
import styles from "./Button1.module.css";
import Departments from "@/components/Departments/Departments"; // Import Departments
import Upload from "@/components/Photos/Upload/Upload";
import Uploaded from "@/components/Photos/Uploaded/Uploaded";
import Namevalidation from "@/components/Namevalidation/Namevalidation"; // Import Namevalidation component

const Button1 = () => {
  const [showNewDiv, setShowNewDiv] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<
    string | null
  >(null);
  const [departments, setDepartments] = useState<any[]>([]); // State for departments

  // Fetch departments only once when Button1 is mounted
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch("/api/departments");
        if (!response.ok) {
          throw new Error("Failed to fetch departments");
        }
        const data = await response.json();
        setDepartments(data); // Store fetched departments
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments(); // Call fetch once when the component is mounted
  }, []); // Empty dependency array to make sure it runs only once on mount

  const handleButtonClick = () => {
    setShowNewDiv(!showNewDiv);
  };

  const closePopup = () => {
    setShowNewDiv(false);
  };

  const handleImageUpload = (file: string) => {
    setImageSrc(file);
    console.log("Image uploaded:", file);
  };

  const handleDeleteImage = () => {
    setImageSrc(null);
    console.log("Image deleted");
  };

  const handleDepartmentSelect = (departmentId: string) => {
    setSelectedDepartmentId(departmentId);
    console.log("Department selected (ID):", departmentId);
  };

  const handleSubmit = async (values: any) => {
    const { firstName, lastName } = values;

    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    console.log("Selected Department ID:", selectedDepartmentId);
    console.log("Image Source:", imageSrc);

    if (!firstName || !lastName || !selectedDepartmentId || !imageSrc) {
      console.log("გთხოვ შეავსო ყველა ველი");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", firstName);
      formData.append("surname", lastName);
      formData.append("department_id", selectedDepartmentId);

      if (imageSrc) {
        const fileBlob = await fetch(imageSrc).then((res) => res.blob());
        formData.append("avatar", fileBlob, "avatar.png");
      }

      const response = await fetch("/api/employees", {
        method: "POST",
        headers: {
          Authorization: "Bearer 9e8fae87-b024-4cd6-ad8f-dffb3840af32",
        },
        body: formData,
      });

      if (response.ok) {
        console.log("თანამშრომელი დაემატა წარმატებით!");
        setShowNewDiv(false);
      } else {
        const responseText = await response.text();
        console.log(`დაფიქსირდა შეცდომა: ${responseText}`);
      }
    } catch (error) {
      console.log("დაფიქსირდა შეცდომა: " + error.message);
    }
  };

  return (
    <>
      <button className={styles.button} onClick={handleButtonClick}>
        თანამშრომლის შექმნა
      </button>

      {showNewDiv && (
        <div className={styles.page}>
          <div className={styles.emplo}>
            <img
              className={styles.close}
              src="/images/cancel.png"
              alt="Close"
              onClick={closePopup}
            />
            <h2>თანამშროლმის დამატება</h2>

            {/* Formik Wrapping the Form */}
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
              }}
              onSubmit={handleSubmit}
            >
              <Form className={styles.form}>
                <div className={styles.valids}>
                  {/* Namevalidation with Formik */}
                  <div>
                    <Namevalidation text="სახელი" name="firstName" />
                  </div>
                  <div>
                    <Namevalidation text="გვარი" name="lastName" />
                  </div>
                </div>

                {imageSrc ? (
                  <Uploaded imageSrc={imageSrc} onDelete={handleDeleteImage} />
                ) : (
                  <Upload onUpload={handleImageUpload} />
                )}

                <div className={styles.dep}>
                  {/* Departments Dropdown */}
                  <Departments
                    className="dep"
                    selectedDepartment={selectedDepartmentId}
                    onSelectDepartment={handleDepartmentSelect}
                    departments={departments} // Passing down fetched departments as props
                  />
                </div>

                <div className={styles.buttons}>
                  <button
                    type="button"
                    className={styles.cancel}
                    onClick={closePopup}
                  >
                    გაუქმება
                  </button>
                  <button type="submit" className={styles.add}>
                    დაამატე თანამშრომელი
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      )}
    </>
  );
};

export default Button1;
