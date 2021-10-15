import React from 'react';
import { withRouter } from 'react-router-dom';
import LandingTemplate from '../components/landing/LandingTemplate';

const LandingPage = () => (
  <LandingTemplate />
);

export default withRouter(LandingPage);
