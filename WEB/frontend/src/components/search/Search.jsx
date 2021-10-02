import React from "react";
import Avatar from '@mui/material/Avatar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@material-ui/core/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from "@material-ui/icons/Search";
import { Typography } from "@material-ui/core";
import { styled } from '@material-ui/core/styles';



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