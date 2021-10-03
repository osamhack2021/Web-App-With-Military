import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';

const Search = () => {

  const StyledToolbar = styled(Toolbar)({
    backgroundColor: '#000F04',
    color: 'white',
    borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
    height: '4rem'
  })

  return (
    <>
       <StyledToolbar>
        <Box>
          <Typography>찾으시는 검색어를 입력하세요</Typography>
          <IconButton size="large" color="inherit">
            <SearchIcon/>
          </IconButton>
        </Box>
      </StyledToolbar>
      <Box>
        <Typography>추천 검색어</Typography>
      </Box>
    </>
  );
};

export default Search;