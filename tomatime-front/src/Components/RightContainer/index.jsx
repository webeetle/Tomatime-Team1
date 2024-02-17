import React from "react";
import "./index.css"
import DoneList from "../DoneList";

function RightContainer(props){
    const {taskList} = props;

    return (
        <div className="right-container">
            <span className="title-right">DONE</span>
            {taskList.map((row) => <DoneList title={row.title} />)}
        </div>
    )
}

export default RightContainer;