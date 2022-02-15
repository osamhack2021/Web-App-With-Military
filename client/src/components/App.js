import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
import CssBaseline from "@mui/material/CssBaseline";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer";
import MainPage from "./views/MainPage/MainPage";
import UserPage from "./views/UserPage/UserPage";
import GroupPage from "./views/GroupPage/GroupPage";
import SearchResult from "./views/Search/SearchResult";
import Search from "./views/Search/Search";
import RankingPage from "./views/RankingPage/RankingPage";
import CreateGroupPage from "./views/CreateGroupPage/CreateGroupPage";
import UserGroupPage from "./views/UserGroupPage/UserGroupPage";
//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CssBaseline />
      <Switch>
        <Route exact path="/main" component={NavBar} />
        <Route exact path="/login" component={NavBar} />
        <Route exact path="/register" component={NavBar} />
        <Route exact path="/users/:userId" component={NavBar} />
        <Route exact path="/groups/:groupId" component={NavBar} />
        <Route exact path="/search/" component={NavBar} />
        <Route exact path="/search/:searchData" component={NavBar} />
        <Route exact path="/ranking/:target" component={NavBar} />
        <Route exact path="/group/create" component={NavBar} />
        <Route exact path="/users/:userId/mygroups" component={NavBar} />
      </Switch>

      <Switch>
        <Route exact path="/" component={Auth(LandingPage, null)} />
        <Route exact path="/main" component={Auth(MainPage, true)} />
        <Route exact path="/login" component={Auth(LoginPage, false)} />
        <Route exact path="/register" component={Auth(RegisterPage, false)} />
        <Route exact path="/users/:userId" component={Auth(UserPage, null)} />
        <Route
          exact
          path="/groups/:groupId"
          component={Auth(GroupPage, null)}
        />
        <Route exact path="/search/" component={Auth(Search, null)} />
        <Route
          exact
          path="/search/:searchData"
          component={Auth(SearchResult, null)}
        />
        <Route
          exact
          path="/ranking/:target"
          component={Auth(RankingPage, null)}
        />
        <Route
          exact
          path="/group/create"
          component={Auth(CreateGroupPage, true)}
        />
        <Route
          exact
          path="/users/:userId/mygroups"
          component={Auth(UserGroupPage, true)}
        />
      </Switch>
    </Suspense>
  );
}

export default App;
