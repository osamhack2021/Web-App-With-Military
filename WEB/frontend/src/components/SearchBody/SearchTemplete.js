import React from "react";
import { Container } from "@material-ui/core";
import { styled } from '@material-ui/core/styles';
import Search from "./Search";


const SearchTemplete = () => {
  const StyledContainer = styled(Container)({
    backgroundColor: '#000F04',
    width: '100vw',
    height: '100vh',
    maxWidth: 'none',
    padding: 0
  });

  


  return (
    <StyledContainer>
      <Search />
    </StyledContainer>
  );
};

export default SearchTemplete;