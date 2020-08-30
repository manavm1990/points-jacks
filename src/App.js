import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Home, Game } from "./components";

import "./App.scss"

export const App = () => (
  <Router>
    <Route exact path="/">
      <Home />
    </Route>

    <Switch>
      <Route exact path="/game">
        <Game />
      </Route>
    </Switch>
  </Router>
);
