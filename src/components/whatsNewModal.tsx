import React from "react";
import Modal from "react-modal";
import colors from "../utils/colors";
import styles from "../utils/styles";
import ModalButton from "./modalButton";

Modal.setAppElement("#root");

interface WhatsNewModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const WhatsNewModal: React.FC<WhatsNewModalProps> = ({
  isOpen,
  onRequestClose,
}) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <div className="modal-content">
        <ModalButton onClick={onRequestClose} />
        <h2>What's New! 🎉</h2>
        <h3>Draggable Tasks</h3>
        <p>
          Effortlessly organize your tasks with the new drag and drop
          functionality. Simply drag tasks to reorder and prioritize them as
          needed. Task management just got a whole lot easier!
        </p>
        <div className="image-container">
          <img src="" alt="Draggable Tasks" />
        </div>
        <div className="navigation-buttons">
          <button>←</button>
          <button>→</button>
        </div>
      </div>
    </Modal>
  );
};

export default WhatsNewModal;
