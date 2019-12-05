import React from "react";
import { render } from "react-dom";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import App from "./components/App/App";

import Home from "./components/Home/Home";
import SignIn from "./components/Registration/SignIn";
import SignUp from "./components/Registration/SignUp";

import "./styles/styles.scss";

render(
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signIn" component={SignIn} />
        <Route path="/signUp" component={SignUp} />
      </Switch>
    </App>
  </Router>,
  document.getElementById("app")
);
