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
      <button onClick={openDeleteModal}>Cancella</button>
      {isDeleteOpen && (
        <div className="modal-overlay-delete">
          <div className="modal-delete">
            <div className="container-title-delete">
              <span className="title-text-delete">Delete task</span>

              <span className="subtitle-text-delete">
                Are you sure you want to delete this task?
              </span>

              <div className="description-delete">
                <ToDoList />
              </div>
            </div>

            <div className="position-button-delete">
              <button
                className="button-cancel-delete"
                onClick={closeDeleteModal}
              >
                Cancel
              </button>
              <button className="button-del-delete">Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteModal;
