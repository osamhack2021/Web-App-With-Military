import React from 'react';
import {
  Box, Container, IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MyAvatar from './MyAvatar';

import NavBar from './NavBar';

const imageUrl = 'https://images.unsplash.com/photo-1484800089236-7ae8f5dffc8e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80';

const StudyGroupTemplate = ({ children }) => {
  const backgroudImageUrl = 'https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80';

  return (
    <>
      <Container
        component="main"
        maxWidth="xs"
        style={{
          position: 'relative',
          height: '100vh',
          padding: 0,
        }}
      >
        <Box sx={{
          width: '100%',
          height: '25%',
          backgroundImage: `url(${backgroudImageUrl})`,
          position: 'absolute',
          zIndex: 1,
        }}
        >
          <NavBar bgColor="transparent">
            <IconButton size="large" color="inherit" sx={{ p: '0.3rem' }}>
              <SearchIcon />
            </IconButton>
            <IconButton size="large" color="inherit" sx={{ p: '0.3rem' }}>
              <MenuIcon />
            </IconButton>
          </NavBar>
        </Box>
        <Box sx={{
          width: '100%',
          height: '75%',
          position: 'absolute',
          backgroundColor: '#f1f8ff',
          zIndex: 2,
          bottom: '5%',
          borderRadius: '40px 40px 0px 0px',
        }}
        >
          {/* 카드 안에 내용이 들어가는 부분 */}
          {children}

        </Box>

        <Box sx={{
          width: '8.5rem',
          height: '8.5rem',
          background: 'linear-gradient(180deg, rgba(255, 215, 0, 0.8) 0%, rgba(253, 255, 135, 0.8) 100%)',
          position: 'absolute',
          zIndex: 3,
          borderRadius: '50%',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        />
        <MyAvatar
          sx={{
            width: '8rem',
            height: '8rem',
            position: 'absolute',
            zIndex: 4,
            top: '20%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          imageUrl={imageUrl}
        />
      </Container>
    </>
  );
};

export default StudyGroupTemplate;
