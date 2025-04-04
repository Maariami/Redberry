import React, { useState } from "react";
import styles from "./Button1.module.css";
import AddCoworker from "@/components/AddCoworker/AddCoworker"; // Import your AddCoworker component

type Props = {
  children?: React.ReactNode;
};

const Button1 = ({ children = "თანამშრომლის შექმნა" }: Props) => {
  const [showModal, setShowModal] = useState(false); // Manage modal visibility

  const handleButtonClick = () => {
    setShowModal(true); // Open the modal when the button is clicked
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
  };

  return (
    <div>
      <button
        className={styles.button}
        onClick={handleButtonClick}
        type="button"
      >
        {children}
      </button>

      {/* Render AddCoworker Modal when showModal is true */}
      {showModal && <AddCoworker onClose={handleCloseModal} />}
    </div>
  );
};

export default Button1;
