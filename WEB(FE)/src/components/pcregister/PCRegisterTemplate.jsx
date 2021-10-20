import React from 'react';
import {
  Box, Container, Typography,
} from '@mui/material';

const PCRegisterTemplate = ({ children }) => (
  <>
    <Container
      component="main"
      maxWidth="xs"
      style={{
        height: '100vh',
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Box sx={{
        borderBottom: '1px solid #073113',
        py: 1,
        textAlign: 'center',
      }}
      >
        <Typography style={{
          color: '#14571b',
          fontWeight: 'bold',
        }}
        >
          회원가입
        </Typography>
      </Box>
      {/* ↓ RegisterForm */}
      {children}

    </Container>
  </>
);

export default PCRegisterTemplate;
