import React from 'react';
import {
  Box, Button, Typography,
} from '@mui/material';
import { ReactComponent as DialIcon } from '../../static/icons/dial.svg';
import MyAvatar from '../common/MyAvatar';
import MyListItem from '../common/MyListItem';

const title = 'Study with me :)';
const imageUrl = 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3R1ZHl8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

const Clock = () => (
  <Box sx={{
    color: '#e6e1e0',
    margin: 'auto',
    position: 'relative',
  }}
  >
    <MyListItem
      avatar={<MyAvatar
        sx={{
          width: '3.5rem',
          height: '3.5rem',
        }}
        imageUrl={imageUrl}
      />}
      primary={<Typography style={{ color: 'white' }}>{title}</Typography>}
    />
    <Box
      style={{
        textAlign: 'center',
        positon: 'relative',
      }}
      imageUrl={imageUrl}
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
