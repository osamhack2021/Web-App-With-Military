import React, {useState, useCallback} from 'react';
import LandingTemplate from '../components/landing/LandingTemplate';

import { useDispatch } from 'react-redux';
import { withRouter  } from 'react-router-dom';


const LandingPage = ({history}) => {
  return(
  <LandingTemplate>
  </LandingTemplate>
)
};

export default withRouter(LandingPage);