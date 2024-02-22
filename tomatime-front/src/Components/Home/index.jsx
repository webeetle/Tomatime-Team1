import React, { useEffect, useState, useRef } from "react";
import "./index.css";
import Counter from "../Counter";
import axios from "axios";
import LeftContainer from "../LeftContainer";
import CentralContainer from "../CentralContainer";
import RightContainer from "../RightContainer";

function Home(props) {
  const [task, setTask] = useState({});
  useEffect(() => {
    fetchTask();
  }, []);

  const fetchTask = async () => {
    const response = await axios.get("http://localhost:3000/task/1");
    const results = response.data;
    setTask(results);
    console.log(results);
  };

  if (task.todo) {
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
              <LeftContainer taskList={task.todo[0]} />
              <CentralContainer taskInProgress={task.inProgress[0]} />
              <RightContainer taskList={task.done[0]} />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
