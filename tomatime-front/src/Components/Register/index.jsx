import React, { useState } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import BackGround from "../BackGround";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const messageRegister = () => {
    alert("Non tutti i campi sono stati compilati");
  };

  const handleNameChangeRegister = (e) => {
    setName(e.target.value);
    checkButtonStatusRegister(e.target.value, email, password, passwordConfirm);
  };

  const handleEmailChangeRegister = (e) => {
    setEmail(e.target.value);
    checkButtonStatusRegister(name, e.target.value, password, passwordConfirm);
  };

  const handlePasswordChangeRegister = (e) => {
    setPassword(e.target.value);
    checkButtonStatusRegister(name, email, e.target.value, passwordConfirm);
  };

  const handlePasswordConfirmChangeRegister = (e) => {
    setPasswordConfirm(e.target.value);
    checkButtonStatusRegister(name, email, password, e.target.value);
  };

  const register = async () => {
    const response = await axios.post("http://localhost:3000/user/register",
      {
        username: name,
        email, 
        password
      }
    );
    alert("Registrato con successo");
  } 

  const checkButtonStatusRegister = (
    name,
    email,
    password,
    passwordConfirm
  ) => {
    if (
      name.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      passwordConfirm.length > 0     
    ) {
      setIsButtonEnabled(true);

    } else {
      setIsButtonEnabled(false);
    }
  };

  return (
    <>
      <BackGround />
      <div className="popup_register">
        <span className="register">SIGN IN</span>

        <div>
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => handleNameChangeRegister(e)}
            autoComplete="off"
            className="form-name-register"
          ></input>
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => handleEmailChangeRegister(e)}
            autoComplete="off"
            className="form-email-register"
          ></input>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => handlePasswordChangeRegister(e)}
            autoComplete="off"
            className="form-password-register"
          ></input>
          <input
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => handlePasswordConfirmChangeRegister(e)}
            autoComplete="off"
            className="form-passwordConfirm-register"
          ></input>
          {/* <div className="check-container">
            <input className="checkmark" type="checkbox" />
            <span className="text-check">
              Send me newsletters,tricks and updates.
            </span>
          </div> */}
        </div>

        {isButtonEnabled ? (
          <button className="register_btn enabled" onClick={() => {
            if(password == passwordConfirm) register();
            else alert("La password deve corrispondere al campo di conferma della password");
          }}>
            <Link to="/login">
              <span className="text_btn_register">SIGN IN</span>
            </Link>
          </button>
        ) : (
          <button className="fake_btn_register" onClick={messageRegister}>
            <span className="text_btn_register">SIGN IN</span>
          </button>
        )}

        <div className="container-link">
          <span className="link">
            Already have an account?&nbsp;
            <Link to="/login" className="login-link">
              Login now
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};
export default Register;
