import React from 'react';
import { withRouter } from 'react-router-dom';
import SearchInput from '../components/search/SearchInput';
import SearchTemplate from '../components/search/SearchTemplate';

const SearchPage = () => (
  <>
    <SearchTemplate>
      <SearchInput />
    </SearchTemplate>
  </>
);
export default withRouter(SearchPage);
