import React from 'react';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NavBar from '../common/NavBar';
import DarkTemplate from '../common/DarkTemplate';

const SearchTemplate = ({ children }) => (
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
          <MenuIcon />
        </IconButton>
      </NavBar>

      {/* ↓ 검색어 입력 부분 */}
      {children}
    </DarkTemplate>
  </>
);

export default SearchTemplate;
