import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, /*Button, Typography*/ } from '@mui/material';


const GrayBox = styled(Box)({
  backgroundColor: '#E8E8E8',
  borderRadius: '2.5rem',
  padding: '1rem',
})

export default function Ranking({
  
}) {
  
  return (
    <GrayBox sx={{
      m: 2,
      width: '100%',
    }}>
      랭킹
    </GrayBox>
  );
}