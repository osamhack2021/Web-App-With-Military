import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import NavBar from '../common/NavBar';

const StyledTypography = styled(Typography)({
  color: '#14571b',
  fontWeight: 'bold',
});

const RegisterTemplate = ({ children }) => (
  <>
    <Container
      component="main"
      maxWidth="xs"
      style={{
        padding: 0,
        height: '100vh',
      }}
    >
      <NavBar bgColor="secondary" />
      <Box sx={{ px: 2 }}>
        <Box sx={{
          borderBottom: '1px solid #073113',
          py: 1,
        }}
        >
          <StyledTypography>회원가입</StyledTypography>
        </Box>
        {/* ↓ RegisterForm */}
        {children}
      </Box>

    </Container>
  </>
);

export default RegisterTemplate;
