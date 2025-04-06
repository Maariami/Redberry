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
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  );

  // Toggle the form visibility when the button is clicked
  const handleButtonClick = () => {
    setShowNewDiv(!showNewDiv);
  };

  // Close the popup form
  const closePopup = () => {
    setShowNewDiv(false);
  };

  // Handle the uploaded image
  const handleImageUpload = (file: string) => {
    setImageSrc(file);
    console.log("Image uploaded:", file); // Log image upload
  };

  // Handle the image deletion
  const handleDeleteImage = () => {
    setImageSrc(null);
    console.log("Image deleted"); // Log image deletion
  };

  // Handle the department selection
  const handleDepartmentSelect = (departmentName: string) => {
    setSelectedDepartment(departmentName);
    console.log("Department selected:", departmentName); // Log department selection
  };

  // Handle first name change
  const handleFirstNameChange = (value: string) => {
    setFirstName(value);
    console.log("First Name changed:", value);
  };

  // Handle last name change
  const handleLastNameChange = (value: string) => {
    setLastName(value);
    console.log("Last Name changed:", value);
  };

  // Handle the form submission
  const handleSubmit = async () => {
    // Log all entered values before submission
    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    console.log("Selected Department:", selectedDepartment);
    console.log("Image Source:", imageSrc);

    // Check if all fields are filled
    if (!firstName || !lastName || !selectedDepartment || !imageSrc) {
      alert("გთხოვ შეავსო ყველა ველი");
      return;
    }

    try {
      // Create FormData object to send the data to the API
      const formData = new FormData();
      formData.append("name", firstName);
      formData.append("surname", lastName);
      formData.append("department_id", selectedDepartment);

      // Convert image to Blob and append it
      if (imageSrc) {
        const fileBlob = await fetch(imageSrc).then((res) => res.blob());
        formData.append("avatar", fileBlob, "avatar.png");
      }

      // Log form data before sending
      console.log("Form data being sent to the API:", formData);

      // Send the POST request to add the employee
      const response = await fetch(
        "https://momentum.redberryinternship.ge/api/employees",
        {
          method: "POST",
          headers: {
            Authorization: " Bearer 9e8fae87-b024-4cd6-ad8f-dffb3840af32", // Replace with your actual API key if necessary
          },
          body: formData,
        }
      );

      // Check the response
      if (response.ok) {
        alert("თანამშრომელი დაემატა წარმატებით!");
        setShowNewDiv(false); // Close the form after successful submission
        setFirstName("");
        setLastName("");
        setImageSrc(null);
        setSelectedDepartment(null); // Reset fields after submission
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
                  value={firstName} // Pass the firstName value
                  onChange={handleFirstNameChange} // Pass the onChange handler
                />
              </div>
              <div>
                <Namevalidation
                  text="გვარი"
                  value={lastName} // Pass the lastName value
                  onChange={handleLastNameChange} // Pass the onChange handler
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
                selectedDepartment={selectedDepartment}
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
                onClick={handleSubmit} // Ensure the form data is submitted when this button is clicked
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
