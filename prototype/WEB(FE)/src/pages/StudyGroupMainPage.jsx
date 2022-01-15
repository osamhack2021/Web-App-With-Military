import React from 'react';
import { withRouter } from 'react-router-dom';
import StudyGroupMainTemplate from '../components/pcstudygroupmain/PCStudyGroupMainTemplate';
import StudyGroupMain from '../components/studygroup/StudyGroupMain';

const StudyGroupPage = () => {
  const totalMember = 26;
  const studyGroupName = 'Study with me :)';
  return (
    <>
      <StudyGroupMainTemplate>
        <StudyGroupMain studyGroupName={studyGroupName} totalMember={totalMember} />
      </StudyGroupMainTemplate>
    </>
  );
};
export default withRouter(StudyGroupPage);
