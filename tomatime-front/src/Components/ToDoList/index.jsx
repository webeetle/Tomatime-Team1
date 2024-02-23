import React from "react";
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

  return (
    <>
      <div className="container-list">
        <div className="check-list">
          <WriteModal title={title} description={description} id={taskid} />
        </div>
        <span className="msg-list">{title}</span>
        <button
          className="container-arrow-list"
          onClick={async () => {
            await moveTask(taskid, userid);
            return window.location.reload();
          }}
        >
          <div className="arrow-list">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </div>
        </button>
      </div>
    </>
  );
}

export default ToDoList;
