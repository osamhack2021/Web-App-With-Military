import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box, InputAdornment,
  TextField, Typography,
} from '@mui/material';

const SearchInput = () => (
  <>
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: '#001D08',
      borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
      height: '4rem',
      '& input': {
        color: 'white',
      },
    }}
    >
      <TextField
        size="small"
        placeholder="찾으시는 검색어를 입력하세요."
        sx={{
          width: '80%',
          my: 'auto',
          borderBottom: '1px solid rgba(255, 255, 255, 0.84)',
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment>
              <SearchIcon sx={{ color: 'white' }} />
            </InputAdornment>
          ),
        }}
      />
    </Box>

    <Box sx={{
      mt: 15,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
    >
      <Typography style={{
        fontSize: '1.2rem',
        color: 'white',
      }}
      >
        추천 검색어
      </Typography>
    </Box>

  </>
);

export default SearchInput;
