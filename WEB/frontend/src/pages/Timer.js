import React from "react";
import NavBar from "../components/NavBar";
import BodyTemplete from "../components/BodyTemplete";
import Clock from "../components/Clock";

const Timer = () => {
  return (
    <>
      <NavBar />
      <BodyTemplete>
        <Clock />
      </BodyTemplete>
    </>
  );
}
export default Timer;
