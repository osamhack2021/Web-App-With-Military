import React from "react";
import NavigationBarComponent from "../components/NavigationBarComponent";
import MainBodyComponent from "../components/MainBodyComponent";
import ClockComponent from "../components/ClockComponent";

const MainPage = () => {
  return (
    <>
      <NavigationBarComponent />
      <MainBodyComponent>
        <ClockComponent />
      </MainBodyComponent>
    </>
  );
}
export default MainPage;
