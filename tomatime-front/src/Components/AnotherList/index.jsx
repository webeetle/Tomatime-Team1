import React, { useState } from "react";
import "./index.css";
import WriteModal from "../WriteModal";
import AddModal from "../AddModal";

function AnotherList(props) {

  const {rerender} = props;

  return (
    <>
      <div className="container-another-list">
        <AddModal userid={1} rerender={rerender} />
        <span className="msg-list">Add Task</span>
      </div>
    </>
  );
}

export default AnotherList;
