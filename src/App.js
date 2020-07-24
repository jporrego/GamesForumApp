import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import Games from "./components/games/Games";
import Game from "./components/games/Game";
import GamesFilter from "./components/games/GamesFilter";
import axios from "axios";
import "./App.css";

class App extends Component {
  state = {
    games: [],
    game: {},
  };

  async componentDidMount() {
    const res = await axios.get("./scraper/games_v2.json");
    this.setState({ games: res.data });
  }

  render() {
    const games = this.state.games;

    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Home games={games} />
              </Route>
              <Route exact path="/:title">
                <Game games={this.state.games}></Game>
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
