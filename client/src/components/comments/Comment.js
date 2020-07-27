import React from "react";
import styled, { css } from "styled-components";

const Comment = ({ comment }) => {
  console.log({ comment });
  return (
    <CommentStyle>
      <CommentText>{comment.comment_text}</CommentText>
      <CommentDate>{comment.comment_date}</CommentDate>
      <CommentUser>{comment.user.name}</CommentUser>
    </CommentStyle>
  );
};

const CommentStyle = styled.div`
  display: grid;
  grid-template-rows: 1fr max-content;
  grid-template-columns: 80% 1fr;
  align-items: center;
  color: var(--font-color-white);
  background-color: var(--dark-color);
  font-size: 1.6rem;
  font-weight: 400;
  padding: 0.8rem 0px;
  border-radius: 0.6rem;
  border-bottom: 0px solid var(--primary-color);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.4);
  cursor: pointer;
  transition: all 0.15s ease-out;

  &:hover {
    border-bottom: 3px solid var(--primary-color);
    transform: translateY(-3px);
  }
`;

const CommentText = styled.div`
  grid-row: 1/2;
  grid-column: 1/2;
  margin-left: 4rem;
`;

const CommentDate = styled.div`
  grid-row: 2/3;
  grid-column: 1/2;
  margin-left: 4rem;
  font-weight: 600;
  font-size: 1.2rem;
  color: var(--font-color-grey);
`;

const CommentUser = styled.div`
  grid-row: 1/3;
  grid-column: 2/3;
  margin-right: 2.5rem;
  justify-self: end;
`;

export default Comment;
