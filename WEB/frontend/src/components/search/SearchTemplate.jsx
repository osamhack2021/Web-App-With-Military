import React from "react";
import { Container, IconButton } from "@mui/material";
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import NavBar from "../common/NavBar";

const SearchTemplate = ({children}) => {

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
            <MenuIcon />
          </IconButton>
        </NavBar>
        
        {/* ↓ 검색어 입력 부분 */}
        {children}
      </Container>
    </>
  );
};

export default SearchTemplate;