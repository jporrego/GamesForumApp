import React, { useReducer } from "react";
import GameContext from "./gameContext";
import GameReducer from "./gameReducer";
import { GET_GAMES, SET_SELECTED_GAME } from "../types";
import axios from "axios";

const GameState = (props) => {
  const initialState = {
    games: [],
    selectedGame: null,
  };

  const [state, dispatch] = useReducer(GameReducer, initialState);

  // GET_GAMES
  const getGames = async () => {
    const res = await axios.get("http://localhost:5000/api/games");
    dispatch({ type: GET_GAMES, payload: res.data });
  };

  // SET_SELECTED_GAME
  const setSelectedGame = (game_id) => {
    dispatch({ type: SET_SELECTED_GAME, payload: game_id });
  };

  return (
    <GameContext.Provider
      value={{
        games: state.games,
        selectedGame: state.selectedGame,
        getGames,
        setSelectedGame,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};

export default GameState;
