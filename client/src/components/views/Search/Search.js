import React from 'react';
import { Container } from '@mui/material';
import SearchBar from './Sections/SearchBar';

export default function Search(props) {

	return (
    <Container
      component="main"
      maxWidth="lg"
      sx={{
        minHeight: 'calc(100vh - 9rem - 1px)',
        overflow: 'hidden'
      }}
    >
      <br/>
      <SearchBar />
    </Container>
	);
}