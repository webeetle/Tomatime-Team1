import React from "react";
import "./index.css";
import WriteModal from "../WriteModal";
import axios from "axios";

async function moveTask(id, userid){
  const response = await axios.put(`http://localhost:3000/task/move/${id}`, {
      target: "WORKING",
      userid
  });
  return
}


function ToDoList(props) {
  const { list, title, description, taskid, userid } = props;

  return (
    <>
      <div className="container-list">
        <div className="check-list">
          <WriteModal title={title} description={description}/>
        </div>
        <span className="msg-list">{title}</span>
        <div className="arrow-list" onClick={ async () => {
          await moveTask(taskid, userid);
          return window.location.reload();
        }}>→</div>
      </div>
    </>
  );
}

export default ToDoList;
