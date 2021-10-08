import React from 'react';
import { Button, Typography } from '@mui/material';
// import CommentIcon from '@mui/icons-material/Comment';
import { ReactComponent as TimerIcon } from '../../static/icons/timer_main.svg';
import MyStudyGroupList from '../common/MyStudyGroupList';
import MyStudyGroupAvatar from '../common/MyStudyGroupAvatar';

const tmp = ['Study with me :)', '이 그룹에서 획득한 포인트'];
const StudyGroup = () => (
  <>
    <MyStudyGroupList
      secondaryElement={
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
    }
      avatar={<MyStudyGroupAvatar sx={{
        width: '3rem',
        height: '3rem',
        borderRadius: '1rem',
      }}
      />}
      primary={<Typography style={{ color: 'white' }}>{tmp[0]}</Typography>}
      secondary={<Typography style={{ color: 'white' }}>{tmp[1]}</Typography>}
    />

  </>

);

export default StudyGroup;
