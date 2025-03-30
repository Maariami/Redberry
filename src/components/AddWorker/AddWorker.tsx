import React from "react";
import styles from "./AddWorker.module.css";

type Image = "add" | "show";
type Props = {
  image: Image;
};
const show = (image: Image) => {
  switch (image) {
    case "show":
      return {
        photo: "/images/Ellipse 3892.png",
        text: "Tamar kvantalia",
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
const AddWorker = ({ image }: Props) => {
  const { photo, text, style } = show(image);
  return (
    <div className={styles.worker}>
      <img src={photo} alt="" />
      <p className={styles[style]}>{text}</p>
    </div>
  );
};

export default AddWorker;
