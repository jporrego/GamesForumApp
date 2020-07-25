import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import Game from "./components/games/Game";
import axios from "axios";
import "./App.css";

import GameState from "./context/game/GameState";

const App = () => {
  return (
    <GameState>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/:title">
                <Game></Game>
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </GameState>
  );
};

export default App;
