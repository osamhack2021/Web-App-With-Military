import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import TierBar from '../components/main/TierBar';';
import PCMainTemplate from '../components/pcmain/PCMainTemplate';

const PCMainPage = () => {
  const user = useSelector((state) => state.userAuth);

  useEffect(() => {
    console.log(user);
  });

  // 임시 코드
  // const userName = 'goodgun';

  return (
    <>
      <PCMainTemplate>
        <div>메인페이지 입니다.</div>
      </PCMainTemplate>
    </>
  );
};

export default withRouter(PCMainPage);
