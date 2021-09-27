import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
// import Badge from '@mui/material/Badge';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SearchIcon from "@material-ui/icons/Search";
import { styled } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core";
import { ReactComponent as WhiteLogo } from '../../static/svgs/logo-white.svg';

import theme from "../../styles/palette";
import { ThemeProvider } from '@mui/material/styles';

const NavBar = () => {
  const StyledAppBar = styled(AppBar)({
    //backgroundColor: '#000F04',
    color: '#e6e1e0',
    position: 'static',
    borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
    width: '100vw',
    //기본 appbar높이는 4rem인듯함...
    
  });
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" color={"primary"}>
        <Toolbar sx={{
          margin: 'auto 0',
          minHeight: '3rem'
          //minHeight추가하니 모바일화면에서는 3rem이 적용됨
        }}>
          <WhiteLogo width='2rem' height='2rem' />
          <Box sx={{
            mt: "4px",
            ml:"12px"
          }}>
            <Typography
              component={Box}
              style={{
                fontSize: "1.2rem"
              }}
            >
              위드밀리터리
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            size="large"
            color="inherit"
            sx={{ p: '0.3rem' }}
          >
            <MenuBookIcon />
          </IconButton>
          <IconButton
            size="large"
            color="inherit"
            sx={{ p: '0.3rem' }}
          >
            <SearchIcon />
          </IconButton>
          <IconButton
            size="large"
            color="inherit"
            sx={{ p: '0.3rem' }}
          >
            <MenuIcon />  
          </IconButton>
        </Toolbar>
      </AppBar>
    </ThemeProvider> 
    
  );
}
export default NavBar;