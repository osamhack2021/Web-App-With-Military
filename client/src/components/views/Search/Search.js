import React from 'react';
import { Container } from '@mui/material';

import SearchBar from './Sections/SearchBar';

function Search(props) {

	return (
    <Container
      component="main"
      maxWidth="lg"
    >
      <br/>
      <SearchBar />
    </Container>
	);
}

export default Search;