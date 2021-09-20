import React from "react";
import Box from '@material-ui/core/Box';
import { Typography } from "@material-ui/core";
import { styled } from '@material-ui/core/styles';


const TierBarComponent = () => {
  const TierBar = styled(Box)({
    background: 
    'linear-gradient(270deg, rgba(250, 255, 0, 0.64) 0%, rgba(250, 255, 0, 0.32) 100%)',
    width: '30%',
    height: '10px'
  });
 
  return (
    <>
      <TierBar></TierBar>
      <Box
        sx={{
          color: '#a3971c',
          p: 1,
        }}
      >
        <Typography align='right'>1672P</Typography>
      </Box>
    </>
  );
};

export default TierBarComponent;