import React, { Component } from "react";

export class Game extends Component {
  componentDidMount() {
    console.log(this.props.match.params.title);
  }

  render() {
    return <div></div>;
  }
}

export default Game;
