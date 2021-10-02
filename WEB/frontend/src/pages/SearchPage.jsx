import React from "react";
import Search from "../components/search/Search";
import SearchTemplate from "../components/search/SearchTemplate";


const SearchPage = () => {
  return (
    <>
      <SearchTemplate>
        <Search />
      </SearchTemplate>
    </>
  );
}
export default SearchPage;