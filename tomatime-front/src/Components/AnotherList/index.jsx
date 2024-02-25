import React, { useState } from "react";
import "./index.css";
import WriteModal from "../WriteModal";
import AddModal from "../AddModal";

function AnotherList(props) {
  const { rerender } = props;

  return (
    <>
      <AddModal userid={1} rerender={rerender} />
    </>
  );
}

export default AnotherList;
