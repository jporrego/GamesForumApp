import React from "react";
import styled, { css } from "styled-components";

const CommentBox = () => {
  return (
    <CommentBoxStyle>
      <CommentBoxStyleForm id="commentForm">
        <CommentBoxInput
          name="commentBox"
          placeholder="Your comment..."
          form="commentForm"
          type="text"
        ></CommentBoxInput>
        <CommentBoxSubmit type="submit" value="+"></CommentBoxSubmit>
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
`;

export default CommentBox;
