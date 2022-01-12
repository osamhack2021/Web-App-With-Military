import React, { useState, forwardRef } from 'react';
import Axios from "axios";
import { useSelector } from "react-redux";
import { USER_SERVER } from "../../Config";
import RightMenu from './Sections/RightMenu';
import './Sections/Navbar.css';
import {
  AppBar, Box, Toolbar, Drawer, Divider, IconButton, List, ListItem,
  ListItemIcon, ListItemText, Typography
} from '@mui/material';
import { withRouter, Link } from 'react-router-dom';

import { ReactComponent as WhiteLogo } from '../../../static/icons/logo_white.svg';
import { styled, useTheme } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 240;

function NavBar(props) {
  const user = useSelector((state) => state.user);

  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  }));

  const logoutHandler = () => {
    Axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        console.log(user);
        props.history.push("/login");
        setOpen(false);
      } else {
        alert("Log Out Failed");
      }
    });
  };

  const list =
  <>
    { user.userData && !user.userData.isAuth ? 
      <List>
        <ListItem
          button
          component="a"
          href="/login"
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={"Signin"} />
        </ListItem>
        <ListItem
          button
          component="a"
          href="/register"
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={"Signup"} />
        </ListItem>
      </List> :
      <List>
      <ListItem
        button
        onClick={logoutHandler}
      >
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary={"Logout"} />
      </ListItem>
    </List> }
  </>
    
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        color="secondary"
        sx={{
          borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
          color: '#e6e1e0',
          position: 'static',
        }}
      >
        <Toolbar sx={{ my: 'auto' }}>
          <Link to="/">
            <WhiteLogo
              width="2rem"
              height="2rem"
              style={{ color: '#e6e1e0' }} />
          </Link>
          <Box
            sx={{
              mt: '4px',
              ml: '12px',
            }}
          >
            <Link to="/">
              <Typography
                style={{
                  fontSize: '1.2rem',
                  // color: 'white'
                }}
              >
                {/* ↓ AppBar의 텍스트 */}
                위드밀리터리
              </Typography>
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <div className="menu_right">
            <RightMenu mode="horizontal" />
          </div>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {list}
      </Drawer>
    </Box>
  )
}

export default withRouter(NavBar);