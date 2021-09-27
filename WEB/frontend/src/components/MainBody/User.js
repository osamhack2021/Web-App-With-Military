import React from "react";
import Avatar from '@mui/material/Avatar';
import Box from '@material-ui/core/Box';
import { Typography } from "@material-ui/core";
import { styled } from '@material-ui/core/styles';
import GoodGun from "../../static/images/goodgun.jpg"
import The8thDivision from "../../static/images/the_8th_division.jpg"

const User = () => {
  return (
    <Box 
      sx={{
        color: '#e6e1e0',
        display: 'flex',
        pt: '0.75rem',
      }}
    >
      <Avatar
          sx={{
            width: '3.5rem',
            height: '3.5rem'
          }}
          src={GoodGun}
        />
      <Box sx={{
        m: 'auto 0 auto 0.75rem',
      }}>
        <Typography
              /*align="center"*/
              // color="primary"
            >
          @goodgun
        </Typography>
        <Box sx={{
          display:'flex',

        }}>
          <Box
            style={{
              background: 'linear-gradient(180deg, rgba(255, 215, 0, 0.8) 0%, rgba(253, 255, 135, 0.8) 100%)',
              transform: 'rotate(-45deg)',
              width: '6px',
              height: '6px',
              margin: 'auto 0.2rem auto 0.2rem',
            }}
            ></Box>
          <Typography
            style={{color: '#a3971c'}}>
            Gold
          </Typography>
        </Box>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Avatar
        sx={{
          width: '3rem',
          height: '3rem',
          borderRadius: '13px',
          margin: 'auto 0'
        }}
        src={The8thDivision}
      />
    </Box>
  );
};

export default User;