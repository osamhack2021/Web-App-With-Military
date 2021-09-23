import React from "react";
import NavigationBarComponent from "../components/NavigationBarComponent";
import BodyTemplete from "../components/BodyTemplete";
import ClockComponent from "../components/ClockComponent";

const MainPage = () => {
  return (
    <>
      <NavigationBarComponent />
      <BodyTemplete>
        <ClockComponent />
      </BodyTemplete>
    </>
  );
}
export default MainPage;
