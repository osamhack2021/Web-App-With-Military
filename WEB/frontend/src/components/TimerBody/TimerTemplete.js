import React from "react";
import { Container } from "@material-ui/core";
import { styled } from '@material-ui/core/styles';
import Clock from "./Clock";


const TimerTemplete = () => {
  const StyledContainer = styled(Container)({
    backgroundColor: '#000F04',
    width: '100vw',
    height: '100vh',
    maxWidth: 'none'
  });
  return (
    <StyledContainer>
      <Clock />
    </StyledContainer>
  );
};

export default TimerTemplete;