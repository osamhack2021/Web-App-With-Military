import React from 'react';
import {
  Box, Typography, Button,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { ReactComponent as WhiteTimerIcon } from '../../static/icons/timer_white.svg';

const StudyGroupMain = ({ totalMember, studyGroupName }) => (
  <>
    <Box sx={{
      color: 'rgba(0, 0, 0, 0.54)',
      display: 'flex',
      mt: 2,
      position: 'absolute',
      right: '1.7rem',
    }}
    >
      <PersonIcon width="1rem" height="1rem" sx={{ mr: 0.5 }} />
      <Typography
        component={Box}
        sx={{
          fontWeight: 'bold',
          py: '2px',
        }}
      >
        {/* ↓ 스터디 그룹에 참여하는 총 인원 */}
        {totalMember}
        /30
      </Typography>
    </Box>

    <Box sx={{
      mt: '5rem',
      mx: '3rem',
      textAlign: 'center',
    }}
    >
      <Typography style={{
        fontSize: '2rem',
        fontWeight: 'bold',

      }}
      >
        {studyGroupName}
      </Typography>

      <Button
        variant="contained"
        style={{
          backgroundColor: '#5ED0A7',
          borderRadius: '2rem',
          border: '2px solid #FFFFFF',
          width: '20rem',
          height: '2.5rem',
          marginTop: '1rem',
          textTransform: 'none',
        }}
      >

        <WhiteTimerIcon />
        <Typography
          component={Box}
          variant="h5"
          sx={{
            ml: 0.5,
          }}
        >
          Start with
        </Typography>
      </Button>

      <Box sx={{
        mt: 1,
      }}
      >
        {/* 본인 프로필 ListItem과 작성한 글이 나오는 곳 */}
      </Box>
    </Box>
  </>

);

export default StudyGroupMain;
