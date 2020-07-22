import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useLocation } from "react-router-dom";

function Game({ games }) {
  const location = useLocation();

  useEffect(() => {
    getGame();
  }, []);

  const [game, setGame] = useState({});

  const getGame = async () => {
    let gamesArray = { games };
    gamesArray = gamesArray.games;
    let game = gamesArray.filter(
      (game) => game.title === location.state.gameTitle
    );
    game = game[0];
    setGame(game);
  };

  return (
    <GameStyle>
      <GameImg src={game.img} alt="" />
      <GameTitle>{game.title}</GameTitle>
      <GameSummary>{game.summary}</GameSummary>
      <div>{game.platform}</div>
      <div>{game.date}</div>
    </GameStyle>
  );
}
const GameStyle = styled.div`
  width: 100%;
  height: 26rem;
  display: grid;
  grid-template-columns: 15% 30% repeat(5, 1fr);
  grid-template-rows: max-content 1fr;
  background-color: var(--dark-color);
  border-top: 5px solid var(--primary-color);
  color: var(--font-color-white);
`;

const GameImg = styled.img`
  grid-row: 1/-1;
  height: 100%;
  object-fit: cover;
  object-position: 50% 50%;
  transition: all 0.15s ease-out;
`;
const GameTitle = styled.div`
  grid-row: 1/2;
  grid-column: 2/3;
  font-size: 2rem;
  font-weight: 600;
  justify-self: center;
  align-self: start;
`;

const GameSummary = styled.div`
  grid-row: 2/3;
  grid-column: 2/3;
  font-size: 1.3rem;
  font-weight: 300;
  justify-self: center;
  align-self: center;
`;
export default Game;
