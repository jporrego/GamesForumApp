import React, { useState, useEffect, useContext } from "react";
import styled, { css } from "styled-components";
import Comment from "./Comment";
import GameContext from "../../context/game/gameContext";
import axios from "axios";

const Comments = ({ gameId }) => {
  const gameContext = useContext(GameContext);
  const [comments, setComments] = useState({});

  useEffect(() => {
    getComments();
  }, [gameContext.selectedGame]);

  const getComments = async () => {
    if (gameContext.selectedGame) {
      console.log(gameContext.selectedGame.game_id);
      const comments = await axios.get("http://localhost:5000/api/comments");
    }
  };

  return (
    <CommentsStyle>
      <CommentsFilter>
        <CommentsFilterTitle>Latest</CommentsFilterTitle>
        <CommentsFilterSelector>
          <form id="comments_form">
            <select name="comments-filter">
              <option value="latest">Latest</option>
              <option value="best">Best</option>
            </select>
          </form>
        </CommentsFilterSelector>
      </CommentsFilter>

      <Comment></Comment>
    </CommentsStyle>
  );
};

const CommentsStyle = styled.div`
  display: grid;
  grid-template-rows: max-content 1fr;
  margin-top: 10rem;
`;

const CommentsFilter = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  color: var(--font-color-white);
  background-color: red;
  padding: 0px 1rem;
`;

const CommentsFilterTitle = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  justify-self: start;
`;

const CommentsFilterSelector = styled.div`
  font-size: 2rem;
  justify-self: end;
`;

export default Comments;
