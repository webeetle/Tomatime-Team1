import React, { useState } from "react";
import "./index.css";
import ToDoList from "../ToDoList";
import axios from "axios";

async function createTask(createTitle, createDescription, createUserId) {
  const create = await axios.post(`http://localhost:3000/task/`, {
    title: createTitle,
    description: createDescription,
    user_id: createUserId,
  });
  return window.location.reload();
}

function AddModal(props) {
  const { userid } = props;
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { rerender } = props;

  const openAddModal = () => {
    setIsAddOpen(true);
  };

  const closeAddModal = () => {
    setIsAddOpen(false);
  };

  return (
    <>
      <span onClick={openAddModal} className="svg-icon-add">
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
            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </span>

      {isAddOpen && (
        <div className="modal-overlay-add">
          <form
            action=""
            onSubmit={async (e) => {
              e.preventDefault();
              await createTask(title, description, userid);
              closeAddModal();
              rerender(3);
            }}
          >
            <div className="modal-add">
              <div className="modal-title-add">
                <div className="image-add"></div>

                <input
                  type="text"
                  placeholder="Insert Title"
                  className="title-text-add"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  required
                />
                <button className="icon-add" onClick={closeAddModal}>
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
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <textarea
                className="compile-text-add"
                placeholder="Add information to the task"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                required
              ></textarea>

              <div className="position-button-add">
                <div></div>
                <button className="button-del-add" type="submit">
                  Add task
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default AddModal;
