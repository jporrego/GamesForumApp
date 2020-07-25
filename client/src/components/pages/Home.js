import React from "react";
import Games from "../games/Games";
import GamesFilter from "../games/GamesFilter";

function Home({ games }) {
  return (
    <div>
      <GamesFilter></GamesFilter>
      <Games games={games} />
    </div>
  );
}

export default Home;
