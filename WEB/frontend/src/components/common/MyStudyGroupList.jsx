/* eslint-disable max-len */
import List from '@mui/material/List';
import MyStudyGroupListItem from './MyStudyGroupListItem';

const MyStudyGroupList = ({
  secondaryElement, avatar, primary, secondary,
}) => {
  // 이거 어캐 temp에 인덱스 0,1줄까
  const myStudyGroupListItems = Array(2).fill(0).map(() => <MyStudyGroupListItem
    secondaryElement={secondaryElement}
    avatar={avatar}
    primary={primary}
    secondary={secondary}

  />);
  return (
    <>
      <List disablePadding>
        {/* <Divider /> 쓰면 ListItem 구분 선이 생김 */}
        {myStudyGroupListItems}
      </List>
    </>
  );
};

export default MyStudyGroupList;
