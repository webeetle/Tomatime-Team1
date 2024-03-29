import React, { useState } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import BackGround from "../BackGround";
import axios from "axios";


function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [canLogin, setCanLogin] = useState(false);

  const message = () => {
    alert("Non tutti i campi sono stati compilati");
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    checkButtonStatus(e.target.value, password);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    checkButtonStatus(name, e.target.value);
  };

  const checkButtonStatus = (name, password) => {
    if (name.length > 0 && password.length > 0) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  };

  const login = async () => {
    const response = await axios.post("http://localhost:3000/user/login", {username: name, password});
    const results = response.data;
    return results.canLogin ? setCanLogin(results.canLogin) : alert("Nome utente o password errati");
  }


  return (
    <>
      <BackGround />
      <div className="popup_login">
        <span className="login">LOGIN</span>

        <div>
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => handleNameChange(e)}
            autoComplete="off"
            className="form-name-login"
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => handlePasswordChange(e)}
            autoComplete="off"
            className="form-email-register"
          />
        </div>

        {isButtonEnabled ? (
          
            <button className="login_btn enabled" onClick={() => {
              login();
            }}>
              <Link to={ canLogin ? "/home" : ""}>
                <span className="text_btn_login">LOGIN</span>
              </Link>
            </button>
        ) : (
          <button className="fake_btn_login" onClick={message}>
            <span className="text_btn_login">LOGIN</span>
          </button>
        )}

        <div className="container-link">
          <span className="link">
            Not registed yet?&nbsp;
            <Link to={"/register"} className="register-link">
              Register now
            </Link>
          </span>
        </div>
      </div>
    </>
  );
}

export default Login;
