import React from "react";
import { styled } from '@mui/material/styles'
import { Box, Container } from '@mui/material';
import NavBar from '../common/NavBar';

const MainTemplate = ({children}) => {

  return (
    <>
      <Container component="main" maxWidth="xs" sx={{
        backgroundColor: '#000F04'
      }}>
        <NavBar bgColor={"primary"}/>
        {children}
      </Container>
      
    </>
  );
};

export default MainTemplate;