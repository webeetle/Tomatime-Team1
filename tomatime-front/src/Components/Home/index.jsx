import React from "react";
import "./index.css";
import Counter from "../Counter";

const startSeconds = 60;
const startMinutes = 25;
const startTimer = startMinutes * startSeconds * 1000;

function Home(props) {
  const minutesToDisplay = startTimer / 1000 / startSeconds;
  let secondsToDisplay = (startTimer / 1000 / startMinutes) % 60;
  if (secondsToDisplay < 10) secondsToDisplay = "0" + secondsToDisplay;

  return (
    <>
      <div className="home-container">
        <div className="navbar">
          <div class="tomatime-img"></div>
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
          <div class="img-icon"></div>
        </div>
        <div className="main-container">
          <div className="container-div">
            <div className="left-container">
              <span className="title-left">TO DO</span>
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
              <div className="working-rectangle"></div>
              <div class="final-center">
                <button class="left-final">
                  <span>←To do</span>
                </button>
                <button class="right-final">
                  <span>Done→</span>
                </button>
              </div>
            </div>
            <div className="right-container">
              <span className="title-right">DONE</span>
            </div>
          </div>

          {/* <table>
            <td className="left-column">
              <span className="title-left">TO DO</span>
            </td>
            <td className="central-column">
              <span className="title-center">TIME TO FOCUS</span>
              <div className="timer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="296"
                  height="121"
                  viewBox="0 0 296 121"
                >
                  <text
                    id="_25:00"
                    data-name="25:00"
                    transform="translate(148 93)"
                    fill="#d9391e"
                    font-size="96"
                    font-family="Sora"
                    font-weight="700"
                  >
                    <tspan x="-147" y="0">
                      25:00
                    </tspan>
                  </text>
                </svg>
                <span className="subtitle-center">
                  NEXT: SHORT BREAK(+5MIN)
                </span>
                <div class="start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="98"
                    height="98"
                    viewBox="0 0 98 98"
                  >
                    <defs>
                      <filter
                        id="Icon_material-pause-circle-filled"
                        x="0"
                        y="0"
                        width="98"
                        height="98"
                        filterUnits="userSpaceOnUse"
                      >
                        <feOffset dy="3" input="SourceAlpha" />
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feFlood flood-opacity="0.161" />
                        <feComposite operator="in" in2="blur" />
                        <feComposite in="SourceGraphic" />
                      </filter>
                      <filter
                        id="Icon_material-settings-backup-restore"
                        x="4"
                        y="9"
                        width="90"
                        height="79.714"
                        filterUnits="userSpaceOnUse"
                      >
                        <feOffset dy="3" input="SourceAlpha" />
                        <feGaussianBlur stdDeviation="3" result="blur-2" />
                        <feFlood flood-opacity="0.161" />
                        <feComposite operator="in" in2="blur-2" />
                        <feComposite in="SourceGraphic" />
                      </filter>
                      <filter
                        id="Icon_awesome-stop-circle"
                        x="0"
                        y="0"
                        width="98"
                        height="98"
                        filterUnits="userSpaceOnUse"
                      >
                        <feOffset dy="3" input="SourceAlpha" />
                        <feGaussianBlur stdDeviation="3" result="blur-3" />
                        <feFlood flood-opacity="0.161" />
                        <feComposite operator="in" in2="blur-3" />
                        <feComposite in="SourceGraphic" />
                      </filter>
                      <filter
                        id="Icon_ionic-ios-play-circle"
                        x="3"
                        y="4"
                        width="92"
                        height="92"
                        filterUnits="userSpaceOnUse"
                      >
                        <feOffset dy="4" input="SourceAlpha" />
                        <feGaussianBlur stdDeviation="2" result="blur-4" />
                        <feFlood flood-opacity="0.251" />
                        <feComposite operator="in" in2="blur-4" />
                        <feComposite in="SourceGraphic" />
                      </filter>
                      <filter
                        id="Icon_ionic-ios-play-circle-2"
                        x="31.442"
                        y="27.165"
                        width="40.091"
                        height="45.67"
                        filterUnits="userSpaceOnUse"
                      >
                        <feOffset dy="4" input="SourceAlpha" />
                        <feGaussianBlur stdDeviation="2" result="blur-5" />
                        <feFlood flood-opacity="0.251" />
                        <feComposite operator="in" in2="blur-5" />
                        <feComposite in="SourceGraphic" />
                      </filter>
                    </defs>
                    <g
                      id="Componente_1_58"
                      data-name="Componente 1 – 58"
                      transform="translate(9 6)"
                    >
                      <g
                        transform="matrix(1, 0, 0, 1, -9, -6)"
                        filter="url(#Icon_material-pause-circle-filled)"
                      >
                        <path
                          id="Icon_material-pause-circle-filled-2"
                          data-name="Icon material-pause-circle-filled"
                          d="M43,3A40,40,0,1,0,83,43,40.015,40.015,0,0,0,43,3ZM39,59H31V27h8Zm16,0H47V27h8Z"
                          transform="translate(6 3)"
                          fill="#d9391e"
                          opacity="0"
                        />
                      </g>
                      <g
                        transform="matrix(1, 0, 0, 1, -9, -6)"
                        filter="url(#Icon_material-settings-backup-restore)"
                      >
                        <path
                          id="Icon_material-settings-backup-restore-2"
                          data-name="Icon material-settings-backup-restore"
                          d="M48,35.357a6.857,6.857,0,1,0-6.857,6.857A6.877,6.877,0,0,0,48,35.357ZM41.143,4.5A30.86,30.86,0,0,0,10.286,35.357H0L13.714,49.071,27.429,35.357H17.143A24.016,24.016,0,1,1,27.223,54.9l-4.869,4.937A30.858,30.858,0,1,0,41.143,4.5Z"
                          transform="translate(13 10.5)"
                          fill="#d9391e"
                          opacity="0"
                        />
                      </g>
                      <g
                        transform="matrix(1, 0, 0, 1, -9, -6)"
                        filter="url(#Icon_awesome-stop-circle)"
                      >
                        <path
                          id="Icon_awesome-stop-circle-2"
                          data-name="Icon awesome-stop-circle"
                          d="M40.563.563a40,40,0,1,0,40,40A39.993,39.993,0,0,0,40.563.563Zm15.484,52.9a2.588,2.588,0,0,1-2.581,2.581H27.659a2.588,2.588,0,0,1-2.581-2.581V27.659a2.588,2.588,0,0,1,2.581-2.581H53.466a2.588,2.588,0,0,1,2.581,2.581Z"
                          transform="translate(8.44 5.44)"
                          fill="#d9391e"
                          opacity="0"
                        />
                      </g>
                      <g
                        transform="matrix(1, 0, 0, 1, -9, -6)"
                        filter="url(#Icon_ionic-ios-play-circle)"
                      >
                        <path
                          id="Icon_ionic-ios-play-circle-3"
                          data-name="Icon ionic-ios-play-circle"
                          d="M43.375,3.375a40,40,0,1,0,40,40A39.994,39.994,0,0,0,43.375,3.375ZM59.49,44.125,33.106,60.087a.856.856,0,0,1-1.288-.75V27.413a.852.852,0,0,1,1.288-.75L59.49,42.625A.882.882,0,0,1,59.49,44.125Z"
                          transform="translate(5.63 2.63)"
                          fill="#d9391e"
                        />
                      </g>
                      <g
                        transform="matrix(1, 0, 0, 1, -9, -6)"
                        filter="url(#Icon_ionic-ios-play-circle-2)"
                      >
                        <path
                          id="Icon_ionic-ios-play-circle-4"
                          data-name="Icon ionic-ios-play-circle"
                          d="M59.49,44.125,33.106,60.087a.856.856,0,0,1-1.288-.75V27.413a.852.852,0,0,1,1.288-.75L59.49,42.625A.882.882,0,0,1,59.49,44.125Z"
                          transform="translate(5.63 2.63)"
                          fill="#fff"
                        />
                      </g>
                    </g>
                  </svg>
                </div>
                <span className="subtitle-center">WORKING AT</span>
                <div class="working-center"></div>
                <div class="final-center">
                  <button class="left-final">
                    <span>←To do</span>
                  </button>
                  <button class="right-final">
                    <span>Done→</span>
                  </button>
                </div>
              </div>
            </td>
            <td className="right-column">
              <span className="title-right">DONE</span>
            </td>
          </table> */}
        </div>
      </div>
    </>
  );
}

export default Home;
