import React, { useState } from "react";
import styles from "./AddCoworker.module.css";
import Departments from "@/components/Departments/Departments";
import Upload from "@/components/Photos/Upload/Upload";
import Uploaded from "@/components/Photos/Uploaded/Uploaded";

type AddCoworkerProps = {
  onClose: () => void; // Close handler passed from Button1
};

const AddCoworker = ({ onClose }: AddCoworkerProps) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  );

  // Handle the uploaded image
  const handleImageUpload = (file: string) => {
    setImageSrc(file);
  };

  // Handle the image deletion
  const handleDeleteImage = () => {
    setImageSrc(null);
  };

  // Handle the department selection
  const handleDepartmentSelect = (departmentName: string) => {
    setSelectedDepartment(departmentName);
  };

  // Handle the form submission
  const handleSubmit = async () => {
    if (!firstName || !lastName || !selectedDepartment || !imageSrc) {
      alert("გთხოვ შეავსო ყველა ველი");
      return;
    }

    const token = "9e8fae87-b024-4cd6-ad8f-dffb3840af32"; // 👈 same as Selects

    try {
      const formData = new FormData();
      formData.append("name", firstName);
      formData.append("surname", lastName);
      formData.append("department_id", selectedDepartment);

      const fileBlob = await fetch(imageSrc).then((res) => res.blob());
      formData.append("avatar", fileBlob, "avatar.png");

      const response = await fetch(
        "https://momentum.redberryinternship.ge/api/employees",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`, // ✅ here
          },
          body: formData,
        }
      );

      if (response.ok) {
        alert("თანამშრომელი დაემატა წარმატებით!");
        onClose();
      } else {
        const responseText = await response.text();
        alert(`დაფიქსირდა შეცდომა: ${responseText}`);
      }
    } catch (error: any) {
      alert("დაფიქსირდა შეცდომა: " + error.message);
    }
  };

  return (
    <div className={styles.back}>
      <div className={styles.page}>
        <img
          className={styles.close}
          src="/images/cancel.png"
          alt="Close"
          onClick={onClose}
        />
        <h2>თანამშროლმის დამატება</h2>

        <div>
          <label>*სახელი</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="სახელი"
          />
        </div>

        <div>
          <label>*გვარი</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="გვარი"
          />
        </div>

        {imageSrc ? (
          <Uploaded imageSrc={imageSrc} onDelete={handleDeleteImage} />
        ) : (
          <Upload onUpload={handleImageUpload} />
        )}

        <div>
          <Departments
            selectedDepartment={selectedDepartment}
            onSelectDepartment={handleDepartmentSelect}
          />
        </div>

        <div className={styles.buttons}>
          <button type="button" className={styles.cancel} onClick={onClose}>
            გაუქმება
          </button>
          <button type="button" className={styles.add} onClick={handleSubmit}>
            დაამატე თანამშრომელი
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCoworker;
