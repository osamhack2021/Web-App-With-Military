/* eslint-disable no-plusplus */
import React from 'react';
import { Button, List, Typography } from '@mui/material';
import { ReactComponent as TimerIcon } from '../../static/icons/timer_main.svg';
import MyListItem from '../common/MyListItem';
import MyAvatar from '../common/MyAvatar';

const tmpList = [{
  primaryText: 'Study with me :)',
  secondaryText: '이 그룹에서 획득한 포인트 890P',
  imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3R1ZHl8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
},
{
  primaryText: '회화 스터디‍✈️',
  secondaryText: '이 그룹에서 획득한 포인트 782P',
  imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3R1ZHl8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
}];

const ListItems = tmpList.map((tmp) => <MyListItem
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
  avatar={<MyAvatar
    sx={{
      width: '3rem',
      height: '3rem',
      borderRadius: '1rem',
    }}
    imageUrl={tmp.imageUrl}
  />}
  primary={<Typography style={{ color: 'white' }}>{tmp.primaryText}</Typography>}
  secondary={<Typography style={{ color: 'white' }}>{tmp.secondaryText}</Typography>}
/>);

const StudyGroup = () => (
  <>
    <List disablePadding>
      {ListItems}
    </List>
  </>

);

export default StudyGroup;
