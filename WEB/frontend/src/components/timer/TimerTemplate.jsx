import React from 'react';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SearchIcon from '@mui/icons-material/Search';
import NavBar from '../common/NavBar';
import DarkTemplate from '../common/DarkTemplate';
import Overlay from './Overlay';

const TimerTemplate = ({ children }) => (
  <>
    <DarkTemplate sx={{ padding: 0 }}>
      <NavBar
        title="위드밀리터리"
        bgColor="primary"
        sx={{
          borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
        }}
      >
        <IconButton size="large" color="inherit" sx={{ p: '0.3rem' }}>
          <MenuBookIcon />
        </IconButton>
        <IconButton size="large" color="inherit" sx={{ p: '0.3rem' }}>
          <SearchIcon />
        </IconButton>
        <IconButton size="large" color="inherit" sx={{ p: '0.3rem' }}>
          <MenuIcon />
        </IconButton>
      </NavBar>
      <Overlay />
      {/* ↓ 다이얼, 버튼 */}
      {children}
    </DarkTemplate>
  </>
);

export default TimerTemplate;
