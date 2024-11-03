// ContentComponent.js
import React, { useState } from "react";
import TaskTrackerModal from "./taskTrackerModal";
import colors from "../utils/colors";

const WhatsNewModal = () => {
  const [modalOpen, setIsModalOpen] = useState(true);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="Task Tracker">
      <button onClick={openModal}>Whats New</button>
      <TaskTrackerModal isOpen={modalOpen} onRequestClose={closeModal}>
        <h2 className={colors.titleText}>What's New! 🎉</h2>
        <h3>Draggable Tasks</h3>
        <p>
          Effortlessly organize your tasks with the new drag and drop
          functionality. Simply drag tasks to reorder and prioritize them as
          needed. Task management just got a whole lot easier!
        </p>
        <button onClick={closeModal}>Close</button>
      </TaskTrackerModal>
    </div>
  );
};

export default WhatsNewModal;
