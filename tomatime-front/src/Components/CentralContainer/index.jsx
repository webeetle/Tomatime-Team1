import React, { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";

async function moveTask(id, userid, target) {
  const response = await axios.put(`http://localhost:3000/task/move/${id}`, {
    target,
    userid,
  });
  return;
}

async function getTime(id) {
  const response = await axios.get(`http://localhost:3000/lc/${id}`);
  const results = response.data;
  console.log(results);
  return results[0].duration;
}

function CentralContainer(props) {
  const { taskInProgress } = props;

  const [step, setStep] = useState(1);
  const [startMinutes, setstartMinutes] = useState(0);
  const [nextInLineMinutes, setnextInLineMinutes] = useState(0);

  useEffect(async () => {
    setstartMinutes(await getTime(step));
    setnextInLineMinutes(await getTime(step + 1));
  }, [step]);

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

  function changePlay() {
    const arrow = document.querySelector("#clickPlay");
    const broke = document.querySelector("#clickBroken");
    const tomato = document.querySelector("#tomato");
    arrow.style.display = "none";
    broke.style.display = "block";
    // tomato.style.display = "block";
    tomato.classList.remove("tomatoDisappear");
    tomato.classList.add("tomatoAppear");
  }

  function changeBroken() {
    const modal = document.querySelector("#clickModal");
    modal.style.display = "block";
  }

  function returnTomato() {
    const modal = document.querySelector("#clickModal");
    modal.style.display = "none";
  }

  function brokeTomato() {
    const modal = document.querySelector("#clickModal");
    const arrow = document.querySelector("#clickPlay");
    const broke = document.querySelector("#clickBroken");
    const tomato = document.querySelector("#tomato");
    modal.style.display = "none";
    broke.style.display = "none";
    arrow.style.display = "block";
    tomato.classList.remove("tomatoAppear");
    tomato.classList.add("tomatoDisappear");
  }

  return (
    <div className="central-container">
      <span className="title-center">TIME TO FOCUS</span>
      <span className="timer">
        {minutesToDisplay}:{secondsToDisplay}
      </span>
      <span className="subtitle-center">
        NEXT: SHORT BREAK (+{nextInLineMinutes} MIN)
      </span>

      {/* Start button */}
      <button className="play" id="clickPlay" onClick={changePlay}>
        <div className="circle">
          <div className="variable_arrow"></div>
        </div>
      </button>

      {/* Broke button */}
      <button className="broke" id="clickBroken" onClick={changeBroken}>
        <div className="circle">
          <div className="variable_broke"></div>
        </div>
      </button>

      {/*BrokenModal*/}
      <div className="brokenModal" id="clickModal">
        <div className="brokenPopup">
          <span className="title-broken">Stop tomato</span>
          <span className="subtitle-broken">
            Do you want to restart another tomato?
          </span>
          <div className="button-container-broken">
            <button className="button-return-broken" onClick={returnTomato}>
              Return
            </button>
            <button className="button-canc-broken" onClick={brokeTomato}>
              Stop it!
            </button>
          </div>
        </div>
      </div>

      {/* TomatoAppear */}
      <div className="tomato" id="tomato"></div>

      <span className="uptitle-working">WORKING AT</span>
      <div className="working-rectangle">
        {taskInProgress.map((row) => (
          <p className="task-in-progress">{row.title}</p>
        ))}
      </div>
      <div className="final-center">
        <button
          className="left-final"
          onClick={async () => {
            await moveTask(
              taskInProgress[0].id,
              taskInProgress[0].userid,
              "TODO"
            );
            return window.location.reload();
          }}
        >
          <span>
            <div className="left-central-container">
              <div className="arrow-left-central">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                  />
                </svg>
              </div>
              <div className="arrow-left-text-central">To do</div>
            </div>
          </span>
        </button>

        <button
          className="right-final"
          onClick={async () => {
            await moveTask(
              taskInProgress[0].id,
              taskInProgress[0].userid,
              "DONE"
            );
            return window.location.reload();
          }}
        >
          <span>
            <div className="right-central-container">
              <div className="arrow-right-text-central">Done</div>
              <div className="arrow-right-central">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </div>
            </div>
          </span>
        </button>
      </div>
    </div>
  );
}

export default CentralContainer;
