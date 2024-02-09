import React from "react";
import "./index.css";

function Login({ changeStep }) {
  return (
    <>
      <div className="popup_login">
        <span className="login">LOGIN</span>

        <div>
          <input type="text" placeholder="Name" className="form"></input>

          <input
            type="password"
            placeholder="Password"
            className="form"
          ></input>
        </div>
        <button class="login_btn">
          <span class="text_btn">LOGIN</span>
        </button>

        <div class="container-link">
          <span className="link">
            Not registed yet?&nbsp;
            <a href="#" className="switch-link" onClick={() => changeStep()}>
              Register now
            </a>
          </span>
        </div>
      </div>
    </>
  );
}

export default Login;
