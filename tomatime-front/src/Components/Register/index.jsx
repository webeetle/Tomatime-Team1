import React from "react";
import "./index.css";

function Register({ changeStep }) {
  return (
    <>
      <div className="popup_register">
        <span className="register">SIGN IN</span>

        <div>
          <input type="text" placeholder="Name" className="form"></input>
          <input type="text" placeholder="Email" className="form"></input>
          <input
            type="password"
            placeholder="Password"
            className="form"
          ></input>
          <input
            type="password"
            placeholder="Confirm Password"
            className="form"
          ></input>
          <div class="check-container">
            <input class="checkmark" type="checkbox" />
            <span class="text-check">
              Send me newsletters,tricks and updates.
            </span>
          </div>
        </div>
        <button class="btn">
          <span class="text_btn">SIGN IN</span>
        </button>

        <div class="container-link">
          <span className="link">
            Already have an account?
            <a href="#" className="switch-link" onClick={() => changeStep()}>
              Login now
            </a>
          </span>
        </div>
      </div>
    </>
  );
}

export default Register;
