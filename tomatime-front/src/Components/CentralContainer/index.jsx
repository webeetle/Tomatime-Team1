import React, { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";



function CentralContainer(props) {
  const { taskInProgress } = props;
  const {clock, toggleClock} = props;

  const [step, setStep] = useState(1);
  const [startMinutes, setStartMinutes] = useState(0);
  const [startSeconds, setStartSeconds] = useState(0);
  const [nextInLineMinutes, setnextInLineMinutes] = useState(0);
  const [timer, setTimer] = useState({});
   
  const createTimer = async (user_id) =>{
    const response = await axios.get(`http://localhost:3000/lc/${step}`);
    const lifecycle = response.data[0];
    const {duration, description} = lifecycle;
    await axios.post(`http://localhost:3000/timer/${user_id}`, {step, duration, description});
  }

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
    return results[0].duration;
  }

  async function getTimerTime(user_id){
    try{
      const response = await axios.get(`http://localhost:3000/timer/time/${user_id}`);
      setStartMinutes(response.data.minutes);
      setStartSeconds(response.data.seconds);
      return
    }catch(err){
      console.error(err.response.data.msg);
      if(err.response.data.msg == "Il pomodoro è completato") return setStep(step+1);
      return setStep(1);
    }
  }

  async function getTimer(user_id){
    const response = await axios.get(`http://localhost:3000/timer/${user_id}`);
    const results = response.data;
    setTimer(results[0]);
  }

  const onMountDo = async () => {
    if(timer == undefined) await getTimer(taskInProgress[0].user_id);
    if(timer.state == "RUNNING") {
      await getTimerTime(1);
      setnextInLineMinutes(await getTime(step + 1));
    }
    else {
      setStartMinutes(await getTime(step));
      setStartSeconds(0);
      setnextInLineMinutes(await getTime(step+1));
    }
    return
  }

  const stopTimer = async () => {
    await axios.put(`http://localhost:3000/timer/${timer.id}`);
    if (step != 1) setStep(1);
  }

  const completeTomato = async () => {
    await axios.put(`http://localhost:3000/timer/complete/${taskInProgress[0].user_id}`);
    if(step == 6) setStep(1);
    else setStep(step + 1);
  }

  useEffect(() => {
    let interval = null;

    if(clock && (startSeconds || startMinutes) ) { 
      interval = setInterval(() => {
        if(startSeconds != 0) setStartSeconds(startSeconds - 1);
        else{
          setStartMinutes(startMinutes - 1);
          setStartSeconds(59);
      }
    }, 1000)
    } 
    else {
      clearInterval(interval);
      completeTomato();
    }
    
    return () => {
      console.log("Prova");
      clearInterval(interval);
    }
  }, [clock, startSeconds, startMinutes])
  

  useEffect(() => {
    if(step == 7) setStep(1);
    onMountDo();
  }, [step, timer]);

  /* const startSeconds = 60;
   const startMinutes = async () => {
        return await getTime(step);
    } */
  // const startTimer = startMinutes * startSeconds * 1000;
  /* const nextInLineMinutes = async () => {
        return await getTime(step + 1);
    } */

  let minutesToDisplay = startMinutes //startTimer / 1000 / startSeconds;
  let secondsToDisplay =  startSeconds //(startTimer / 1000 / startMinutes) % 60;
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
        {startMinutes}:{startSeconds < 10 ? (`0${startSeconds}`) : startSeconds }
      </span>
      <span className="subtitle-center">
        NEXT: SHORT BREAK {nextInLineMinutes}min{" "}
      </span>

      {/* Start button */}
      <button className="play" id="clickPlay" onClick={async () => {
        changePlay();
        if(timer == undefined) {
          await createTimer(taskInProgress[0].user_id);
          await getTimer(taskInProgress[0].user_id);
        }
        if(timer.state != undefined || timer.state != 'RUNNING' ) await createTimer(taskInProgress[0].user_id); 
        toggleClock(true);
      }}>
        <div className="circle">
          <div className="variable_arrow"></div>
        </div>
      </button>

      {/* Broke button */}
      <button className="broke" id="clickBroken" onClick={async () => {
        changeBroken();
        toggleClock(false);
        await stopTimer();
      }}>
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
          <span>←To do</span>
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
          <span>Done→</span>
        </button>
      </div>
    </div>
  );
}

export default CentralContainer;
