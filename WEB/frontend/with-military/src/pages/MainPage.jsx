import React from "react";
import NavigationBarComponent from "../components/NavigationBarComponent";
import BodyTemplete from "../components/BodyTemplete";
import TierBarComponent from "../components/TierBarComponent";
import StudyGroupComponent from "../components/StudyGroupComponent";
import UserComponent from "../components/UserComponent";
import RankComponent from "../components/RankComponent";

//npm install @material-ui/styles
{/* Material UI는 text, contained, outlined 이렇게 3가지 형태의 버튼을 제공하고 있습니다.
      contained 형태는 배경색이 들어가 있고, outlined 형태는 테두리가 있습니다.
      기본 형태인 text는 배경색과 테두리 없이 텍스트에만 스타일이 적용됩니다. */}
// sx 사용법: https://theme-ui.com/sx-prop/
// System props: https://mui.com/system/properties/
// <Box mt={2}> 이렇게 쓸 수 있다.
const MainPage = () => {
  return (
    <>
      <NavigationBarComponent />
      <BodyTemplete>
        <UserComponent />
        <TierBarComponent />
        <StudyGroupComponent />
        <RankComponent />
      </BodyTemplete>
    </>
  );
}
export default MainPage;