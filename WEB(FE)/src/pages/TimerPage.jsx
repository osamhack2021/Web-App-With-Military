import React from 'react';
import { withRouter } from 'react-router-dom';
import TimerTemplate from '../components/timer/TimerTemplate';
import Clock from '../components/timer/Clock';

const TimerPage = () => (
  <>
    <TimerTemplate>
      <Clock />
    </TimerTemplate>
  </>
);
export default withRouter(TimerPage);
