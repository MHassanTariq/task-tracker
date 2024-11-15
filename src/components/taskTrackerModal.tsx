import React, { ReactNode } from "react";
import ReactModal from "react-modal";
import styles from "../utils/styles";
import colors from "../utils/colors";
import { CloseIcon } from "../assets/svgs/closeIcon";
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
  return (
    <ReactModal
      className={`${styles.modalContainer} `}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      overlayClassName={colors.modalOverlay}
      shouldCloseOnOverlayClick={false}
    >
      <div className="flex justify-end">
        <button onClick={onRequestClose} aria-label="Close Modal">
          <CloseIcon />
        </button>
      </div>
      <div className="modal-content">{children}</div>
    </ReactModal>
  );
};

export default TaskTrackerModal;
