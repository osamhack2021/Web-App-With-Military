import React from 'react';
import {
  Box, Badge, IconButton, Typography,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import TimerIcon from '@mui/icons-material/Timer';
import SearchIcon from '@mui/icons-material/Search';

import NavBar from '../common/NavBar';
import PCTemplate from '../common/PCTemplate';

const PCSearchTemplate = ({ children }) => (
  <>
    <NavBar
      title="위드밀리터리"
      bgColor="secondary"
      sx={{
        borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
      }}
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

    <PCTemplate>
      {children}

    </PCTemplate>

  </>
);

export default PCSearchTemplate;
