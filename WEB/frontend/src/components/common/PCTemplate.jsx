import React from 'react';
import { Container } from '@mui/material';

const PCTemplate = ({ sx, children }) => (
  <Container
    component="main"
    width="100vw"
    height="100vh"
    position="relative"
    // maxWidth="none"
    sx={{
      ...sx,
    }}
  >
    {children}
  </Container>
);

export default PCTemplate;
