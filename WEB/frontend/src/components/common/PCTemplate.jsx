import React from 'react';
import { Container } from '@mui/material';

const PCTemplate = ({ sx, children }) => (
  <Container
    component="main"
    maxWidth="lg"
    style={{
      height: '100vh',
      padding: 0,
    }}
    sx={{
      ...sx,
    }}
  >
    {children}
  </Container>
);

export default PCTemplate;
