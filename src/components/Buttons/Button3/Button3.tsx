import React from "react";
import styles from "./Button3.module.css";

type Props = {
  text: string;
  onClick?: (event: React.MouseEvent) => void; // Add onClick prop
};

const Button3 = ({ text, onClick }: Props) => {
  return (
    <div className={styles.button} onClick={onClick}>
      {text}
    </div>
  );
};

export default Button3;
