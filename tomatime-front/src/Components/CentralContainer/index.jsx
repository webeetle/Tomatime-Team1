import React from "react";
import "./index.css"

const startSeconds = 60;
const startMinutes = 25;
const startTimer = startMinutes * startSeconds * 1000;


function CentralContainer(props){
    const {taskInProgress} = props;
    
    const minutesToDisplay = startTimer / 1000 / startSeconds;
    let secondsToDisplay = (startTimer / 1000 / startMinutes) % 60;
    if (secondsToDisplay < 10) secondsToDisplay = "0" + secondsToDisplay;


    return (
        <div className="central-container">
            <span className="title-center">TIME TO FOCUS</span>
            <span className="timer">
              {minutesToDisplay}:{secondsToDisplay}
            </span>
            <span className="subtitle-center">NEXT: SHORT BREAK(+5MIN)</span>
            <div className="play">
                <div className="circle">
                    <div className="arrow"></div>
                </div>
            </div>
                <span className="uptitle-working">WORKING AT</span>
                <div className="working-rectangle">
                    {taskInProgress.map( (row) => <p>{row.title}</p>)}
                </div>
            <div className="final-center">
                <button className="left-final">
                    <span>←To do</span>
                </button>
                <button className="right-final">
                    <span>Done→</span>
                </button>
            </div>
        </div>
    )


}

export default CentralContainer;