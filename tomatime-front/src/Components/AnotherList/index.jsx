import React from "react";
import "./index.css";
import WriteModal from "../WriteModal";
import AddModal from "../AddModal";

function AnotherList() {
  return (
    <>
      <div className="container-another-list">
        <AddModal />

        {/* <WriteModal /> */}
        <span className="msg-list">Add Task</span>
      </div>
    </>
  );
}

export default AnotherList;
