import React, { useEffect, useState, useContext } from "react";
import styled, { css } from "styled-components";
import { useLocation } from "react-router-dom";
import GameContext from "../../context/game/gameContext";

function Game() {
  const location = useLocation();
  const gameContext = useContext(GameContext);
  const games = gameContext.games;

  const [game, setGame] = useState({});

  useEffect(() => {
    getGame();
    scrollToTop();
  }, []);

  const getGame = async () => {
    console.log(location.state.gameTitle);
    let gamesArray = { games };
    gamesArray = gamesArray.games;
    let game = await gamesArray.filter(
      (game) => game.title === location.state.gameTitle
    );
    game = game[0];
    setGame(game);
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  if (game != undefined) {
    return (
      <GameBackground image={game.img}>
        <GameStyle>
          <GameImg src={game.img} alt="" />
          <GameTitle>{game.title}</GameTitle>
          <GameSummary>{game.summary}</GameSummary>
          <GamePlatform>{game.platform}</GamePlatform>
          <GameDate>{game.date}</GameDate>
          <Followers>Followers</Followers>
          <Comments>Comments</Comments>
        </GameStyle>
      </GameBackground>
    );
  } else {
    getGame();
    return <div>12</div>;
  }
}

const GameBackground = styled.div`
  position: absolute;
  left: 0;
  top: 5rem;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -6;
    background-image: url(${(props) => props.image});
    background-repeat: repeat;
    background-size: cover;
    filter: blur(50px);
  }
`;

const GameStyle = styled.div`
  max-width: 1200px;
  margin: 10rem auto;
  min-height: 26rem;
  display: grid;
  grid-template-columns: 30% 40% repeat(2, 1fr);
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
const GameTitle = styled.h1`
  grid-row: 1/2;
  grid-column: 2/3;
  font-size: 2.2rem;
  font-weight: 700;
  justify-self: center;
  align-self: start;
  padding: 1.5rem 1.5px;
  letter-spacing: 3px;
  text-align: center;
`;

const GameSummary = styled.div`
  grid-row: 2/3;
  grid-column: 2/3;
  font-size: 1.5rem;
  font-weight: 300;
  justify-self: center;
  align-self: center;
  padding: 1rem 2rem;
`;

const GamePlatform = styled.div`
  grid-row: 1/2;
  grid-column: 3/4;
  justify-self: center;
  align-self: center;
  font-size: 1.6rem;
  font-weight: 600;
  text-align: center;
`;

const GameDate = styled.div`
  grid-row: 1/2;
  grid-column: 4/5;
  justify-self: center;
  align-self: center;
  font-size: 1.6rem;
  font-weight: 600;
  text-align: center;
`;
const Followers = styled.div`
  grid-row: 2/3;
  grid-column: 3/4;
  justify-self: center;
  align-self: start;
  font-size: 2.3rem;
  font-weight: 600;
  margin-top: 3rem;
`;
const Comments = styled.div`
  grid-row: 2/3;
  grid-column: 4/5;
  justify-self: center;
  align-self: start;
  font-size: 2.3rem;
  font-weight: 600;
  margin-top: 3rem;
`;

export default Game;
