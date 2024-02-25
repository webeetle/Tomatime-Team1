import React, { useState } from "react";
import "./index.css";
import ToDoList from "../ToDoList";
import axios from "axios";
import WriteModal from "../WriteModal";

async function deleteTask(id) {
  await axios.delete(`http://localhost:3000/task/${id}`);
}

function DeleteModal(props) {
  const { title, id } = props;
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const openDeleteModal = () => {
    setIsDeleteOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteOpen(false);
  };

  return (
    <>
      <button className="button-canc-delete" onClick={openDeleteModal}>
        Cancella
      </button>
      {isDeleteOpen && (
        <div className="modal-overlay-delete">
          <div className="modal-delete">
            <div className="container-title-delete">
              <span className="title-text-delete">Delete task</span>

              <span className="subtitle-text-delete">
                Are you sure you want to delete this task?
              </span>

              <div className="description-delete">
                <div className="container-two-elements-delete">
                  <div className="check-list">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </div>
                  <span className="msg-list">{title}</span>
                </div>
              </div>
            </div>

            <div className="position-button-delete">
              <button
                className="button-cancel-delete"
                onClick={closeDeleteModal}
              >
                Return
              </button>
              <button
                className="button-del-delete"
                onClick={async () => {
                  await deleteTask(id);
                  return window.location.reload();
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteModal;
