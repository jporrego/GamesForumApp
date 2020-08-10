import React, { useState, useEffect } from "react";
import axios from "axios";
import styled, { css } from "styled-components";
import Reply from "./Reply";
import Likes from "./Likes";

const Comment = ({ comment }) => {
  const { comment_id } = comment;

  const [comments, setComments] = useState([]);
  const [showReplies, setShowReplies] = useState(true);
  const [addReply, setAddReply] = useState(false);
  const [numOfReplies, setNumOfReplies] = useState(0);

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
    setNumOfReplies(res.data.length);
    setComments(res.data);
  };

  const hideReplies = () => {
    setShowReplies(false);
  };

  const showRepliesOnClick = () => {
    setShowReplies(true);
  };

  const addReplyOnClick = () => {
    setAddReply(true);
  };

  const hideReplyOnClick = () => {
    setAddReply(false);
  };

  return (
    <CommentStyle>
      {/* Comment Section */}
      <CommentSection>
        <Likes comment={comment}></Likes>
        <CommentText>{comment.comment_text}</CommentText>
        <CommentDate>{comment.comment_date}</CommentDate>
        <MakeReply onClick={addReplyOnClick}>Reply</MakeReply>
        {numOfReplies > 0 ? (
          <RepliesButtonActive onClick={showRepliesOnClick} numOfReplies>
            {numOfReplies} {numOfReplies === 1 ? "Reply" : "Replies"}
          </RepliesButtonActive>
        ) : (
          <RepliesButtonGrey onClick={showRepliesOnClick} numOfReplies>
            {numOfReplies} {numOfReplies === 1 ? "Reply" : "Replies"}
          </RepliesButtonGrey>
        )}

        <CommentUser>
          {comment.user.name}
          <img
            src={
              comment.user.profile_pic
                ? require(`../../img/${comment.user.profile_pic}`)
                : require("../../img/default_profile_pic.png")
            }
            alt="profilepic"
          />
        </CommentUser>
      </CommentSection>
      {/* Reply Section */}
      {addReply && (
        <Reply
          comment={comment}
          getComments={getComments}
          hideReplyOnClick={hideReplyOnClick}
        ></Reply>
      )}
      {/* Replies Section */}
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
  display: grid;
  grid-template-rows: 1fr max-content;
  grid-template-columns: 5rem 4rem 6rem 60% 1fr;
  color: var(--font-color-white);
  background-color: var(--dark-color);
  padding: 1rem 0px;
  margin: 0rem 0px;
  font-size: 1.6rem;
  font-weight: 400;
  border-radius: 0.6rem;
  border-right: 0px solid var(--primary-color);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.4);
  transition: all 0.12s ease-out;

  &:hover {
    /*border-right: 5px solid var(--primary-color);*/
  }
`;

const CommentText = styled.div`
  grid-row: 1/2;
  grid-column: 2/5;
  justify-self: start;
  align-self: start;
  max-width: 100%;
`;

const CommentDate = styled.div`
  grid-row: 2/3;
  grid-column: 4/5;
  margin-left: 1rem;
  font-weight: 600;
  font-size: 1.2rem;
  color: var(--font-color-grey);
`;

const MakeReply = styled.div`
  grid-row: 2/3;
  grid-column: 2/3;
  font-weight: 600;
  font-size: 1.2rem;
  justify-self: start;
  cursor: pointer;
  color: var(--font-color-grey);

  &:hover {
    color: var(--red-color);
  }
`;

const RepliesButtonGrey = styled.div`
  grid-row: 2/3;
  grid-column: 3/4;
  font-weight: 600;
  font-size: 1.2rem;
  justify-self: center;
  cursor: pointer;
  color: var(--font-color-grey);
`;

const RepliesButtonActive = styled.div`
  grid-row: 2/3;
  grid-column: 3/4;
  font-weight: 600;
  font-size: 1.2rem;
  justify-self: center;
  cursor: pointer;
  color: var(--primary-color);
`;

const CommentUser = styled.div`
  grid-row: 1/3;
  grid-column: 5/6;
  display: flex;
  align-items: center;
  justify-self: end;
  margin-right: 2rem;
  font-size: 1.3rem;

  & img {
    height: 4.5rem;
    width: 4.5rem;
    margin-bottom: 1rem;
    border-radius: 50%;
    object-fit: cover;
    margin-left: 2rem;
  }
`;

const Replies = styled.div`
  grid-row: 3/4;
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
