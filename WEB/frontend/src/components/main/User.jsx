import React from 'react';
import {
  Avatar, Box, List, Typography,
} from '@mui/material';
import MyAvatar from '../common/MyAvatar';
import MyListItem from '../common/MyListItem';

const imageUrl = 'https://images.unsplash.com/photo-1484800089236-7ae8f5dffc8e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80';
const User = ({ userName }) => (
  <List>
    <MyListItem
      secondaryElement={
        <Avatar sx={{
          width: '3rem',
          height: '3rem',
          borderRadius: '13px',
          margin: 'auto 0',
        }}
        />
      }
      avatar={<MyAvatar
        sx={{
          width: '3.5rem',
          height: '3.5rem',
        }}
        imageUrl={imageUrl}
      />}
      primary={
        <Typography style={{ color: 'white' }}>
          @
          {userName}
        </Typography>
      }
      secondary={
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
    />
  </List>
);

export default User;
