import React, { useState } from "react";
import styles from "./Upload.module.css";

type Props = {
  onUpload: (file: string) => void; // Callback to pass the uploaded image to parent
};

const Upload = ({ onUpload }: Props) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Get the first file

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string); // Set the image preview
        onUpload(reader.result as string); // Pass the uploaded image URL to parent
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  return (
    <>
      <p className={styles.title}>ავატარი*</p>
      <div className={styles.block}>
        <img src="/images/gallery-export.png" alt="Upload" />

        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }} // Hidden file input
          onChange={handleFileChange}
        />
        <p onClick={() => document.getElementById("fileInput")?.click()}>
          ატვირთე ფოტო
        </p>

        {/* Optionally show image preview after uploading */}
        {imagePreview && (
          <div className={styles.preview}>
            <img
              src={imagePreview}
              alt="Preview"
              className={styles.avatarPreview}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Upload;
