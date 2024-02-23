import React from "react";
import "./index.css";
import ToDoList from "../ToDoList";
import AnotherList from "../AnotherList";
import { useState, useEffect } from "react";

function LeftContainer(props) {
  const { taskList } = props;

  const [rerender, setRerender] = useState(true);

  const handleRerendering = () => {
    return setRerender(!rerender);
  };

  return (
    <div className="left-container">
      <span className="title-left">TO DO</span>
      <dl>
        <dt>
          {taskList.map((row) => (
            <ToDoList
              title={row.title}
              description={row.description}
              taskid={row.id}
              userid={row.user_id}
            />
          ))}
          <AnotherList rerender={handleRerendering} />
        </dt>
      </dl>
    </div>
  );
}

export default LeftContainer;
