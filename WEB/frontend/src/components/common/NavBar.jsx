import React from "react";
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ReactComponent as WhiteLogo } from '../../static/icons/logo_white.svg';

const NavBar = ({bgColor, children}) => {
  const StyledAppBar = styled(AppBar)({
    color: '#e6e1e0',
    borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
    position: "static",
  });
  return (
    <StyledAppBar color={bgColor}>
      <Toolbar sx={{ my: 'auto' }}>
        <WhiteLogo width='2rem' height='2rem' />
        <Box sx={{
          mt: '4px',
          ml: '12px'
        }}>
          <Typography style={{
            fontSize: '1.2rem',
            color: 'white'
          }}>
            위드밀리터리
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        {/* ↓ icon이 들어감 */}
        {children}
      </Toolbar>
    </StyledAppBar>
  );
}
export default NavBar;