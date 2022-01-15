import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
// import TierBar from '../components/main/TierBar';
import PCStudyGroupMain from '../components/pcstudygroupmain/PCStudyGroupMain';
import PCStudyGroupMainTemplate from '../components/pcstudygroupmain/PCStudyGroupMainTemplate';

const PCStudyGroupMainPage = () => {
  const totalMember = 26;
  const studyGroupName = 'Study with me :)';

  return (
    <>
      <PCStudyGroupMainTemplate>
        <PCStudyGroupMain studyGroupName={studyGroupName} totalMember={totalMember} />
      </PCStudyGroupMainTemplate>
    </>
  );
};

export default withRouter(PCStudyGroupMainPage);
