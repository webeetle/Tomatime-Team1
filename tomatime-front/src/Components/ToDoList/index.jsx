import React from "react";
import "./index.css";
import WriteModal from "../WriteModal";

function ToDoList(props) {
  const { list } = props;

  return (
    <>
      <div className="container-list">
        <div className="check-list">
          <WriteModal />
        </div>
        <span className="msg-list">Read emails</span>
        <div className="arrow-list">→</div>
      </div>
    </>
  );
}

export default ToDoList;
