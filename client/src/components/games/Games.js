import React from "react";
import GameItem from "./GameItem";

function Games({ games }) {
  return (
    <div style={gamesStyle}>
      {games.map((game) => (
        <GameItem key={game.key} game={game} />
      ))}
    </div>
  );
}

const gamesStyle = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gridAutoRows: "6rem",
  gridGap: "1.5rem",
};

export default Games;
