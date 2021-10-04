import React from "react";
import { Box, Container } from "@mui/material";
import { styled } from '@mui/material/styles';
import NavBar from "../common/NavBar";
const UploadTemplate = ({children}) => {
  return (
    <>
      <Container component="main" maxWidth="xs"
        style={{
          padding: 0,
          backgroundColor: '#000F04',
          height: '100vh'
      }}>
        <NavBar bgColor={"primary"} />
        {children}

      </Container>
    </>
  );
};

export default UploadTemplate;