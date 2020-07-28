import React from "react";
import styled, { css } from "styled-components";

function GamesFilter() {
  return (
    <GamesFilterStyle>
      <div>Game Title</div>
      <div>Release Date</div>
      <div>Followers</div>
      <div>Comments</div>
    </GamesFilterStyle>
  );
}

const GamesFilterStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 3rem;
  justify-items: center;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  color: white;
  font-size: 1.4rem;
  text-transform: uppercase;
  margin-top: 6rem;
  margin-bottom: 2rem;
`;

export default GamesFilter;
