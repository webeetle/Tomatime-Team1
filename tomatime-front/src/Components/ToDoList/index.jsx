import React, { useState } from "react";
import "./index.css";
import WriteModal from "../WriteModal";
import axios from "axios";

async function moveTask(id, userid) {
  const response = await axios.put(`http://localhost:3000/task/move/${id}`, {
    target: "WORKING",
    userid,
  });
  return;
}

function ToDoList(props) {
  const { title, description, taskid, userid } = props;
  const [isWriteOpen, setIsWriteOpen] = useState(false);
  const openWriteModal = () => {
    setIsWriteOpen(true);
  };

  const closeWriteModal = (e) => {
    e.stopPropagation();
    setIsWriteOpen(false);
  };

  return (
    <>
      <div className="container-two-elements-todo" onClick={openWriteModal}>
        <div>
          <WriteModal
            title={title}
            description={description}
            id={taskid}
            isWriteOpen={isWriteOpen}
            closeWriteModal={closeWriteModal}
          />
        </div>

        <div className="container-arrow">
          <div className="arrow-move-label">Move to Doing</div>
          <button
            className="container-arrow-list"
            onClick={async (e) => {
              e.stopPropagation();
              await moveTask(taskid, userid);
              return window.location.reload();
            }}
          >
            <div className="arrow-list">
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
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </div>
          </button>
        </div>

        {/* <span className="msg-list">{title}</span> */}
      </div>
    </>
  );
}

export default ToDoList;
