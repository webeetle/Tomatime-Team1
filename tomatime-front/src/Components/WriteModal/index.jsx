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
        <div className="modal-overlay-write">
          <div className="modal-write">
            <div className="modal-title-write">
              <div className="image-write"></div>
              <span className="title-text-write">Send message</span>
            </div>
            <textarea
              className="compile-text-write"
              placeholder="Send a message to Tony:see you tomorrow?"
            ></textarea>

            <div className="button-container-write">
              <button className="button-cancel-write" onClick={closeWriteModal}>
                <DeleteModal />
              </button>
              <button className="button-add-write">Add task</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default WriteModal;
