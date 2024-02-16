import React, { useEffect, useState, useRef } from "react";
import "./index.css";
import Counter from "../Counter";
import ToDoList from "../ToDoList";
import AnotherList from "../AnotherList";
import DoneList from "../DoneList";
import axios from "axios";


const startSeconds = 60;
const startMinutes = 25;
const startTimer = startMinutes * startSeconds * 1000;

function Home(props) {
  const minutesToDisplay = startTimer / 1000 / startSeconds;
  let secondsToDisplay = (startTimer / 1000 / startMinutes) % 60;
  if (secondsToDisplay < 10) secondsToDisplay = "0" + secondsToDisplay;



  const [task, setTask] = useState({});
  useEffect( () => {
    fetchTask()
  },  []);

  const fetchTask = async () => {
    const response = await axios.get("http://localhost:3000/task/1");
    const results = response.data;
    setTask(results);
    console.log(results);
  }

if(task.todo){
    return (
      <>
        <div className="home-container">
          <div className="navbar">
            <div className="tomatime-img"></div>
            <div className="counter-icons">
              <Counter
                className={"todoTask"}
                image="/src/imgs/todoTask.svg"
                number={0}
              />
              <Counter
                className={"completedTask"}
                image="/src/imgs/completedTask.svg"
                number={0}
              />
              <Counter
                className={"brokenTask"}
                image="/src/imgs/brokenTask.svg"
                number={0}
              />
            </div>
            <div className="img-icon"></div>
          </div>
          <div className="main-container">
            <div className="container-div">
              <div className="left-container">
                <span className="title-left">TO DO</span>
                <dl>
                  <dt>
                    {/* <ToDoList title="Prova" description="" />   */}
                    {task.todo[0].map((row) => <ToDoList title={row.title} description={row.description} taskid={row.id} userid={row.user_id} />)}                      
                    <AnotherList />
                  </dt>
                </dl>
              </div>
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
                  {task.inProgress[0].map( (row) => <p>{row.title}</p>)}
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
              <div className="right-container">
                <span className="title-right">DONE</span>
                {task.done[0].map((row) => <DoneList title={row.title} />)}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
