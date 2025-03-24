"use client";
import React from "react";
import clsx from "clsx";
import styles from "./CustomCheckbox.module.css";

interface CustomCheckboxProps {
  checked: boolean;
  onClick: () => void;
  label: string;
}

const CustomCheckbox = ({ checked, onClick, label }: CustomCheckboxProps) => {
  return (
    <div className={styles.checkboxContainer} onClick={onClick}>
      <div
        className={clsx(styles.checkbox, {
          [styles.checked]: checked,
        })}
      >
        {checked && (
          <img
            src="/images/check.png"
            alt="Checked"
            className={styles.checkmarkImage}
          />
        )}
      </div>
      <span className={styles.checkboxLabel}>{label}</span>
    </div>
  );
};

export default CustomCheckbox;
