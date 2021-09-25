import React from "react";
import Avatar from '@mui/material/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@mui/material/Button';
import { Paper, Typography } from "@material-ui/core";
import { styled } from '@material-ui/core/styles';
import { ReactComponent as Dial } from '../static/svgs/dial.svg';
import GoodGun from "../static/images/goodgun.jpg"

//auto, flex, justifyContent, textalign으로 대충 가운데 놨지만 더 좋은 방법은 없을까..
const Clock = () => {

  return (
    <Box sx={{
      color: '#e6e1e0',
      margin: 'auto',
      position: "relative"
    }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        padding: '2.5rem 0'
      }}> 
        <Avatar
          sx={{
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '13px',
            mr: '0.5rem'
          }}
          // src={require("../static/images/logo192.png")}
          src={GoodGun}
        />
        <Typography 
          style={{
            fontWeight: 'bold',
            fontSize: '2rem'
          }}
        >
          Study with me :)
        </Typography>
      </Box>
      <Box style={{
        textAlign:'center', 
        padding: 'auto',
        positon: 'relative'
      }}>
        <Box style={{
          position: 'absolute',
          left: '50%',
          top: '50%'
        }}>
          <Typography>890P</Typography>
          <Typography>02:48:16</Typography>
        </Box>
        <Box>
          <Dial
            style={{
              //background: 'conic-gradient(from 180deg at 50% 50%, rgba(255, 255, 255, 0) 0deg, #FFFFFF 360deg)',
              //transform: 'rotate(-150deg)',
            }}
          >
          </Dial>
        </Box>
      </Box>

      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        pt: '3rem'
      }}>
        <Button 
          variant="contained"
          size="small"
          style={{
            backgroundColor: '#FF4545',
            width: '156px',
            height: '42px',
            margin: 'auto',
            borderRadius: '8px'
          }}
        >
          <Typography>일시 정지</Typography>
        </Button>
        <Button 
          variant="contained"
          size="small"
          style={{
            backgroundColor: '#5ED0A7',
            width: '156px',
            height: '42px',
            margin: 'auto',
            borderRadius: '8px'
          }}
        >
          <Typography>기록하기</Typography>
        </Button>
      </Box>
    </Box>
    
  );
};

export default Clock;