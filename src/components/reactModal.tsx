import React, { useState } from "react";
import WhatsNewModal from "./whatsNewModal";

const ReactModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); //React component names must start with an uppercase letter

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="App">
      <button onClick={openModal}></button>
      <WhatsNewModal isOpen={isModalOpen} onRequestClose={closeModal} />
    </div>
  );
};

export default ReactModal;
