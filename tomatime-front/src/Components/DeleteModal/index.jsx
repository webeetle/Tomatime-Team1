import React, { useState } from "react";
import "./index.css";
import ToDoList from "../ToDoList";

function DeleteModal() {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const openDeleteModal = () => {
    setIsDeleteOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteOpen(false);
  };

  return (
    <>
      <button onClick={openDeleteModal} className="basket">
        Cancella
      </button>
      {isDeleteOpen && (
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
                <button className="button-cancel" onClick={closeDeleteModal}>
                  Cancel
                </button>
                <button className="button-del">Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteModal;
