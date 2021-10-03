import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';


const TierBar = () => {
  const TierBar = styled(Box)({
    background: 
    'linear-gradient(270deg, rgba(250, 255, 0, 0.64) 0%, rgba(250, 255, 0, 0.32) 100%)',
    width: '30%',
    height: '0.75rem'
  });
 
  return (
    <Box sx={{
      color: '#a3971c',
      pt: '0.6rem'}}>
      <TierBar></TierBar>
      <Box>
        <Typography
          align='right'
          style={{
            fontSize: '1rem'
          }}
        >1672P</Typography>
      </Box>
    </Box>
  );
};

export default TierBar;