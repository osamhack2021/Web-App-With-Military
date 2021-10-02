import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
// import Badge from '@mui/material/Badge';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SearchIcon from "@material-ui/icons/Search";
import { styled } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core";
import { ReactComponent as LogoWhite } from '../../../public/icons/logo_white.svg';

const NavBarMain = () => {
  const StyledAppBar = styled(AppBar)({
    backgroundColor: '#000F04',
    color: '#e6e1e0',
    position: 'static',
    borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
    
  });
  return (
    <StyledAppBar position="static">
      <Toolbar sx={{
        margin: 'auto 0',
        minHeight: '3rem'
        //minHeight추가하니 모바일화면에서는 3rem이 적용됨
      }}>
        <LogoWhite width='2rem' height='2rem' />
        <Box sx={{
          mt: '4px',
          ml: '12px'
        }}>
          <Typography
            component={Box}
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
    </StyledAppBar>
    
    
  );
}
export default NavBarMain;