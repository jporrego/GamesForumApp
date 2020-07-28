import React, { useEffect, useContext } from "react";
import AuthContext from "../../context/auth/authContext";
import Games from "../games/Games";
import GamesFilter from "../games/GamesFilter";

import GameContext from "../../context/game/gameContext";
import setAuthToken from "../../utils/setAuthToken";

function Home({ games }) {
  const gameContext = useContext(GameContext);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    gameContext.getGames();
    authContext.loadUser();
  }, []);

  return (
    <div>
      <GamesFilter></GamesFilter>
      <Games />
    </div>
  );
}

export default Home;
