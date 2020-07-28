import React, { useState, useEffect, useContext } from "react";
import styled, { css } from "styled-components";
import Comment from "./Comment";
import CommentBox from "./CommentBox";
import GameContext from "../../context/game/gameContext";
import axios from "axios";

const Comments = () => {
  const gameContext = useContext(GameContext);
  const [comments, setComments] = useState();

  useEffect(() => {
    getComments();
  }, []);

  const getComments = async () => {
    const payload = gameContext.selectedGame.game_id;

    const res = await axios.get("http://localhost:5000/api/comments/", {
      params: {
        game_id: payload,
      },
    });
    setComments(res.data);
  };

  if (!comments) {
    return <div>Spinner</div>;
  }
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
      <CommentBox></CommentBox>
      <CommentSection>
        {comments.map((comment) => (
          <Comment key={comment.comment_id} comment={comment}></Comment>
        ))}
      </CommentSection>
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
  border-bottom: 1px solid var(--dark-color);
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

const CommentSection = styled.div`
  display: grid;
  gap: 1.5rem;
  margin-top: 1rem;
`;

export default Comments;
