import React from "react";
import Avatar from '@mui/material/Avatar';
import Box from '@material-ui/core/Box';
import { Typography } from "@material-ui/core";
import { styled } from '@material-ui/core/styles';

const UserComponent = () => {
  return (
    <Box 
      sx={{
        color: '#e6e1e0',
        display: 'flex',
        p: 1,
      }}
    >
      <Avatar src=""/>
      <Box>
        <Typography
              /*align="center"*/
              // color="primary"
            >
          @xunno
        </Typography>
        <Box sx={{
          display:'flex'
        }}>
          <Box
            style={{
              background: 'linear-gradient(180deg, rgba(255, 215, 0, 0.8) 0%, rgba(253, 255, 135, 0.8) 100%)',
              transform: 'rotate(-45deg)',
              width: '6px',
              height: '6px',
              margin: 'auto'
            }}
            ></Box>
          <Typography
            style={{color: '#a3971c'}}>
            Gold
          </Typography>
        </Box>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Avatar src=""/>
    </Box>
  );
};

export default UserComponent;