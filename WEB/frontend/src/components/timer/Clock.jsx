import React from 'react';
import {
  Box, Button, Typography,
} from '@mui/material';
import { ReactComponent as DialIcon } from '../../static/icons/dial.svg';
import MyProfileAvatar from '../common/MyProfileAvatar';
import MyProfileList from '../common/MyProfileList';

const title = 'Study with me :)';

const Clock = () => (
  <Box sx={{
    color: '#e6e1e0',
    margin: 'auto',
    position: 'relative',
  }}
  >
    <MyProfileList
      avatar={<MyProfileAvatar sx={{
        width: '3.5rem',
        height: '3.5rem',
      }}
      />}
      primary={<Typography style={{ color: 'white' }}>{title}</Typography>}
    />
    <Box style={{
      textAlign: 'center',
      positon: 'relative',
    }}
    >
      <Box style={{
        position: 'absolute',
        left: '50%',
        top: '40%',
        transform: 'translate(-50%, -25%)',
      }}
      >
        <Box>
          <Typography style={{
            fontSize: '1rem',
            fontWeight: '500',
          }}
          >
            890P
          </Typography>
        </Box>
      </Box>
      <Box style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -25%)',
      }}
      >
        <Box>
          <Typography style={{
            fontSize: '2rem',
            fontWeight: '700',
          }}
          >
            02:48:16
          </Typography>
        </Box>
      </Box>
      <Box>
        <DialIcon style={{
          // background: 'conic-gradient(from 180deg at 50% 50%,
          //   rgba(255, 255, 255, 0) 0deg, #FFFFFF 360deg)',
          // transform: 'rotate(-150deg)',
        }}
        />
      </Box>
    </Box>
    <Box sx={{
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
          borderRadius: '8px',
        }}
      >
        <Typography>기록하기</Typography>
      </Button>
    </Box>
  </Box>

);

export default Clock;
