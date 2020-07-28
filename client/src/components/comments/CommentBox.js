import React, { useState, useContext } from "react";
import styled, { css } from "styled-components";
import axios from "axios";
import AuthContext from "../../context/auth/authContext";
import GameContext from "../../context/game/gameContext";
import { useHistory } from "react-router-dom";

const CommentBox = () => {
  const authContext = useContext(AuthContext);
  const gameContext = useContext(GameContext);
  const history = useHistory();

  const [comment, setComment] = useState({
    commentText: "",
  });

  const { commentText } = comment;

  const onChange = (e) => {
    if (!authContext.isAuthenticated) {
      history.push("/login");
    }
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (commentText === "") {
      e.preventDefault();
      return;
    }

    const payload = {
      user_account_id: authContext.user.user_account_id,
      game_id: gameContext.selectedGame.game_id,
      comment_text: commentText,
    };
    try {
      const res = await axios.post(
        "http://localhost:5000/api/comments",
        payload,
        config
      );
    } catch (err) {
      console.log(err);
    }

    e.preventDefault();
  };

  const submitButton = (
    <CommentBoxSubmit type="submit" value="+"></CommentBoxSubmit>
  );

  return (
    <CommentBoxStyle>
      <CommentBoxStyleForm onSubmit={onSubmit} id="commentForm">
        <CommentBoxInput
          name="commentText"
          placeholder="Your comment..."
          form="commentForm"
          type="text"
          value={commentText}
          onChange={onChange}
        ></CommentBoxInput>
        {commentText && submitButton}
      </CommentBoxStyleForm>
    </CommentBoxStyle>
  );
};

const CommentBoxStyle = styled.div`
  display: grid;
  min-height: 10rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: var(--font-color-white);
  background-color: var(--dark-color);
  font-size: 1.6rem;
  font-weight: 400;
  padding: 1rem 1.5rem;
  border-style: none;
  border-radius: 0.6rem;
  border-bottom: 0px solid var(--primary-color);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.4);

  cursor: text;
  transition: all 0.15s ease-out;

  &:hover {
    border-bottom: 3px solid var(--primary-color);
  }
  &:active {
    border-bottom: 3px solid var(--primary-color);
  }
`;

const CommentBoxStyleForm = styled.form`
  display: grid;
  grid-template-columns: 1fr max-content;
`;

const CommentBoxInput = styled.textarea`
  width: 100%;
  height: 100%;
  border-style: none;
  color: var(--font-color-white);
  background-color: var(--dark-color);
  font-size: 1.6rem;
  font-weight: 400;
  word-wrap: normal;
  resize: none;
  outline: none;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const CommentBoxSubmit = styled.input`
  border-style: none;
  width: max-content;
  height: max-content;
  color: var(--font-color-white);
  background-color: var(--primary-color);
  align-self: end;
  font-size: 1.4rem;
  text-transform: uppercase;
  font-weight: 700;
  padding: 0.7rem 1.2rem;
  word-wrap: normal;
  border-radius: 200px;
  resize: none;
  outline: none;
  cursor: pointer;
  transition: all 0.15s ease-out;

  &:hover {
    transform: translateY(-3px);
  }

  &:active {
    transform: translateY(-1px);
  }
`;

export default CommentBox;
