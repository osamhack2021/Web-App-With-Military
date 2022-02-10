import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

export default function Tier ({score, tier}) {
  
  const TierBox = styled(Box)({
    background: 'linear-gradient(180deg, rgba(255, 215, 0, 0.8) 0%, rgba(253, 255, 135, 0.8) 100%)',
    transform: 'rotate(-45deg)',
    width: '1rem',
    height: '1rem',
    margin: 'auto 0.2rem auto 0.2rem',
  });

  const TierBar = styled(Box)({
    background:
    'linear-gradient(270deg, rgba(250, 255, 0, 0.64) 0%, rgba(250, 255, 0, 0.32) 100%)',
    height: '1rem',
    width: '100%',
  });
  
  return (
    <Box>
      <Stack direction="row" spacing={2} >
        <TierBox />
        <Typography
          align="right"
          sx={{
            fontSize: '1rem',
            color : '#a3971c'
          }}
        >
          {score} / {tier}
        </Typography>
      </Stack>
      <TierBar />
    </Box>
  );
};