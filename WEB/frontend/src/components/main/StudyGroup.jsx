import React from 'react';
import {
  Button,
} from '@mui/material';
// import CommentIcon from '@mui/icons-material/Comment';
import { ReactComponent as TimerIcon } from '../../static/icons/timer_main.svg';
import MyStudyGroupList from '../common/MyStudyGroupList';

const StudyGroup = () => (
  <>
    <MyStudyGroupList secondaryElement={
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
    />

  </>
);

export default StudyGroup;
