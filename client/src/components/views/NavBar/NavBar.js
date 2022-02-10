import React, { useState, forwardRef } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
import { USER_SERVER } from "../../Config";
import {
  AppBar,
  Box,
  Toolbar,
  Drawer,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { withRouter, Link } from "react-router-dom";
import { ReactComponent as WhiteLogo } from "../../../static/imgs/logo_white.svg";
import { styled, useTheme } from "@mui/material/styles";
import RightMenu from "./Sections/RightMenu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";

const drawerWidth = 240;

function NavBar(props) {
  const loginUserData = useSelector((state) => state.auth.loginUserData);

  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  }));

  const logoutHandler = () => {
    Axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        props.history.push("/login");
        setOpen(false);
      } else {
        alert("Log Out Failed");
      }
    });
  };

  const list = (
    <>
      {loginUserData === undefined || !loginUserData.isAuth ? (
        <List>
          <ListItem button component="a" href="/login">
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText primary={"로그인"} />
          </ListItem>
          <ListItem button component="a" href="/register">
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"회원가입"} />
          </ListItem>
        </List>
      ) : (
        <List>
          <ListItem button onClick={logoutHandler}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={"로그아웃"} />
          </ListItem>
        </List>
      )}
    </>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        color="secondary"
        sx={{
          borderBottom: "1px solid rgba(255, 255, 255, 0.15)",
          color: "#e6e1e0",
          position: "static",
        }}
      >
        <Toolbar sx={{ my: "auto" }}>
          <Link to="/main">
            <WhiteLogo
              width="2rem"
              height="2rem"
              style={{ color: "#e6e1e0" }}
            />
          </Link>
          <Box
            sx={{
              mt: "4px",
              ml: "12px",
            }}
          >
            <Typography
              style={{
                fontSize: "1.2rem",
              }}
            >
              위드밀리터리
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />

          <RightMenu />

          <IconButton
            color="inherit"
            component={Link}
            to={"/search"}
            sx={{
              ml: 2,
            }}
          >
            <SearchIcon />
          </IconButton>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={{
              ml: 2,
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {list}
      </Drawer>
    </Box>
  );
}

export default withRouter(NavBar);
