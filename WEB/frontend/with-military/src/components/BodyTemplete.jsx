import React from "react";
import { Container } from "@material-ui/core";
import { styled } from '@material-ui/core/styles';



const BodyTemplete = ({children}) => {
  const StyledContainer = styled(Container)({
    backgroundColor: '#000F04',
    width: '100vw',
    height: '100vh',
    maxWidth: 'none'
  });
  return (
    <StyledContainer>
      {children}
    </StyledContainer>
  );
};

export default BodyTemplete;