import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';
// import TierBar from '../components/main/TierBar';
import StudyGroupList from '../components/main/StudyGroupList';
import User from '../components/main/User';
import Rank from '../components/main/Rank';
import MainTemplate from '../components/main/MainTemplate';

const MainPage = () => {
  const user = useSelector((state) => state.userAuth);

  useEffect(() => {
    console.log(user);
  });
  // 임시 코드
  const userName = 'goodgun';

  return (
    <>
      <MainTemplate>
        <User userName={userName} />
        {/* <TierBar /> */}
        <StudyGroupList />
        <Rank />
      </MainTemplate>
    </>
  );
};

export default MainPage;
