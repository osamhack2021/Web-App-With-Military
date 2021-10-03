import React from "react";
import { AppBar, Box, Toolbar, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@mui/icons-material/Menu';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import { ReactComponent as WhiteLogo } from '../../static/icons/logo_white.svg';

const NavBar = ({bgColor}) => {
  const StyledAppBar = styled(AppBar)({
    color: '#e6e1e0',
    borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
    position: "static",
  });
  return (
    <StyledAppBar color={bgColor}>
      <Toolbar sx={{ my: 'auto' }}>
        <WhiteLogo width='2rem' height='2rem' />
        <Box sx={{
          mt: '4px',
          ml: '12px'
        }}>
          <Typography style={{
            fontSize: '1.2rem',
            color: 'white'
          }}>
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
    </StyledAppBar>
  );
}
export default NavBar;