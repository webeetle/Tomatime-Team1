import { useState } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import BackGround from "./Components/BackGround";
import Modal from "./Components/Modal";
import Home from "./Components/Home";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        {/* <BackGround /> */}
        {/* <Modal /> */}
        <Home />
      </BrowserRouter>
    </>
  );
}

export default App;
