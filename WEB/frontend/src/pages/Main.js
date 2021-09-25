import React from "react";
import NavBar from "../components/NavBar";
import BodyTemplete from "../components/BodyTemplete";
import TierBar from "../components/TierBar";
import StudyGroup from "../components/StudyGroup";
import User from "../components/User";
import Rank from "../components/Rank";

// sx 사용법: https://theme-ui.com/sx-prop/
// System props: https://mui.com/system/properties/
// <Box mt={2}> 이렇게 쓸 수 있다.
const Main = () => {
  return (
    <>
      <NavBar />
      <BodyTemplete>
        <User />
        <TierBar />
        <StudyGroup />
        <Rank />
      </BodyTemplete>
    </>
  );
}
export default Main;