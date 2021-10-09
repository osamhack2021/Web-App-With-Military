import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box, InputAdornment,
  TextField,
} from '@mui/material';

const SearchInput = () => (
  <>
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
      height: '4rem',
      '& input': {
        color: '#5E5E5E',
      },
      mt: 5,
    }}
    >
      <TextField
        size="small"
        placeholder="검색어를 입력하세요."
        sx={{
          width: '30%',
          my: 'auto',
          border: '2px solid #073113',
          borderRadius: '2rem',
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment>
              <SearchIcon sx={{ color: '#073113', pl: 1, borderLeft: '2px solid #073113' }} />
            </InputAdornment>
          ),
        }}
      />
    </Box>

  </>
);

export default SearchInput;
