import React, { useEffect, useContext } from "react";
import Games from "../games/Games";
import GamesFilter from "../games/GamesFilter";

import GameContext from "../../context/game/gameContext";

function Home({ games }) {
  const gameContext = useContext(GameContext);

  useEffect(() => {
    gameContext.getGames();
    //gameContext.clearSelectedGame();
  }, []);

  return (
    <div>
      <GamesFilter></GamesFilter>
      <Games />
    </div>
  );
}

export default Home;
