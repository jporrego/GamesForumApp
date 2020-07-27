import React, { useReducer } from "react";
import GameContext from "./gameContext";
import GameReducer from "./gameReducer";
import { GET_GAMES, SET_SELECTED_GAME, CLEAR_SELECTED_GAME } from "../types";
import axios from "axios";

const GameState = (props) => {
  const initialState = {
    games: [],
    selectedGame: JSON.parse(localStorage.getItem("selectedGameLocalStorage")),
  };

  const [state, dispatch] = useReducer(GameReducer, initialState);

  // GET_GAMES
  const getGames = async () => {
    const res = await axios.get("http://localhost:5000/api/games");
    dispatch({ type: GET_GAMES, payload: res.data });
  };

  // SET_SELECTED_GAME
  const setSelectedGame = (game_id) => {
    localStorage.setItem("selectedGameLocalStorage", JSON.stringify(game_id));
    dispatch({ type: SET_SELECTED_GAME, payload: game_id });
  };

  // CLEAR_SELECTED_GAME
  const clearSelectedGame = () => {
    localStorage.removeItem("selectedGameLocalStorage");
    dispatch({ type: CLEAR_SELECTED_GAME });
  };

  return (
    <GameContext.Provider
      value={{
        games: state.games,
        selectedGame: state.selectedGame,
        getGames,
        setSelectedGame,
        clearSelectedGame,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};

export default GameState;
