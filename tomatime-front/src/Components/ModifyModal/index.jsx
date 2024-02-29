import React, { useState } from "react";
import "./index.css";
import axios from "axios";

async function editTask(editID, editTitle, editDescription) {
  const create = await axios.put(`http://localhost:3000/task/${editID}`, {
    title: editTitle,
    description: editDescription,
  });
  return window.location.reload();
}

function ModifyModal(props) {
  const { id } = props;
  const [isModifyOpen, setIsModifyOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const openModifyModal = () => {
    setIsModifyOpen(true);
  };

  const closeModifyModal = () => {
    setIsModifyOpen(false);
  };
  return (
    <>
      <button className="button-mod-modify" onClick={openModifyModal}>
        Modify Task
      </button>
      {isModifyOpen && (
        <div className="modal-overlay-modify">
          <div className="modal-modify">
            <div className="container-title-modify">
              <span className="title-text-modify">Modify task</span>

              <span className="subtitle-text-modify">
                Are you sure you want to modify this task?
              </span>
            </div>
            <form
              className="form-modify"
              action=""
              on
              onSubmit={(e) => {
                e.preventDefault();
                editTask(id, title, description);
              }}
            >
              <input
                type="text"
                placeholder="Insert Title"
                value={title}
                className="title-text-modify"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                required
              />

              <textarea
                className="compile-text-modify"
                placeholder="Modify information to the task"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></textarea>
              <div className="position-button-modify">
                <button
                  className="button-cancel-modify"
                  onClick={closeModifyModal}
                >
                  Return
                </button>
                <button className="button-mod-modify">Modify</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ModifyModal;
