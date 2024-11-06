import React, { ReactNode, useEffect, useRef } from "react";
import ReactModal from "react-modal";
import styles from "../utils/styles";
import colors from "../utils/colors";

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  children: ReactNode;
}

const TaskTrackerModal: React.FC<ModalProps> = ({
  isOpen,
  onRequestClose,
  children,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onRequestClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });

  return (
    <ReactModal
      className={`${colors.bg} ${styles.modalContainer}`}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      overlayClassName={colors.modalOverlay}
    >
      <div ref={modalRef}>{children}</div>
    </ReactModal>
  );
};

export default TaskTrackerModal;
