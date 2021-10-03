import React from "react";
import { Container } from "@material-ui/core";
import { styled } from '@material-ui/core/styles';
import NavBar from "../common/navigation/NavBar";

const SearchTemplate = ({children}) => {
  const StyledContainer = styled(Container)({
    backgroundColor: '#000F04',
    width: '100vw',
    height: '100vh',
    maxWidth: 'none',
    padding: 0
  });

  return (
    <>
      <NavBar />
      <StyledContainer>
        {children}
      </StyledContainer>
    </>
  );
};

export default SearchTemplate;