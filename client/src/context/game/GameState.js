import React, { useReducer } from "react";
import GameContext from "./gameContext";
import GameReducer from "./gameReducer";
import { GET_GAMES } from "../types";
import axios from "axios";

const GameState = (props) => {
  const initialState = {
    games: [],
  };

  const [state, dispatch] = useReducer(GameReducer, initialState);

  // GET_GAMES
  const getGames = async () => {
    const res = await axios.get("http://localhost:5000/api/games");
    console.log(res.data);
    dispatch({ type: GET_GAMES, payload: res.data });
  };

  return (
    <GameContext.Provider
      value={{
        games: state.games,
        getGames,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};

export default GameState;
