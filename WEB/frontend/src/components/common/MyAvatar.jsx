import React from 'react';
import { Avatar } from '@mui/material';

const MyStudyGroupAvatar = ({ sx, imageUrl }) => (

  <Avatar
    src={imageUrl}
      // ↓ sx로 스타일을 받는다
    sx={sx}
  />
);

export default MyStudyGroupAvatar;
