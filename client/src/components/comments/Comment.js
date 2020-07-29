import React, { useState, useEffect, useContext, Fragment } from "react";
import axios from "axios";
import styled, { css } from "styled-components";

const Comment = ({ comment }) => {
  const { comment_id } = comment;
  const [comments, setComments] = useState([]);
  const [showReplies, setShowReplies] = useState(true);

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

  const hideReplies = () => {
    setShowReplies(false);
  };

  const showRepliesOnClick = () => {
    setShowReplies(true);
  };
  console.log(comments.length);
  return (
    <CommentStyle>
      <CommentSection>
        <CommentText>{comment.comment_text}</CommentText>
        <CommentDate>{comment.comment_date}</CommentDate>
        {comments.length > 0 && !showReplies && (
          <ShowRepliesButton onClick={showRepliesOnClick}>
            Show Replies
          </ShowRepliesButton>
        )}
        <CommentUser>{comment.user.name}</CommentUser>
      </CommentSection>
      {comments.length > 0 && showReplies && (
        <Replies>
          <HideCommentBar onClick={hideReplies}></HideCommentBar>
          <ReplySpacer></ReplySpacer>
          <ReplySection>
            {comments.map((comment) => (
              <Comment key={comment.comment_id} comment={comment}></Comment>
            ))}
          </ReplySection>
        </Replies>
      )}
    </CommentStyle>
  );
};

const CommentStyle = styled.div`
  display: grid;
  grid-template-rows: max-content;
  grid-template-columns: 1fr;
  align-items: center;
  color: var(--font-color-white);
  font-size: 1.6rem;
  font-weight: 400;
  gap: 1rem;
`;

const CommentSection = styled.div`
  grid-row: 1/2;
  grid-column: 1/-1;
  display: grid;
  grid-template-rows: 1fr max-content;
  grid-template-columns: max-content 60% 1fr;
  align-items: center;
  color: var(--font-color-white);
  background-color: var(--dark-color);
  padding: 0.6rem 0px;
  margin: 0rem 0px;
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
  grid-column: 1/3;
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

const ShowRepliesButton = styled.div`
  grid-row: 2/3;
  grid-column: 2/3;
  margin-left: 4rem;
  font-weight: 600;
  font-size: 1.2rem;
  justify-self: start;
  cursor: pointer;
  color: var(--primary-color);
`;

const CommentUser = styled.div`
  grid-row: 1/3;
  grid-column: 3/4;
  justify-self: end;
  margin-right: 2rem;
`;

const Replies = styled.div`
  grid-row: 2/3;
  grid-column: 1/-1;
  display: grid;
  grid-template-columns: 4px 3rem 1fr;
`;

const HideCommentBar = styled.div`
  background-color: var(--dark-color);
  grid-column: 1/2;
  width: 100%;
  cursor: pointer;
  transition: 0.1s all ease-out;

  &:hover {
    background-color: var(--primary-color);
  }
`;

const ReplySpacer = styled.div``;

const ReplySection = styled.div`
  display: grid;
  gap: 1rem;
`;

export default Comment;
