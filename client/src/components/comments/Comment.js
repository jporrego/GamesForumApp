import React from "react";
import styled, { css } from "styled-components";

const Comment = ({ comment }) => {
  console.log({ comment });
  return (
    <CommentStyle>
      <CommentText>{comment.comment_text}</CommentText>
      <CommentDate>{comment.comment_date}</CommentDate>
      <CommentUser></CommentUser>
    </CommentStyle>
  );
};

const CommentStyle = styled.div`
  display: grid;
  grid-template-rows: 1fr max-content;
  color: var(--font-color-white);
  background-color: var(--dark-color);
  font-size: 1.6rem;
  font-weight: 400;
  padding: 2rem 1rem;
`;

const CommentText = styled.div`
  margin-left: 2.5rem;
`;

const CommentDate = styled.div`
  margin-left: 2.5rem;
`;

const CommentUser = styled.div``;

export default Comment;
