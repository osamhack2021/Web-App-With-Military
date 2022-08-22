import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, InputAdornment, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CompletionBox from './CompletionBox';

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  border: '2px solid #073113',
  borderRadius: '2rem',
  width: '50%',
  height: '3rem',
  '& .MuiInputBase-input': {
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  },
}));

function SearchBar(props) {
  const [searchWord, setSearchWord] = useState('');
  const [searchGroupResult, setSearchGroupResult] = useState([]);

  const onSearch = () => {
    props.history.push(`/search/${searchWord}`);
  };

  const onChange = e => {
    const {
      target: { value },
    } = e;
    setSearchWord(value);
    
  };

  const onKeyPress = e => {
    if (e.key === 'Enter') {
      onSearch();
      setSearchWord('');
    }
  };
  useEffect(() => {
    if (searchWord === '') {
      setSearchGroupResult([]);
    } else {
      Axios.post('/api/search/all', { search: searchWord }).then(response => {
        if (response.data.success) {
          setSearchGroupResult(response.data.Groups);
        } else {
          alert('Failed');
        }
      });
    }
  }, [searchWord]);
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          position: 'relative',
          borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
          height: '4rem',
          '& input': {
            color: '#5E5E5E',
          },
          mt: 10,
        }}
      >
        <StyledInputBase
          placeholder="찾고 싶은 그룹을 검색해보세요."
          onChange={onChange}
          onKeyPress={onKeyPress}
          value={searchWord}
          endAdornment={
            <InputAdornment onClick={onSearch} position="start">
              <SearchIcon
                sx={{
                  color: '#073113',
                  width: '2.5rem',
                  height: '2.5rem',
                  pl: 1,
                  borderLeft: '2px solid #073113',
                  cursor: 'pointer',
                }}
              />
            </InputAdornment>
          }
        />
        <Box
          sx={{ position: 'absolute', left: '25%', top: '3rem', width: '50%' }}
        >
          {searchGroupResult.map(group => (
            <CompletionBox
              key={group._id}
              content={group}
              searchWord={searchWord}
              setSearchWord={setSearchWord}
            />
          ))}
        </Box>
      </Box>
    </>
  );
}

export default withRouter(SearchBar);
