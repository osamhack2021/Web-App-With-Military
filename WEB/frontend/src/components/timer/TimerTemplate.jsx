import React from "react";
import { Container } from "@material-ui/core";
import { styled } from '@material-ui/core/styles';

import NavBar from "../common/navigation/NavBar";

const TimerTemplate = ({children}) => {
  const StyledContainer = styled(Container)({
    backgroundColor: '#000F04',
    width: '100vw',
    height: '100vh',
    maxWidth: 'none'
  });
  return (
    <>
      <NavBar />
      <StyledContainer>
        {children}
      </StyledContainer>
    </>
  );
};

export default TimerTemplate;