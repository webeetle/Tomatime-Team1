import React, { useState } from "react";
import "./index.css";
import ToDoList from "../ToDoList";
import axios from "axios";

async function deleteTask(id){
  await axios.delete(`http://localhost:3000/task/${id}`)
}

function DeleteModal(props) {
  const {id} = props;
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
                <ToDoList />
              </div>
            </div>

            <div className="position-button-delete">
              <button
                className="button-cancel-delete"
                onClick={closeDeleteModal}
              >
                Return
              </button>
              <button className="button-del-delete" onClick={async () => {
                await deleteTask(id);
                return window.location.reload();
              }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteModal;
