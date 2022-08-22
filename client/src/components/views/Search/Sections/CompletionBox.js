import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function CompletionBox({ content, searchWord, setSearchWord }) {
  console.log(content);
  const [leftWord, setLeftWord] = useState('');
  const onComplete = () => {
    setSearchWord(content.groupName);
  };
  useEffect(() => {
    setLeftWord(content.groupName.substring(searchWord.length));
  }, [searchWord]);
  return (
    <Box
      sx={{
        backgroundColor: '#e5e5e5',
        textDecoration: 'underline',
        display: 'flex',
        width: '100%',
        cursor: 'pointer',
        py: '0.3rem',
      }}
      onClick={onComplete}
    >
      <SearchIcon />
      <Typography sx={{ color: '#3EA5E2' }}>{searchWord}</Typography>
      <Typography>{leftWord}</Typography>
    </Box>
  );
}
