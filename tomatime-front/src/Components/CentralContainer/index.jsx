import React, { useEffect, useState } from "react";
import "./index.css"
import axios from "axios";

async function moveTask(id, userid, target){
    const response = await axios.put(`http://localhost:3000/task/move/${id}`, {
        target,
        userid
    });
    return
}

async function getTime(id){
    const response = await axios.get(`http://localhost:3000/lc/${id}`);
    const results = response.data;
    console.log(results)
    return results[0].duration;
}


function CentralContainer(props){
    const {taskInProgress} = props;

    const [step, setStep] = useState(1);
    const [startMinutes, setstartMinutes] = useState(0);
    const [nextInLineMinutes, setnextInLineMinutes] = useState(0);

    useEffect( async () => {
        setstartMinutes(await getTime(step));
        setnextInLineMinutes(await getTime(step + 1));
    }, [step])

    const startSeconds = 60;
    /* const startMinutes = async () => {
        return await getTime(step);
    } */
    const startTimer = startMinutes * startSeconds * 1000;
    /* const nextInLineMinutes = async () => {
        return await getTime(step + 1);
    } */

    const minutesToDisplay = startTimer / 1000 / startSeconds;
    let secondsToDisplay = (startTimer / 1000 / startMinutes) % 60;
    if (secondsToDisplay < 10) secondsToDisplay = "0" + secondsToDisplay;


    return (
        <div className="central-container">
            <span className="title-center">TIME TO FOCUS</span>
            <span className="timer">
              {minutesToDisplay}:{secondsToDisplay}
            </span>
            <span className="subtitle-center">NEXT: SHORT BREAK {nextInLineMinutes}min </span>
            <div className="play">
                <div className="circle">
                    <div className="arrow"></div>
                </div>
            </div>
                <span className="uptitle-working">WORKING AT</span>
                <div className="working-rectangle">
                    {taskInProgress.map( (row) => <p className="task-in-progress">{row.title}</p>)}
                </div>
            <div className="final-center">

                <button 
                    className="left-final"
                    onClick={async () => { 
                        await moveTask(taskInProgress[0].id, taskInProgress[0].userid, "TODO"); 
                        return window.location.reload();
                    }}>
                    <span>←To do</span>
                </button>

                <button 
                    className="right-final"
                    onClick={async () => { 
                        await moveTask(taskInProgress[0].id, taskInProgress[0].userid, "DONE" )
                        return window.location.reload();
                    }}>
                    <span>Done→</span>
                </button>
            </div>
        </div>
    )


}

export default CentralContainer;