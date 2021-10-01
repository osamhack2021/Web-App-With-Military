import React from "react";
import {
  Switch,
  Route
} from "react-router-dom";
import Auth from './hoc/auth';
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainPage from "./pages/MainPage";
import TimerPage from "./pages/TimerPage";
import ReportPage from "./pages/ReportPage";

const App = () => {
  return(
    <>
      {/*
        A <Switch> looks through all its children <Route>
        elements and renders the first one whose path
        matches the current URL. Use a <Switch> any time
        you have multiple routes, but you want only one
        of them to render at a time
      */}
      <Switch>
        {/* 각 페이지마다 유저 인증 -> hoc 사용
        <Route exact path="/" component={Auth(LandingPage, true)} />
        <Route exact path="/login" component={Auth(LoginPage, false)} />
        <Route exact path="/register" component={Auth(RegisterPage, false)} />
        <Route exact path="/main" component={Auth(MainPage, false)} />
        <Route exact path="/timer" component={Auth(TimerPage, false)} />
        <Route exact path="/report" component={Auth(ReportPage, false)} /> 
        */}
        {/* <Route exact path="/" component={LandingPage} /> */}
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        {/* <Route exact path="/main" component={MainPage} />
        <Route exact path="/timer" component={TimerPage} />
        <Route exact path="/report" component={ReportPage} /> */}
      </Switch>
    </>
  )
}

export default App;
