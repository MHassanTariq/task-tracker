import React, { useState } from "react";
import TaskTrackerModal from "./taskTrackerModal";
import colors from "../utils/colors";
const WhatsNewModal = () => {
  const [modalOpen, setIsModalOpen] = useState(true);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <TaskTrackerModal isOpen={modalOpen} onRequestClose={closeModal}>
      <div className="flex flex-row justify-between items-start space-x-6">
        <div className="flex flex-col space-y-4 text-left">
          <h1
            className={`${colors.titleText}  mb-8`}
            // style={{ marginBottom: "32px" }}
          >
            What's New! 🎉
          </h1>
          <h2
            className={`${colors.text} text-base font-bold`}
            style={{ marginBottom: "53px" }}
          >
            Draggable Tasks
          </h2>
          <div className="justify-start h-full">
            <p className={`${colors.text} text-right`}>
              Effortlessly organize your tasks with the new drag and drop
              functionality. Simply drag tasks to reorder and prioritize them as
              needed. Task management just got a whole lot easier!
            </p>
          </div>
        </div>
        <div>
          <iframe
            title="Video Player"
            src="https://www.youtube.com/embed/MT6jpdYsZYg"
            width="227"
            height="227"
            className="rounded-lg  w-full h-56 sm:w-56 sm:h-56 mt-12"
            style={{ marginTop: "120px" }}
            allow="autoplay; encrypted-media"
          />
        </div>
      </div>
    </TaskTrackerModal>
  );
};

export default WhatsNewModal;
