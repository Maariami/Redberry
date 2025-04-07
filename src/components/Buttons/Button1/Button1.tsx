"use client";
import React, { useState } from "react";
import styles from "./Button1.module.css";
import Departments from "@/components/Departments/Departments";
import Upload from "@/components/Photos/Upload/Upload";
import Uploaded from "@/components/Photos/Uploaded/Uploaded";
import Namevalidation from "@/components/Namevalidation/Namevalidation";

const Button1 = () => {
  const [showNewDiv, setShowNewDiv] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<
    string | null
  >(null);

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

  const handleFirstNameChange = (value: string) => {
    setFirstName(value);
    console.log("First Name changed:", value);
  };

  const handleLastNameChange = (value: string) => {
    setLastName(value);
    console.log("Last Name changed:", value);
  };

  const handleSubmit = async () => {
    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    console.log("Selected Department ID:", selectedDepartmentId);
    console.log("Image Source:", imageSrc);

    if (!firstName || !lastName || !selectedDepartmentId || !imageSrc) {
      alert("გთხოვ შეავსო ყველა ველი");
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
        alert("თანამშრომელი დაემატა წარმატებით!");
        setShowNewDiv(false);
        setFirstName("");
        setLastName("");
        setImageSrc(null);
        setSelectedDepartmentId(null);
      } else {
        const responseText = await response.text();
        alert(`დაფიქსირდა შეცდომა: ${responseText}`);
      }
    } catch (error) {
      alert("დაფიქსირდა შეცდომა: " + error.message);
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

            <div className={styles.valids}>
              <div>
                <Namevalidation
                  text="სახელი"
                  value={firstName}
                  onChange={handleFirstNameChange}
                />
              </div>
              <div>
                <Namevalidation
                  text="გვარი"
                  value={lastName}
                  onChange={handleLastNameChange}
                />
              </div>
            </div>

            {imageSrc ? (
              <Uploaded imageSrc={imageSrc} onDelete={handleDeleteImage} />
            ) : (
              <Upload onUpload={handleImageUpload} />
            )}

            <div className={styles.dep}>
              <Departments
                className={styles.dep}
                selectedDepartment={selectedDepartmentId}
                onSelectDepartment={handleDepartmentSelect}
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
              <button
                type="button"
                className={styles.add}
                onClick={handleSubmit}
              >
                დაამატე თანამშრომელი
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Button1;
