import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import Auth from './hoc/auth';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainPage from './pages/MainPage';
import TimerPage from './pages/TimerPage';
import SearchPage from './pages/SearchPage';
import UploadPage from './pages/UploadPage';
import StudyGroupMainPage from './pages/StudyGroupMainPage';
import PCMainPage from './pages/PCMainPage';
import PCSearchPage from './pages/PCSearchPage';
import PCUserProfilePage from './pages/PCUserProfilePage';
import PCStudyGroupMainPage from './pages/PCStudyGroupMainPage';
import PCRegisterPage from './pages/PCRegisterPage';
import PCCreateStudyGroupPage from './pages/PCCreateStudyGroupPage';

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

      <Route exact path="/pcmain" component={PCMainPage} />
      <Route exact path="/pcsearch" component={PCSearchPage} />
      <Route exact path="/pcuserprofile" component={PCUserProfilePage} />
      <Route exact path="/pcstudygroup" component={PCStudyGroupMainPage} />
      <Route exact path="/pcregister" component={PCRegisterPage} />
      <Route exact path="/pccreatestudygroup" component={PCCreateStudyGroupPage} />
    </Switch>
  </>
);

export default App;
