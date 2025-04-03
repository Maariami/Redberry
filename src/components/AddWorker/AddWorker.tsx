import React from "react";
import styles from "./AddWorker.module.css";

type Image = "add" | "show";

type Props = {
  image: Image;
  name?: string;
  photo?: string;
};

const show = (image: Image, name?: string, photo?: string) => {
  switch (image) {
    case "show":
      return {
        photo: photo, // Default image if none is provided
        text: name,
        style: "black",
      };
    case "add":
      return {
        photo: "/images/AddWorker.png",
        text: "დაამატე თანამშრომელი",
        style: "purple",
      };
  }
};

const AddWorker = ({ image, name, photo }: Props) => {
  const { photo: displayPhoto, text, style } = show(image, name, photo);
  return (
    <div className={styles.worker}>
      <img src={displayPhoto} alt={text} />
      <p className={styles[style]}>{text}</p>
    </div>
  );
};

export default AddWorker;
