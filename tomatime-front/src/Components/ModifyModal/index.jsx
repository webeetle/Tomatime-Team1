import React, { useState } from "react";
import "./index.css";
import ToDoList from "../ToDoList";

function ModifyModal() {
  const [isModifyOpen, setIsModifyOpen] = useState(false);

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
            <form action="">
              <input
                type="text"
                placeholder="Insert Title"
                className="title-text-modify"
                required
              />

              <textarea
                className="compile-text-modify"
                placeholder="Modify information to the task"
                required
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
