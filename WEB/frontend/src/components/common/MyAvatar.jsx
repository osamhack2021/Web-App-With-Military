import React from 'react';
import { Avatar } from '@mui/material';

const MyAvatar = ({ sx }) => {
  const imageUrl = 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3R1ZHl8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
  return (

    <Avatar
      alt="Study Group Profile Picture"
      src={imageUrl}
      // ↓ sx로 스타일을 받는다
      sx={sx}
    />
  );
};

export default MyAvatar;
