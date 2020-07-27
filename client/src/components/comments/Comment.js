import React from "react";
import styled, { css } from "styled-components";

const Comment = ({ comment }) => {
  console.log({ comment });
  return (
    <CommentStyle>
      <div>{comment.comment_text}</div>
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

export default Comment;
