import React from "react";
import Avatar from '@mui/material/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@mui/material/Button';
import { Typography } from "@material-ui/core";
import { styled } from '@material-ui/core/styles';
import { ReactComponent as Dial } from '../static/svgs/dial.svg';

//auto, flex, justify, textalign으로 대충 가운데 놨지만 더 좋은 방법은 없을까..
const ClockComponent = () => {
  return (
    <Box sx={{
      color: '#e6e1e0',
      margin: 'auto ',
      width: '50vw',
    }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center'
      }}> 
        <Avatar src=""/>
        <Typography 
          style={{
            fontWeight: 'bold' 
          }}
          variant="h2"
        >
          Study with me :)
        </Typography>
      </Box>
      <Box
        sx={{textAlign: 'center'}}
      >
        <Dial
          //아래 적용 어떻게 할까..
          // style={{
          //   background: 'conic-gradient(from 180deg at 50% 50%, rgba(255, 255, 255, 0) 0deg, #FFFFFF 360deg)',
          //   transform: 'rotate(-150deg)',
          // }}
          >
          </Dial>
      </Box>

      <Box sx={{
        display: 'flex',
        justifyContent: 'center'
      }}>
        <Button 
          variant="contained"
          style={{
            
          }}
          size="small"
          sx={{ 
            backgroundColor:'#FF4545',
            width: '156px',
            height: '42px',
            borderRadius: '8px' }}
        >
          <Typography>
            일시 정지
          </Typography>
        </Button>
        <Button 
          variant="contained"
          style={{
            backgroundColor:'#5ED0A7',
            width: '156px',
            height: '42px'
          }}
          size="small"
          sx={{ borderRadius: '10px' }}
        >
          <Typography>
            기록하기
          </Typography>
        </Button>
      </Box>
    </Box>
    
  );
};

export default ClockComponent;