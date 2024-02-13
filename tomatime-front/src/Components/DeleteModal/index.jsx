import React, { useState } from "react";
import "./index.css";
import ToDoList from "./Components/ToDoList";
import "./Components/ToDoList/index.css";

function DeleteModal() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="modal-main">
      <button onClick={openModal} className="basket"></button>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div>
              <span className="title-text">Delete task</span>
            </div>
            <div>
              <span className="subtitle-text">
                Are you sure you want to delete this task?
              </span>
            </div>
            <div className="description">
              <ToDoList />
            </div>
            <div className="position-button">
              <div></div>
              <div>
                <button className="button-cancel" onClick={closeModal}>
                  Cancel
                </button>
                <button className="button-del">Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteModal;
