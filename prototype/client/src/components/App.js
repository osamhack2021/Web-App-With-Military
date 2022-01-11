import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
import CssBaseline from '@mui/material/CssBaseline';
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";

import Footer from "./views/Footer/Footer"
import UserPage from "./views/UserPage/UserPage"
import GroupPage from "./views/GroupPage/GroupPage"
import SearchResult from "./views/Search/SearchResult"
import Search from "./views/Search/Search"
import RankingPage from "./views/RankingPage/RankingPage"
import CreateGroupPage from "./views/CreateGroupPage/CreateGroupPage"

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <CssBaseline />
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/users/:userId" component={Auth(UserPage, null)} />
          <Route exact path="/groups/:groupId" component={Auth(GroupPage, null)} />
	      <Route exact path="/search/" component={Auth(Search, null)} />
          <Route exact path="/search/:searchData" component={Auth(SearchResult, null)} />
	      <Route exact path="/ranking/:target" component={Auth(RankingPage, null)} />
		  <Route exact path="/group/create" component={Auth(CreateGroupPage, true)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
