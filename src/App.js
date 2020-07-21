import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
import Games from "./components/games/Games";
import GamesFilter from "./components/games/GamesFilter";
import axios from "axios";
import "./App.css";

class App extends Component {
  state = {
    games: [],
  };

  async componentDidMount() {
    const res = await axios.get("./scraper/games.json");
    this.setState({ games: res.data });
  }

  render() {
    const games = this.state.games;

    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <GamesFilter></GamesFilter>
          <Games games={games} />
        </div>
      </div>
    );
  }
}

export default App;
