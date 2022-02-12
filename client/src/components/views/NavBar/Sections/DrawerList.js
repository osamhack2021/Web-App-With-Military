import Axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom"
import { USER_SERVER } from "../../../Config";

import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import InboxIcon from "@mui/icons-material/MoveToInbox";


export default function DrawrList( {handleDrawerClose} ) {
  let history = useHistory();
  const loginUserData = useSelector((state) => state.auth.loginUserData);
  
  const logoutHandler = () => {
    Axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        history.push("/login");
        handleDrawerClose();
      } else {
        alert("Log Out Failed");
      }
    });
  };
  return (
    loginUserData === undefined || !loginUserData.isAuth 
    ? <List>
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
    : <List>
        <ListItem button onClick={logoutHandler}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary={"로그아웃"} />
        </ListItem>
      </List>
  );
}