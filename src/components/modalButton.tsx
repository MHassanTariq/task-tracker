import React from "react";
import styles from "../utils/styles";
import { Close } from "@mui/icons-material";

interface ModalButtonProps {
  onClick: () => void; // Function to handle click
}

const ModalButton: React.FC<ModalButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles.btnSmall}>
      <Close />
    </button>
  );
};

export default ModalButton;
