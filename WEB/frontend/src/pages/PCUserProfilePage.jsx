import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PCUserProfileTemplate from '../components/pcuserprofile/PCUserProfileTemplate';

const PCUserProfilePage = () => {
  const user = useSelector((state) => state.userAuth);

  useEffect(() => {
    console.log(user);
  });

  // 임시 코드
  // const userName = 'goodgun';

  return (
    <>
      <PCUserProfileTemplate>
      </PCUserProfileTemplate>
    </>
  );
};

export default withRouter(PCUserProfilePage);
