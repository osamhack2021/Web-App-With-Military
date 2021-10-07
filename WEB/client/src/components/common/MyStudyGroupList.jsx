/* eslint-disable max-len */
import List from '@mui/material/List';
import MyStudyGroupListItem from './MyStudyGroupListItem';

const tmp = ['Study with me :)', '회화 스터디‍✈️'];
const MyStudyGroupList = ({ secondaryElement }) => {
  console.log({ secondaryElement });
  // 이거 어캐 temp에 인덱스 0,1줄까
  const myStudyGroupListItems = Array(2).fill(0).map((i) => <MyStudyGroupListItem secondaryElement={secondaryElement} sloganText={tmp[i]} />);
  return (
    <>
      <List>
        {/* <Divider /> 쓰면 ListItem 구분 선이 생김 */}
        {myStudyGroupListItems}
      </List>
    </>
  );
};

export default MyStudyGroupList;
