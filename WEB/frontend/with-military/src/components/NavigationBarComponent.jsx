import React from "react";
import { Typography } from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Badge from '@mui/material/Badge';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from "@material-ui/icons/Search";
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import { styled } from '@material-ui/core/styles';
import { ReactComponent as WhiteLogo } from '../static/svgs/logo-white.svg';

const NavigationBarComponent = () => {
  const StyledAppBar = styled(AppBar)({
    backgroundColor: '#000F04',
    color: '#e6e1e0',
    position: 'static',
    borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
    width: '100vw',
    height: '3rem',

  });
  return (
    <StyledAppBar>
      <Toolbar sx={{
        margin: 'auto 0',
      }}>
        <WhiteLogo width='2rem' height='2rem' />
        <Box sx={{
          mt: "0.2rem",
          ml:"0.7rem"
        }}>
          <Typography
            component={Box}
            style={{
              fontSize: "1.2rem"
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
          <ImportContactsIcon />
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
export default NavigationBarComponent;