import React from "react";
import Game from "./Game";

function Games() {
  return (
    <div style={gamesStyle}>
      <Game />
      <Game />
      <Game />
    </div>
  );
}

const gamesStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1rem",
};

export default Games;
