import React from "react";
import { Container } from "@material-ui/core";
import { styled } from '@material-ui/core/styles';



const MainBodyComponent = ({children}) => {
  const StyledContainer = styled(Container)({
    backgroundColor: '#000F04',
    height: '100vh',
    width: '100vw',
    maxWidth: 'none'
  });
  return (
    <StyledContainer>
      {children}
    </StyledContainer>
  );
};

export default MainBodyComponent;