import React from "react";
import styled, { css } from "styled-components";
import { NavLink, Link, useHistory } from "react-router-dom";

function GameItem({ game, game: { title, summary, img, platform, date } }) {
  const gameTitleLength = 25;
  let gameTitleText;
  if (title.length <= gameTitleLength) {
    gameTitleText = title;
  } else {
    gameTitleText = title.substring(0, gameTitleLength).trim() + "...";
  }

  const history = useHistory();

  function goToGamePage(e) {
    e.preventDefault();
    history.push("/" + title);
  }

  return (
    <GameItemStyle onClick={goToGamePage}>
      <GameImgContainer>
        <GameImg src={img} alt="Thumbnail" />
      </GameImgContainer>
      <GameTitle>{gameTitleText}</GameTitle>
      <GameSummary>{summary.substring(0, 80).trim() + "..."}</GameSummary>
      <GamePlatform>{platform}</GamePlatform>
      <GameDate>{date}</GameDate>
      <div>5</div>
      <div>5</div>
    </GameItemStyle>
  );
}
const GameTitle = styled.div`
  grid-column: 2/3;
  font-size: 1.4rem;
  font-weight: 600;
  padding: 0px 0px 0px 2rem;
  justify-self: start;
  align-self: center;
  transition: all 0.15s ease-out;
`;

const GameItemStyle = styled.div`
  display: grid;
  grid-template-columns: 10% 20% repeat(5, 1fr);
  grid-template-rows: 1fr;
  background-color: var(--bg-color-light);
  color: var(--font-color-white);
  border-radius: 0.6rem;
  box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.13),
    -4px -4px 6px rgba(255, 255, 255, 0.04);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.15s ease-out;

  &:hover {
    background-color: var(--primary-color);
  }
  &:hover ${GameTitle} {
  }
`;

const GameImgContainer = styled.div`
  display: grid;
  height: 100%;
  width: 100%;
  grid-column: 1/2;
  overflow: hidden;
  transition: all 0.3s ease-out;
  border-right: 5px solid var(--primary-color);
`;

const GameImg = styled.img`
  height: 100%;
  object-fit: cover;
  object-position: 50% 50%;
  transition: all 0.15s ease-out;
`;

const GameSummary = styled.div`
  grid-column: 3/4;
  align-self: center;
  justify-self: center;
  font-size: 1.2rem;
  font-weight: 300;
`;

const GamePlatform = styled.div`
  grid-column: 4/5;
  font-size: 1.3rem;
  font-weight: 500;
  align-self: center;
  justify-self: center;
`;

const GameDate = styled.div`
  grid-column: 5/6;
  font-size: 1.3rem;
  font-weight: 500;
  align-self: center;
  justify-self: center;
`;

export default GameItem;
