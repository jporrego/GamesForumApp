import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
import Games from "./components/games/Games";
import axios from "axios";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Games />
        </div>
      </div>
    );
  }
}

export default App;
