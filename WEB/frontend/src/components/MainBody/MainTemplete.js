import React from "react";
import { Container } from "@material-ui/core";
import { styled } from '@material-ui/core/styles';
import TierBar from "./TierBar";
import StudyGroup from "./StudyGroup";
import User from "./User";
import Rank from "./Rank";

const MainTemplete = () => {
  const StyledContainer = styled(Container)({
    backgroundColor: '#000F04',
    width: '100vw',
    height: '100vh',
    maxWidth: 'none'
  });
  return (
    <StyledContainer>
      <User />
      <TierBar />
      <StudyGroup />
      <Rank />
    </StyledContainer>
  );
};

export default MainTemplete;