import React from "react";
import "./index.css";

function Counter(props) {
  const { image, number, className } = props;

  return (
    <>
      <div className={`external-div ${className}`}>
        <div
          className="counter-icon"
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        <span>{number}</span>
      </div>
    </>
  );
}

export default Counter;
