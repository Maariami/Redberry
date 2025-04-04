import React from "react";
import styles from "./Button4.module.css";

type Props = {
  onClick?: () => void; // Optional click handler
};

const Button4 = ({ onClick }: Props) => {
  return (
    <div className={styles.button} onClick={onClick}>
      <img src="/images/Left 2.png" alt="" />
      <p>უპასუხე</p>
    </div>
  );
};

export default Button4;
