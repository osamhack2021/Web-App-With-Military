import React from 'react';
import {
  Avatar, Box, Typography, ListItemText,
} from '@mui/material';
import MyProfileAvatar from '../common/MyProfileAvatar';
import MyProfileList from '../common/MyProfileList';

const User = ({ userName }) => (
  <>
    <MyProfileList
      secondaryElement={
        <Avatar sx={{
          width: '3rem',
          height: '3rem',
          borderRadius: '13px',
          margin: 'auto 0',
        }}
        />
      }
      avatar={<MyProfileAvatar sx={{
        width: '3.5rem',
        height: '3.5rem',
      }}
      />}
      primaryListItemText={<ListItemText primary={`@${userName}`} sx={{ color: 'white' }} />}
      secondaryListItemText={<ListItemText secondary={
        <Box sx={{
          display: 'flex',

        }}
        >
          {/* ↓ 티어박스 */}
          <Box style={{
            background: 'linear-gradient(180deg, rgba(255, 215, 0, 0.8) 0%, rgba(253, 255, 135, 0.8) 100%)',
            transform: 'rotate(-45deg)',
            width: '6px',
            height: '6px',
            margin: 'auto 0.2rem auto 0.2rem',
          }}
          />
          <Typography style={{ color: '#a3971c' }}>
            Gold
          </Typography>
        </Box>

      }
      />}
    />
  </>
);

export default User;
