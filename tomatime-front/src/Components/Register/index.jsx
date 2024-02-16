import React from "react";
import "./index.css";
import { Link } from "react-router-dom";
import BackGround from "../BackGround";

function Register({ changeStep }) {
  return (
    <>
      <BackGround />
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
          <Link to="/login" class="text_btn">SIGN IN</Link>
        </button>

        <div class="container-link">
          <span className="link">
            Already have an account?&nbsp;
            <Link to="/login" className="switch-link">
              Login now
            </Link>
          </span>
        </div>
      </div>
    </>
  );
}

export default Register;
