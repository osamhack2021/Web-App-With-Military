import React from 'react';
import { Avatar } from '@mui/material';

const MyAvatar = ({ sx, imageUrl }) => (
  <Avatar
    alt="Study Group Profile Picture"
    src={imageUrl}
      // ↓ sx로 스타일을 받는다
    sx={sx}
  />
);

export default MyAvatar;
