import React from 'react';
import { Container } from '@mui/material';

const DarkTemplate = ({ sx, children }) => (
  <Container
    component="main"
    maxWidth="xs"
    style={{
      ...sx,
      backgroundColor: '#A3CDB7',
      height: '100vh',
    }}
  >
    {children}
  </Container>
);

export default DarkTemplate;
