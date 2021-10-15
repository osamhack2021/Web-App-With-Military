import React from 'react';
import { Avatar, Box, Button, Typography } from '@mui/material';
import { ReactComponent as DialIcon } from '../../static/icons/dial.svg';
import useElapsedTime from '../../hooks/useElapsedTime';

const Clock = () => {
  const {
    elapsedTime,
    formedTimeString,
    resume,
    pause,
    isPaused,
    isStarted,
    start,
    stop,
  } = useElapsedTime();
  return (
    <Box
      sx={{
        color: '#e6e1e0',
        margin: 'auto',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: '2.5rem 0',
        }}
      >
        <Avatar
          sx={{
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '13px',
            mr: '0.5rem',
          }}
        />
        <Typography
          style={{
            fontWeight: 'bold',
            fontSize: '2rem',
          }}
        >
          Study with me :)
        </Typography>
      </Box>
      <Box
        style={{
          textAlign: 'center',
          positon: 'relative',
        }}
      >
        <Box
          style={{
            position: 'absolute',
            left: '50%',
            top: '40%',
            transform: 'translate(-50%, -25%)',
          }}
        >
          <Box>
            <Typography
              style={{
                fontSize: '1rem',
                fontWeight: '500',
              }}
            >
              890P
            </Typography>
          </Box>
        </Box>
        <Box
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -25%)',
          }}
        >
          <Box>
            <Typography
              style={{
                fontSize: '2rem',
                fontWeight: '700',
              }}
            >
              {formedTimeString}
            </Typography>
          </Box>
        </Box>
        <Box>
          <DialIcon
            style={
              {
                // background: 'conic-gradient(from 180deg at 50% 50%,
                //   rgba(255, 255, 255, 0) 0deg, #FFFFFF 360deg)',
                // transform: 'rotate(-150deg)',
              }
            }
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          pt: '3rem',
        }}
      >
        <Button
          variant="contained"
          size="small"
          style={{
            backgroundColor: '#FF4545',
            width: '156px',
            height: '42px',
            margin: 'auto',
            borderRadius: '8px',
          }}
          onClick={!isStarted ? start : isPaused ? resume : pause}
        >
          <Typography>
            {!isStarted ? '시작하기' : isPaused ? '계속하기' : '일시정지'}
          </Typography>
        </Button>
        <Button
          variant="contained"
          size="small"
          style={{
            backgroundColor: '#5ED0A7',
            width: '156px',
            height: '42px',
            margin: 'auto',
            borderRadius: '8px',
          }}
          onClick={stop}
        >
          <Typography>기록하기</Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default Clock;