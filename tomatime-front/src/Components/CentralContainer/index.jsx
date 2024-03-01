import React, { useEffect, useState } from "react";
import "./index.css";
import sound from "/src/sounds/done_task.wav";
import axios from "axios";

function CentralContainer(props) {
  const { taskInProgress } = props;
  const { clock, toggleClock } = props;

  const [step, setStep] = useState(1);
  const [startMinutes, setStartMinutes] = useState(0);
  const [startSeconds, setStartSeconds] = useState(0);
  const [nextInLineMinutes, setnextInLineMinutes] = useState(0);
  const [timer, setTimer] = useState({});

  const createTimer = async (user_id) => {
    const response = await axios.get(`http://localhost:3000/lc/${step}`);
    const lifecycle = response.data[0];
    const { duration, description } = lifecycle;
    await axios.post(`http://localhost:3000/timer/${user_id}`, {
      step,
      duration,
      description,
    });
  };

  async function moveTask(id, userid, target) {
    await axios.put(`http://localhost:3000/task/move/${id}`, {
      target,
      userid,
    });
  }

  const getTime = async (id) => {
    const response = await axios.get(`http://localhost:3000/lc/${id}`);
    const results = response.data;
    return results[0].duration;
  };

  const getTimerTime = async (user_id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/timer/time/${user_id}`
      );
      setStartMinutes(response.data.minutes);
      setStartSeconds(response.data.seconds);
      return;
    } catch (err) {
      console.error(err.response.data.msg);
      if (err.response.data.msg == "Il pomodoro è completato")
        return setStep(step + 1);
      return setStep(1);
    }
  };

  const getTimer = async (user_id) => {
    const response = await axios.get(`http://localhost:3000/timer/${user_id}`);
    const results = response.data;
    setTimer(results[0]);
  };

  const onMountDo = async () => {

    if (timer.state == "RUNNING") {
      getTimerTime(taskInProgress[0].user_id);
      const nextStepMinutes = getTime(step + 1);

      changePlay();
      toggleClock(true);
      setnextInLineMinutes(nextStepMinutes);
    }

    if (timer.state != "RUNNING") {
      const currentStepMinutes = await getTime(step);
      const nextStepMinutes = await getTime(step + 1);

      setStartMinutes(currentStepMinutes);
      setStartSeconds(0);
      setnextInLineMinutes(nextStepMinutes);
    } else {
      if (timer == undefined) return;
      if (timer == {}) await getTimer(taskInProgress[0].user_id);
    }
  };

  const stopTimer = async () => {
    await axios.put(`http://localhost:3000/timer/${taskInProgress[0].user_id}`);
    setStep(1);
  };

  const completeTomato = async () => {
    await axios.put(`http://localhost:3000/timer/complete/${taskInProgress[0].user_id}`);
    if (step == 6) setStep(1);
  };

  const resetTimer = async () => {
    const minutes = await getTime(1);
    setStartMinutes(minutes);
    setStartSeconds(0);
  };

  useEffect(() => {
    let interval = null;
    if (clock && (startSeconds || startMinutes)) {
      interval = setInterval(() => {
        if (startSeconds != 0) setStartSeconds(startSeconds - 1);
        else {
          setStartMinutes(startMinutes - 1);
          setStartSeconds(59);
        }
      }, 1000);
    } else if (clock && !startSeconds && !startMinutes) completeTomato();
    else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [clock, startSeconds, startMinutes]);

  useEffect(() => {
    if (step == 7) setStep(1);
    onMountDo();
  }, [step, timer]);

  function changePlay() {
    const arrow = document.querySelector("#clickPlay");
    const broke = document.querySelector("#clickBroken");
    const tomato = document.querySelector("#tomato");
    arrow.style.display = "none";
    broke.style.display = "block";
    tomato.classList.remove("tomatoDisappear");
    tomato.classList.add("tomatoAppear");
  }

  function changeBroken() {
    const modal = document.querySelector("#clickModal");
    modal.style.display = "block";

    const navbar = document.querySelector(".navbar");
    navbar.style.zIndex = 0;
  }

  function returnTomato() {
    const modal = document.querySelector("#clickModal");
    modal.style.display = "none";

    const navbar = document.querySelector(".navbar");
    navbar.style.zIndex = 2;
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
    const navbar = document.querySelector(".navbar");
    navbar.style.zIndex = 2;
    setTimeout(() => window.location.reload());
  }

  function playSound() {
    new Audio(sound).play();
  }

  return (
    <div className="central-container">
      <span className="title-center">TIME TO FOCUS</span>
      <span className="timer">
        {startMinutes}:{startSeconds < 10 ? `0${startSeconds}` : startSeconds}
      </span>
      <span className="subtitle-center">
        NEXT: SHORT BREAK (+{nextInLineMinutes} MIN)
      </span>

      {/* Start button */}
      <button
        className="play"
        id="clickPlay"
        onClick={async () => {
          if (taskInProgress.length > 0) {
            changePlay();
            if (timer == undefined) {
              await createTimer(taskInProgress[0].user_id);
              await getTimer(taskInProgress[0].user_id);
            }
            if (timer.state != undefined || timer.state != "RUNNING")
              await createTimer(taskInProgress[0].user_id);
            toggleClock(true);
          }
        }}
      >
        <div className="circle">
          <div className="variable_arrow"></div>
        </div>
      </button>

      {/* Broke button */}
      <button
        className="broke"
        id="clickBroken"
        onClick={async () => {
          changeBroken();
          toggleClock(false);
          await stopTimer();
          await resetTimer();
        }}
      >
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
            if (taskInProgress?.length > 0) {
              playSound();

              await moveTask(
                taskInProgress[0].id,
                taskInProgress[0].userid,
                "DONE"
              );

              setTimeout(() => window.location.reload(), 1000);
            }
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
