import React from "react";
import styles from "./Filtered.module.css";

type Props = {
  selectedItems?: string[];
  removeItem?: (item: string) => void; // Add removeItem prop
};

const Filtered = ({ selectedItems = [], removeItem }: Props) => {
  const handleRemove = (item: string) => {
    if (removeItem) {
      removeItem(item);
    }
  };

  return (
    <div className={styles.box}>
      {selectedItems.length === 0 ? (
        <div></div>
      ) : (
        selectedItems.map((item, index) => (
          <div key={index} className={styles.picked}>
            <span>{item}</span>
            <p onClick={() => handleRemove(item)}>x</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Filtered;
