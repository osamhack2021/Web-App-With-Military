import React from 'react';
import { Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SearchIcon from '@mui/icons-material/Search';
import NavBar from '../common/NavBar';
import DarkTemplate from '../common/DarkTemplate';

const MainTemplate = ({ children }) => (
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
      <Box sx={{ px: 2 }}>
        {children}
      </Box>
    </DarkTemplate>

  </>
);

export default MainTemplate;
