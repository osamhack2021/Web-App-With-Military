/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import { USER_SERVER } from "../../../Config";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { styled } from "@mui/system";
//import { createPopper } from '@popperjs/core';
import TimerOverlay from "./TimerOverlay.js";
import {
  Box,
  Button,
  Divider,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
  IconButton,
  Stack,
  Tabs,
  Tab,
} from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
//import './popper.css';

function RightMenu(props) {
  const loginUserData = useSelector((state) => state.auth.loginUserData);
  const logoutHandler = () => {
    Axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert("Log Out Failed");
      }
    });
  };

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  //timeoverlay
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) =>
    setAnchorEl(anchorEl ? null : event.currentTarget);

  const openOverlay = Boolean(anchorEl);
  const id = openOverlay ? "timer-popper" : undefined;
  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(openOverlay);
  //timeoverlay

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  if (loginUserData) {
    if (!loginUserData.isAuth) {
      return (
        <Stack direction="row" spacing={2}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            textColor="inherit"
            indicatorColor="primary"
          >
            <Tab
              label="Home"
              component={Link}
              to={"/main"}
              sx={{ textTransform: "none" }}
            />
            <Tab label="Ranking" component={Link} to={`/ranking/user`} />
          </Tabs>
        </Stack>
      );
    } else {
      //console.log(loginUserData);
      return (
        <Stack direction="row" spacing={2}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="navigation tabs"
            textColor="inherit"
            indicatorColor="primary"
          >
            <Tab label="Home" component={Link} to={"/main"} />
            <Tab
              label="Studygroup"
              component={Link}
              to={`/users/${loginUserData._id}/mygroups`}
            />
            <Tab label="Ranking" component={Link} to={`/ranking/user`} />
            <Tab
              label="My Profile"
              component={Link}
              to={`/users/${loginUserData._id}`}
            />
          </Tabs>
          <IconButton
            color="inherit"
            aria-describedby={id}
            onClick={handleClick}
          >
            <TimerOutlinedIcon />
          </IconButton>
          <Popper
            id={id}
            open={openOverlay}
            anchorEl={anchorEl}
            disablePortal
            placement="bottom-start"
          >
            <TimerOverlay />
          </Popper>
        </Stack>
      );
    }
  } else {
    return <></>;
  }
}

export default withRouter(RightMenu);
