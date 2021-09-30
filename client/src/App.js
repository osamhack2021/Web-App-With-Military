import React from "react";
import {Route} from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TimerPage from "./pages/TimerPage";
import ReportPage from "./pages/ReportPage";
import MainPage from "./pages/MainPage";


const App = () => {
  return(
    <>
      <Route path="/" exact>test</Route>
      <Route component={LoginPage} path="/login" />
      <Route component={RegisterPage} path="/register" />
      <Route component={ReportPage} path="/report" />
      <Route component={TimerPage} path="/timer" />
      <Route component={MainPage} path="/main" />
    </>
  )
}

export default App;
