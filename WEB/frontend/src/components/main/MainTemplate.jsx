import React from "react";
import { Container } from "@material-ui/core";
import { styled } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import NavBar from '../common/navigation/NavBar';

const MainTemplate = ({children}) => {
  const StyledBox = styled(Box)({
    backgroundColor: '#000F04',
    //width: '100vw',
    height: '100vh',
    
  });
  return (
    <>
      <NavBar />
      <StyledBox>
        <Container component="main">
          {children}
        </Container>
      </StyledBox>
    </>
  );
};

export default MainTemplate;