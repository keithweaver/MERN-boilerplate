import React, { useState } from "react";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Home from "./../Home/Home";
import SignIn from "./../Registration/SignIn";
import SignUp from "./../Registration/SignUp";

import "./../../styles/styles.scss";
import { UserContext } from "./../../context/UserContext";

// import Header from "../Header/Header";
// import Footer from "../Footer/Footer";

const App = () => {
  const [user, setUser] = useState("");

  return (
    // <Header />
    <Router>
      <Switch>
        <UserContext.Provider value={{ user, setUser }}>
          <Route exact path="/" component={Home} />
          <Route path="/signIn" component={SignIn} />
          <Route path="/signUp" component={SignUp} />
        </UserContext.Provider>
      </Switch>
    </Router>
    // <Footer />
  );
};

export default App;
