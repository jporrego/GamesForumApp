import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import Profile from "./components/pages/Profile";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import Game from "./components/games/Game";
import axios from "axios";
import "./App.css";

import AuthState from "./context/auth/AuthState";
import GameState from "./context/game/GameState";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <GameState>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route exact path="/profile">
                  <Profile></Profile>
                </Route>
                <Route exact path="/login">
                  <Login></Login>
                </Route>
                <Route exact path="/register">
                  <Register></Register>
                </Route>
                <Route exact path="/:title">
                  <Game></Game>
                </Route>
              </Switch>
            </div>
          </div>
        </Router>
      </GameState>
    </AuthState>
  );
};

export default App;
