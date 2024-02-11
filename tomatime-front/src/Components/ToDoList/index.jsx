import React from "react";
import "./index.css";

function ToDoList() {
  return (
    <>
      <div className="container-list">
        <div className="check-list">
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
              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
        <span className="msg-list">Read emails</span>
        <div className="arrow-list">→</div>
      </div>
    </>
  );
}

export default ToDoList;
