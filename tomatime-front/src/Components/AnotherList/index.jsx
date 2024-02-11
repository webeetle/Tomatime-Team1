import React from "react";
import "./index.css";

function AnotherList() {
  return (
    <>
      <div className="container-another-list">
        <div className="plus-list">
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
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
        <span className="msg-list">Read emails</span>
      </div>
    </>
  );
}

export default AnotherList;
