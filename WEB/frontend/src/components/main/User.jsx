import React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';


const User = ({userName}) => {
  return (
    <Box sx={{
      color: '#e6e1e0',
      display: 'flex',
      pt: '0.75rem',
    }}>
      <Avatar sx={{
        width: '3.5rem',
        height: '3.5rem'
      }}
        //src={}
      />
      <Box sx={{
        m: 'auto 0 auto 0.75rem',
      }}>
        <Typography>
          @{userName} {/* ←- 유저 닉네임 */}
        </Typography>
        <Box sx={{
          display:'flex',

        }}>
          {/* ↓ 티어박스 */}
          <Box style={{
            background: 'linear-gradient(180deg, rgba(255, 215, 0, 0.8) 0%, rgba(253, 255, 135, 0.8) 100%)',
            transform: 'rotate(-45deg)',
            width: '6px',
            height: '6px',
            margin: 'auto 0.2rem auto 0.2rem',
          }} />
          <Typography style={{color: '#a3971c'}}>
            Gold
          </Typography>
        </Box>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Avatar sx={{
        width: '3rem',
        height: '3rem',
        borderRadius: '13px',
        margin: 'auto 0'
        }}
        //src={}
      />
    </Box>
  );
};

export default User;