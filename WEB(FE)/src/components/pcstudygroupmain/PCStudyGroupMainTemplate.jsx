import React from 'react';
import {
  Box, Badge, IconButton, Typography,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import TimerIcon from '@mui/icons-material/Timer';
import SearchIcon from '@mui/icons-material/Search';
import MyAvatar from '../common/MyAvatar';
import NavBar from '../common/NavBar';
import PCTemplate from '../common/PCTemplate';

const PCStudyGroupMainTemplate = ({ children }) => {
  const imageUrl = 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3R1ZHl8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

  return (
    <>
      <NavBar
        title="위드밀리터리"
        bgColor="secondary"
      >
        <Typography
          component={Box}
          sx={{
            mx: 2,
          }}
        >
          Studygroup
        </Typography>
        <Typography
          component={Box}
          sx={{
            mx: 2,
          }}
        >
          Ranking
        </Typography>
        <Badge color="error" badgeContent=" " variant="dot">
          <IconButton size="large" color="inherit" sx={{ mx: 2, p: 0 }}>
            <PersonIcon />
          </IconButton>
        </Badge>

        <IconButton size="large" color="inherit" sx={{ mx: 2, p: 0 }}>
          <TimerIcon />
        </IconButton>
        <IconButton size="large" color="inherit" sx={{ mx: 2, p: 0 }}>
          <SearchIcon />
        </IconButton>
      </NavBar>

      <PCTemplate sx={{
        position: 'relative',
      }}
      >
        <Box sx={{
          width: '100%',
          height: '25%',
          backgroundImage: 'url("https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=850&q=80 850w")',
          position: 'absolute',
          zIndex: 1,
        }}
        />
        <Box sx={{
          width: '100%',
          height: '80%',
          position: 'absolute',
          backgroundColor: '#f1f8ff',
          zIndex: 2,
          bottom: 0,
          borderRadius: '40px 40px 0px 0px',
        }}
        >
          {/* 카드 안에 내용이 들어가는 부분 */}
          {children}

        </Box>
        <MyAvatar
          sx={{
            width: '11rem',
            height: '11rem',
            position: 'absolute',
            zIndex: 3,
            top: '20%',
            left: '15%',
            transform: 'translate(-50%, -50%)',
          }}
          imageUrl={imageUrl}
        />
      </PCTemplate>

    </>
  );
};

export default PCStudyGroupMainTemplate;
