import React, { useState } from "react";
import "./index.css"; // Importa il file CSS per lo stile della modale

function Modal() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>Add task</button>

      {isOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-title">
              <div class="image"></div>
              <span class="title-text">Send message</span>
            </div>
            <textarea placeholder="Send a message to Tony:see you tomorrow?"></textarea>
            <div className="position-button">
              <div></div>
              <div>
                <button className="button-cancel" onClick={closeModal}>
                  Cancel
                </button>
                <button className="button-add">Add task</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
