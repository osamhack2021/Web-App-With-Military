import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';
// import TierBar from '../components/main/TierBar';
import StudyGroupList from '../components/pcmain/StudyGroupList';
import MainTemplate from '../components/pcmain/MainTemplate';
import SearchInput from '../components/pcmain/SearchInput';

const MainPage = () => {
  const user = useSelector((state) => state.userAuth);

  useEffect(() => {
    console.log(user);
  });

  // 임시 코드
  // const userName = 'goodgun';

  return (
    <>
      <MainTemplate>
        {/* <User userName={userName} /> */}
        {/* <TierBar /> */}
        <SearchInput />
        <StudyGroupList />
        {/* <Rank /> */}
      </MainTemplate>
    </>
  );
};

export default MainPage;
