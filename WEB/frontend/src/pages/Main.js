import React from "react";
import NavBarMain from "../components/NavHeader/NavBarMain";
import MainTemplete from "../components/MainBody/MainTemplete";

// sx 사용법: https://theme-ui.com/sx-prop/
// System props: https://mui.com/system/properties/
// <Box mt={2}> 이렇게 쓸 수 있다.
const Main = () => {
  return (
    <>
      <NavBarMain />
      <MainTemplete />
    </>
  );
}
export default Main;