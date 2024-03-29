import React, { useEffect, useState, useRef } from "react";
import "./index.css";
import Counter from "../Counter";
import axios from "axios";
import LeftContainer from "../LeftContainer";
import CentralContainer from "../CentralContainer";
import RightContainer from "../RightContainer";
import { Link } from "react-router-dom";

function Home(props) {
  const [task, setTask] = useState({});
  const [clock, setClock] = useState(false);
  const [counters, setCounters] = useState({});

  const toggleClock = () => {
    setClock(!clock);
  };

  useEffect(() => {
    fetchTask();
    fetchCounters();
  }, []);

  const fetchTask = async () => {
    const response = await axios.get("http://localhost:3000/task/1"); //next
    const results = response.data;
    setTask(results);
  };

  const fetchCounters = async () => {
    const response = await axios.get("http://localhost:3000/counter/1");
    const results = response.data;
    setCounters(results);
  };

  if (task.todo && counters.counters) {
    return (
      <>
        <div className="home-container">
          <div className="navbar">
            <div className="tomatime-img"></div>
            <div className="counter-icons">
              <Counter
                className={"todoTask"}
                image="/src/imgs/todoTask.svg"
                number={counters.counters[0][0].doneTasks}
                name={"Task done"}
              />
              <Counter
                className={"completedTask"}
                image="/src/imgs/completedTask.svg"
                number={counters.counters[1][0].completedTomatoes}
                name={"Completed"}
              />
              <Counter
                className={"brokenTask"}
                image="/src/imgs/brokenTask.svg"
                number={counters.counters[2][0].brokeTomatoes}
                name={"Smashed"}
              />
            </div>
            <div className="img-icon">
              <div className="edit-profile">
                <span className="edit-profile-title">Edit profile</span>
                <Link to="/">
                  <button className="edit-profile-button">
                    <span className="edit-profile-button-text">LOGOUT</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="main-container">
            <div className="container-div">
              <LeftContainer taskList={task.todo[0]} />

              <CentralContainer
                taskInProgress={task.inProgress[0]}
                toggleClock={toggleClock}
                clock={clock}
              />

              <RightContainer taskList={task.done[0]} />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
