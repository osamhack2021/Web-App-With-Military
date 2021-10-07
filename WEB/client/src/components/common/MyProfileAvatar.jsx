import React from 'react';
import { Avatar } from '@mui/material';

const MyAvatar = ({ sx }) => {
  const imageUrl = 'https://images.unsplash.com/photo-1484800089236-7ae8f5dffc8e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80';
  return (

    <Avatar
      alt="Profile Picture"
      src={imageUrl}
      // ↓ sx로 스타일을 받는다
      sx={sx}
    />
  );
};

export default MyAvatar;
