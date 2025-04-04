import React from "react";
import styles from "./Uploaded.module.css";

type Props = {
  imageSrc: string | null; // The uploaded image URL
  onDelete: () => void; // Callback to handle delete action
};

const Uploaded = ({ imageSrc, onDelete }: Props) => {
  return (
    <>
      <p className={styles.title}>ავატარი*</p>
      <div className={styles.block}>
        {imageSrc ? (
          <img className={styles.avatar} src={imageSrc} alt="Avatar" />
        ) : (
          <p>No avatar uploaded</p>
        )}
        <img
          className={styles.trash}
          src="/images/Frame 1000006036.png"
          alt="Delete"
          onClick={onDelete} // Trigger delete when clicked
        />
      </div>
    </>
  );
};

export default Uploaded;
