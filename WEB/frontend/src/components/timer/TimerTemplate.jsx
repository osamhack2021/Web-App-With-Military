import React from "react";
import { Container, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import NavBar from "../common/NavBar";

const TimerTemplate = ({children}) => {

  return (
    <>
      <Container component="main" maxWidth="xs"
        style={{padding: 0}}
        sx={{
          backgroundColor: '#000F04',
          height: '100vh'
      }}>
        <NavBar bgColor={"primary"}>
          <IconButton size="large" color="inherit" sx={{ p: '0.3rem' }}>
            <MenuBookIcon />
          </IconButton>
          <IconButton size="large" color="inherit" sx={{ p: '0.3rem' }}>
            <SearchIcon />
          </IconButton>
          <IconButton size="large" color="inherit" sx={{ p: '0.3rem' }}>
            <MenuIcon />
          </IconButton>
        </NavBar>
          
        {/* ↓ 다이얼, 버튼 */}
        {children}
      </Container>
    </>
  );
};

export default TimerTemplate;