import React from "react";
import { Container } from "@material-ui/core";
import { styled } from '@material-ui/core/styles';
import UploadForm from "./UploadForm";


const UploadTemplete = () => {
  const StyledContainer = styled(Container)({
    //backgroundColor: '#000F04',
    width: '100vw',
    height: '100vh',
    maxWidth: 'none',
    padding: 0
  });
  return (
    <StyledContainer>
      <UploadForm />
    </StyledContainer>
  );
};

export default UploadTemplete;