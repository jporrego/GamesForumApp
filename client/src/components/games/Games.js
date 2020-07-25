import React, { useState, useContext } from "react";
import GameItem from "./GameItem";
import GameContext from "../../context/game/gameContext";

const Games = () => {
  const gameContext = useContext(GameContext);
  const games = gameContext.games;

  return (
    <div style={gamesStyle}>
      {games.map((game) => (
        <GameItem game={game}></GameItem>
      ))}
    </div>
  );
};

const gamesStyle = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gridAutoRows: "6rem",
  gridGap: "1.5rem",
};

export default Games;
