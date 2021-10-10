import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import TierBar from '../components/main/TierBar';
import PCStudyGroupList from '../components/pcsearch/PCStudyGroupList';
import PCSearchTemplate from '../components/pcsearch/PCSearchTemplate';
import PCSearchInput from '../components/pcsearch/PCSearchInput';

const PCSearchPage = () => {
  const user = useSelector((state) => state.userAuth);

  useEffect(() => {
    console.log(user);
  });

  // 임시 코드
  // const userName = 'goodgun';

  return (
    <>
      <PCSearchTemplate>
        {/* <User userName={userName} /> */}
        {/* <TierBar /> */}
        <PCSearchInput />
        <PCStudyGroupList />
        {/* <Rank /> */}
      </PCSearchTemplate>
    </>
  );
};

export default withRouter(PCSearchPage);
