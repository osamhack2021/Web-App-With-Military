import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function CompletionBox({ content, searchWord, setSearchWord }) {
  console.log(content);
  const onComplete = () => {
    setSearchWord(content.groupName);
  };
  const highlightedText = (text, query) => {
    if (query !== '' && text.includes(query)) {
      const parts = text.split(new RegExp(`(${query})`, 'gi'));

      return (
        <>
          {parts.map((part, index) =>
            part.toLowerCase() === query.toLowerCase() ? (
              <mark key={index}>{part}</mark>
            ) : (
              part
            ),
          )}
        </>
      );
    }

    return text;
  };
  useEffect(() => {}, []);
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
      <Typography>{highlightedText(content.groupName, searchWord)}</Typography>
    </Box>
  );
}
