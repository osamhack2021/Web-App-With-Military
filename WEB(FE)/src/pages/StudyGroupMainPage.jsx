import React from 'react';
import StudyGroupTemplate from '../components/common/StudyGroupTemplate';
import StudyGroupMain from '../components/studygroup/StudyGroupMain';

const StudyGroupPage = () => {
  const totalMember = 26;
  const studyGroupName = 'Study with me :)';
  return (
    <>
      <StudyGroupTemplate>
        <StudyGroupMain studyGroupName={studyGroupName} totalMember={totalMember} />
      </StudyGroupTemplate>
    </>
  );
};
export default StudyGroupPage;
