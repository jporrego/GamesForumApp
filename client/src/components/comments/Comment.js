import React, { useState, useEffect, useContext, Fragment } from "react";
import axios from "axios";
import styled, { css } from "styled-components";

const Comment = ({ comment }) => {
  const { comment_id } = comment;
  const [comments, setComments] = useState();

  useEffect(() => {
    getComments();
  }, []);

  const getComments = async () => {
    const payload = comment_id;

    const res = await axios.get("http://localhost:5000/api/comments/", {
      params: {
        comment_id: payload,
      },
    });
    setComments(res.data);
  };

  return (
    <CommentStyle>
      <CommentSection>
        <CommentText>{comment.comment_text}</CommentText>
        <CommentDate>{comment.comment_date}</CommentDate>
        <CommentUser>{comment.user.name}</CommentUser>
      </CommentSection>
      {comments && (
        <Replies>
          <Fragment>
            {comments.map((comment) => (
              <Comment key={comment.comment_id} comment={comment}></Comment>
            ))}
          </Fragment>
        </Replies>
      )}
    </CommentStyle>
  );
};

const CommentStyle = styled.div`
  display: grid;
  grid-template-rows: max-content;
  gap: 1rem;
  grid-template-columns: 1fr;
  align-items: center;
  color: var(--font-color-white);
  font-size: 1.6rem;
  font-weight: 400;

  cursor: pointer;
`;

const CommentSection = styled.div`
  grid-row: 1/2;
  grid-column: 1/-1;
  display: grid;
  grid-template-rows: 1fr max-content;
  grid-template-columns: 80% 1fr;
  align-items: center;
  color: var(--font-color-white);
  background-color: var(--dark-color);
  font-size: 1.6rem;
  font-weight: 400;
  border-radius: 0.6rem;
  border-bottom: 0px solid var(--primary-color);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.4);
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

const Replies = styled.div`
  grid-row: 2/3;
  grid-column: 1/-1;
  padding-left: 3rem;
  border-left: 3px solid var(--dark-color);
`;

export default Comment;
