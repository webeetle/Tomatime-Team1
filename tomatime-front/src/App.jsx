import { useState } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import BackGround from "./Components/BackGround";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <BackGround />
      </BrowserRouter>
    </>
  );
}

export default App;
