import { GET_GAMES, SET_SELECTED_GAME } from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_GAMES:
      return {
        ...state,
        games: action.payload,
      };
    case SET_SELECTED_GAME:
      return {
        ...state,
        selectedGame: action.payload,
      };
    default:
      return state;
  }
};
