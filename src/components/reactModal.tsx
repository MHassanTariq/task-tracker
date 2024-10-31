import React, { useState } from "react";
import WhatsNewModal from "./whatsNewModal";

const ReactModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); 

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
