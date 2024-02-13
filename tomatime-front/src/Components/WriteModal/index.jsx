import React, { useState } from "react";
import "./index.css";
import DeleteModal from "../DeleteModal";

function WriteModal() {
  const [isWriteOpen, setIsWriteOpen] = useState(false);

  const openWriteModal = () => {
    setIsWriteOpen(true);
  };

  const closeWriteModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <span onClick={openWriteModal} className="msg-list">
        Add task
      </span>

      {isWriteOpen && (
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
                <button className="button-cancel" onClick={closeWriteModal}>
                  <DeleteModal />
                </button>
                <button className="button-add">Add task</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default WriteModal;
