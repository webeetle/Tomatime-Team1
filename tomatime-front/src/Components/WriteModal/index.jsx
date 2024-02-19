import React, { useState } from "react";
import "./index.css";
import ModifyModal from "../ModifyModal";
import DeleteModal from "../DeleteModal";

function WriteModal(props) {
  const [isWriteOpen, setIsWriteOpen] = useState(false);
  const {title, description, id} = props;
  const openWriteModal = () => {
    setIsWriteOpen(true);
  };

  const closeWriteModal = () => {
    setIsWriteOpen(false);
  };

  return (
    <>
      <span onClick={openWriteModal} className="msg-list">
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
      </span>

      {isWriteOpen && (
        <div className="modal-overlay-write">
          <div className="modal-write">
            <div className="modal-title-write">
              <div className="image-write"></div>
              <span
                type="text"
                placeholder="Insert Title"
                className="title-text-write"
              >
                {title}
              </span>
              <button className="svg-icon-write" onClick={closeWriteModal}>
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
              className="compile-text-write"
              placeholder={description}
            ></textarea>

            <div className="button-container-write">
              <DeleteModal id={id} />

              {/* <button className="button-add-write">Add task</button> */}
              <ModifyModal id={id} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default WriteModal;
