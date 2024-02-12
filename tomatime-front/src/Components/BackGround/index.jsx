import React, { useState } from "react";
import "./index.css";
import Login from "../Login";
import Register from "../Register";

function BackGround() {
  const [step, setStep] = useState(1);

  return (
    <>
      <div className="background"></div>
      <div className="tomatime"></div>
      <div className="break"></div>
      {/* {step == 0 && <Register changeStep={() => setStep(1)} />}
      {step == 1 && <Login changeStep={() => setStep(0)} />} */}
    </>
  );
}

export default BackGround;
