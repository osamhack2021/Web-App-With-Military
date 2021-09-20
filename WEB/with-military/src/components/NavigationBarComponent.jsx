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

const NavigationBarComponent = () => {
  const StyledAppBar = styled(AppBar)({
    backgroundColor: '#000F04',
    color: '#e6e1e0',
    position: 'static',
    width: '100vw',
    borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
  });
  return (
    <StyledAppBar>
      <Toolbar>
        <Typography
          /*align="center"*/
          variant="h4"
          // color="primary"
        >
          위드밀리터리
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          {/* <Badge badgeContent={4} color="error">
            <ImportContactsIcon />
          </Badge> */}
          <ImportContactsIcon />
        </IconButton>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <SearchIcon />
        </IconButton>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />  
        </IconButton>
      </Toolbar>
    </StyledAppBar>
  );
}
export default NavigationBarComponent;