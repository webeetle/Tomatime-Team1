import React from "react";
import "./index.css";

function Home(props) {
  return (
    <>
      <div className="home-container">
        <div className="navbar">
          <div class="tomatime-img"></div>
          <div className="counters"></div>
          <div className="main-container">
            <div class="grid-container">
              <div class="grid-item">1</div>
              <div class="grid-item">2</div>
              <div class="grid-item">3</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
