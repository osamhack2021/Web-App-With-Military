/* eslint-disable react/prop-types */
import React from 'react';
import {
  AppBar, Box, Toolbar, Typography,
} from '@mui/material';
import { ReactComponent as WhiteLogo } from '../../static/icons/logo_white.svg';


const NavBar = ({
  title, bgColor, sx, children,
}) => (
  <AppBar
    color={bgColor}
    style={{
      ...sx,
      color: '#e6e1e0',
      position: 'static',
    }}
  >
    <Toolbar sx={{ my: 'auto' }}>
      <WhiteLogo width="2rem" height="2rem" style={{ color: '#e6e1e0' }} />
      <Box
        sx={{
          mt: '4px',
          ml: '12px',
        }}
      >
        <Typography
          style={{
            fontSize: '1.2rem',
            // color: 'white'
          }}
        >
          {/* ↓ AppBar의 텍스트 */}
          {title}
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      {/* ↓ icon이 들어감 */}
      {children}
    </Toolbar>
  </AppBar>
);
export default NavBar;
