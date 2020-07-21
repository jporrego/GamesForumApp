import React from "react";
import styled, { css } from "styled-components";

function GameItem({ game: { title, summary, img, platform, date } }) {
  const gameTitleLength = 25;
  let gameTitleText;
  if (title.length <= gameTitleLength) {
    gameTitleText = title;
  } else {
    gameTitleText = title.substring(0, gameTitleLength).trim() + "...";
  }

  return (
    <GameItemStyle>
      <GameImgContainer>
        <GameImg src={img} alt="Thumbnail" />
      </GameImgContainer>
      <GameTitle>{gameTitleText}</GameTitle>
      <GameSummary>{summary.substring(0, 80).trim() + "..."}</GameSummary>
      <GamePlatform>{platform}</GamePlatform>
      <GameDate>{date}</GameDate>
      <div>5</div>
      <div>520</div>
    </GameItemStyle>
  );
}

const GameItemStyle = styled.div`
  display: grid;
  grid-template-columns: 10% 20% repeat(5, 1fr);
  grid-template-rows: 1fr;
  background-color: var(--dark-color);
  color: var(--font-color-white);
  overflow: hidden;

  &:hover {
  }
`;

const GameImgContainer = styled.div`
  display: grid;
  height: 100%;
  width: 100%;
  grid-column: 1/2;
  background-color: red;
  overflow: hidden;
`;

const GameImg = styled.img`
  width: 100%;
  height: auto;
  justify-self: center;
  align-self: center;
`;
const GameTitle = styled.div`
  grid-column: 2/3;
  font-size: 1.2rem;
  font-weight: 500;
  padding: 0px 0px 0px 2rem;
  justify-self: start;
  align-self: center;
`;
const GameSummary = styled.div`
  grid-column: 3/4;
  align-self: center;
  justify-self: center;
  font-size: 10px;
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
