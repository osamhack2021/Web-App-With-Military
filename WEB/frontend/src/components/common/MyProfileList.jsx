import React from 'react';
import {
  Avatar, Box, Button,
} from '@mui/material';
import { ReactComponent as TimerIcon } from '../../static/icons/timer_main.svg';

const MyStudyGroupList = () => (
  <Box sx={{ color: '#e6e1e0' }}>
    <Box sx={{ display: 'flex', py: 1 }}>
      <Avatar sx={{
        width: '2.5rem',
        height: '2.5rem',
        borderRadius: '35%',
      }}
      />
      {/* <Box sx={{ pl: 1 }}>
          <Typography style={{ fontSize: '0.9rem' }}>
            Study with me :)
          </Typography>
          <Typography style={{ fontSize: '0.75rem' }}>
            이 그룹에서 획득한 포인트 : 890P
          </Typography>
        </Box> */}
      <Box sx={{ flexGrow: 1 }} />
      <Button
        variant="contained"
        style={{
          backgroundColor: 'white',
          width: '60px',
          height: '40px',
        }}
        size="small"
        sx={{ borderRadius: '15px' }}
      >
        <TimerIcon />
      </Button>
    </Box>

    <Box sx={{ display: 'flex', py: 1 }}>
      <Avatar
        sx={{
          width: '2.5rem',
          height: '2.5rem',
          borderRadius: '35%',
        }}
      />
      {/* <Box sx={{ pl: 1 }}>
          <Typography style={{ fontSize: '0.9rem' }}>
            회화 스터디‍✈️
          </Typography>
          <Typography style={{ fontSize: '0.75rem' }}>
            이 그룹에서 획득한 포인트 : 782P
          </Typography>
        </Box> */}
      <Box sx={{ flexGrow: 1 }} />
      <Button
        variant="contained"
        style={{
          backgroundColor: 'white',
          width: '60px',
          height: '40px',
        }}
        size="small"
        sx={{ borderRadius: '15px' }}
      >
        <TimerIcon style={{ color: '#073113' }} />
      </Button>
    </Box>
  </Box>
);

export default MyStudyGroupList;
