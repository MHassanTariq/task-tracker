import React from "react";
import { CircleX } from "lucide-react";

interface ModalProps {
  onClose: () => void; // Function type for the close button
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {
  return (
    <div>
      <div>
        <button onClick={onClose}>
          <CircleX />
        </button>
        <div>
          <h1>What’s New! 🎉</h1>
          <p>
            Effortlessly organize your tasks with the new drag and drop
            functionality. Simply drag tasks to reorder and prioritize them as
            needed. Task management just got a whole lot easier!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
