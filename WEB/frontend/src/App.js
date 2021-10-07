import React from 'react';
<<<<<<< HEAD
import './App.css';
import MyGroup from './MyGroup';
import StudyGroupOutline from './StudyGroupOutline';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  return (
    <div>
      <MyGroup />
    </div>
  );
}
=======
import { Switch, Route } from 'react-router-dom';
// import Auth from './hoc/auth';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainPage from './pages/MainPage';
import TimerPage from './pages/TimerPage';
import SearchPage from './pages/SearchPage';
import UploadPage from './pages/UploadPage';
// import ReportPage from './pages/ReportPage';
import StudyGroupMainPage from './pages/StudyGroupMainPage';

const App = () => (
  <>
    <Switch>
      {/* 각 페이지마다 유저 인증 -> hoc 사용
        <Route exact path="/" component={Auth(LandingPage, true)} />
        <Route exact path="/login" component={Auth(LoginPage, false)} />
        <Route exact path="/register" component={Auth(RegisterPage, false)} />
        <Route exact path="/main" component={Auth(MainPage, false)} />
        <Route exact path="/timer" component={Auth(TimerPage, false)} />
        */}
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/register" component={RegisterPage} />
      <Route exact path="/main" component={MainPage} />
      <Route exact path="/timer" component={TimerPage} />
      <Route exact path="/upload" component={UploadPage} />
      <Route exact path="/search" component={SearchPage} />
      <Route exact path="/studygroup" component={StudyGroupMainPage} />
      {/* <Route exact path="/studygroup/profile" component={StudyGroupProfilePage} /> */}
    </Switch>
  </>
);
>>>>>>> origin/frontend

export default App;
