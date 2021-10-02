import React from "react";

import TimerTemplate from "../components/timer/TimerTemplate";
import Clock from "../components/timer/Clock";

const TimerPage = () => {
  return (
    <>
      <TimerTemplate>
        <Clock />
      </TimerTemplate>
    </>
  );
}
export default TimerPage;
