import React from "react";
import "./index.css";
import { Link } from "react-router-dom";
import BackGround from "../BackGround";
function Login({ changeStep }) {
  return (
    <>
      <BackGround />
      <div className="popup_login">
        <span className="login">LOGIN</span>

        <div>
          <input type="text" placeholder="Name" className="form-name-login" />
          <input
            type="password"
            placeholder="Password"
            className="form-email-register"
          />
        </div>

        <button className="login_btn">
          <Link to="/home">
            <span className="text_btn">LOGIN</span>
          </Link>
        </button>

        <div className="container-link">
          <span className="link">
            Not registed yet?&nbsp;
            <Link to="/register" className="switch-link">
              Register now
            </Link>
          </span>
        </div>
      </div>
    </>
  );
}

export default Login;
