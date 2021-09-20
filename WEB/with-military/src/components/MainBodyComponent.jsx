import React from "react";
import { Container, Typography } from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Image from 'material-ui-image';

import { styled } from '@material-ui/core/styles';
import TierBarComponent from "./TierBarComponent";
import StudyGroupComponent from "./StudyGroupComponent";
import UserComponent from "./UserComponent";
import RankComponent from "./RankComponent";


const MainBodyComponent = () => {
  const StyledContainer = styled(Container)({
    backgroundColor: '#000F04',
    height: '100vh',
    width: '100vw',
    maxWidth: 'none'
  });
  return (
    <StyledContainer>
      <UserComponent />
      <TierBarComponent />
      <StudyGroupComponent />
      <RankComponent />
    </StyledContainer>
  );
};

export default MainBodyComponent;