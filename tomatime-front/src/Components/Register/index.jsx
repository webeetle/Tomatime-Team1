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
          <div className="check-container">
            <input className="checkmark" type="checkbox" />
            <span className="text-check">
              Send me newsletters,tricks and updates.
            </span>
          </div>
        </div>
        <button className="btn">
          <Link to="/login" className="text_btn">
            SIGN IN
          </Link>
        </button>

        <div className="container-link">
          <span className="link">
            Already have an account?&nbsp;
            <Link to="/login">Login now</Link>
          </span>
        </div>
      </div>
    </>
  );
}

export default Register;
