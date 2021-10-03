import React from "react";
import { AppBar, Box, Toolbar, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@mui/icons-material/Menu';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SearchIcon from "@material-ui/icons/Search";
import { styled } from '@material-ui/core/styles';
import { ReactComponent as WhiteLogo } from '../../../static/icons/logo_white.svg';
import { ThemeProvider } from '@mui/material/styles';
import theme from "../../../lib/styles/theme";


const NavBarMain = () => {
  return (
      <AppBar position="static" color="primary">
        <Toolbar sx={{
          margin: 'auto 0',
          minHeight: '3rem'
          //minHeight추가하니 모바일화면에서는 3rem이 적용됨
        }}>
          <WhiteLogo width='2rem' height='2rem' />
          <Box sx={{
            mt: '4px',
            ml: '12px'
          }}>
            <Typography
              style={{
                fontSize: '1.2rem',
                color: 'white'
              }}
            >
              위드밀리터리
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            size="large"
            color="inherit"
            sx={{ p: '0.3rem' }}
          >
            <MenuBookIcon />
          </IconButton>
          <IconButton
            size="large"
            color="inherit"
            sx={{ p: '0.3rem' }}
          >
            <SearchIcon />
          </IconButton>
          <IconButton
            size="large"
            color="inherit"
            sx={{ p: '0.3rem' }}
          >
            <MenuIcon />  
          </IconButton>
        </Toolbar>
      </AppBar>
      
  );
}
export default NavBarMain;