import React, { useState, useEffect, useContext, Fragment } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import styled, { css } from "styled-components";
import AuthContext from "../../context/auth/authContext";
import GameContext from "../../context/game/gameContext";
import Reply from "./Reply";

const Comment = ({ comment }) => {
  const authContext = useContext(AuthContext);
  const gameContext = useContext(GameContext);
  const history = useHistory();

  const { comment_id } = comment;
  const [commentReply, setCommentReply] = useState({
    commentReplyText: "",
  });
  const { commentReplyText } = commentReply;

  const [likes, setLikes] = useState(0);
  const [userLike, setUserLike] = useState("");

  const [comments, setComments] = useState([]);
  const [showReplies, setShowReplies] = useState(true);
  const [addReply, setAddReply] = useState(false);
  const [numOfReplies, setNumOfReplies] = useState(0);

  useEffect(() => {
    getComments();
    getLikes();
  }, []);

  useEffect(() => {
    getUserLike();
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

  const getLikes = async () => {
    const payload = comment_id;

    const res = await axios.get("http://localhost:5000/api/votes", {
      params: {
        comment_id: payload,
        checkIfUserVoted: false,
      },
    });

    let positive = 0;
    let negative = 0;

    for (const vote of res.data) {
      if (vote.positive_vote) {
        positive += 1;
      } else {
        negative += 1;
      }
    }

    setLikes(positive - negative);
  };

  const getUserLike = async () => {
    const id_value = comment_id;

    try {
      const currentUserLike = await axios.get(
        "http://localhost:5000/api/votes/",
        {
          params: {
            checkIfUserVoted: true,
            comment_id: id_value,
            user_account_id: authContext.user.user_account_id,
          },
        }
      );

      if (currentUserLike.data.length > 0) {
        if (currentUserLike.data[0].positive_vote) {
          setUserLike("Like");
        } else {
          setUserLike("Dislike");
        }
      } else {
        setUserLike("");
      }
    } catch (err) {
      console.log(err);
    }
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

  const voteComment = async (e) => {
    const value = e.target.id;
    const id_value = comment_id;

    let previousVote;

    try {
      previousVote = await axios.get("http://localhost:5000/api/votes/", {
        params: {
          checkIfUserVoted: true,
          comment_id: id_value,
          user_account_id: authContext.user.user_account_id,
        },
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const payload = {
        user_account_id: authContext.user.user_account_id,
        comment_id: id_value,
      };

      let res;

      if (previousVote.data.length > 0) {
        if (previousVote.data[0].positive_vote && value === "like") {
          payload.remove_vote = true;

          res = await axios.post(
            "http://localhost:5000/api/votes",
            payload,
            config
          );
        } else if (!previousVote.data[0].positive_vote && value === "dislike") {
          payload.remove_vote = true;

          res = await axios.post(
            "http://localhost:5000/api/votes",
            payload,
            config
          );
        } else if (previousVote.data[0].positive_vote && value === "dislike") {
          payload.remove_vote = true;

          res = await axios.post(
            "http://localhost:5000/api/votes",
            payload,
            config
          );

          payload.remove_vote = false;
          payload.positive_vote = false;

          res = await axios.post(
            "http://localhost:5000/api/votes",
            payload,
            config
          );
        } else {
          payload.remove_vote = true;

          res = await axios.post(
            "http://localhost:5000/api/votes",
            payload,
            config
          );

          payload.remove_vote = false;
          payload.positive_vote = true;

          res = await axios.post(
            "http://localhost:5000/api/votes",
            payload,
            config
          );
        }
      } else {
        if (value === "like") {
          payload.positive_vote = true;

          res = await axios.post(
            "http://localhost:5000/api/votes",
            payload,
            config
          );
        } else {
          payload.positive_vote = false;

          res = await axios.post(
            "http://localhost:5000/api/votes",
            payload,
            config
          );
        }
      }
    } catch (err) {
      console.log(err);
    }

    getLikes();
    getUserLike();
  };

  const likeArrowWhite = (
    <i
      className="fa fa-sort-asc"
      onClick={voteComment}
      id="like"
      style={{ color: "var(--font-color-white)" }}
    ></i>
  );

  const likeArrowBlue = (
    <i
      className="fa fa-sort-asc"
      onClick={voteComment}
      id="like"
      style={{ color: "var(--primary-color)" }}
    ></i>
  );

  const dislikeArrowWhite = (
    <i
      className="fa fa-sort-desc"
      onClick={voteComment}
      id="dislike"
      style={{ color: "var(--font-color-white)" }}
    ></i>
  );

  const dislikeArrowBlue = (
    <i
      className="fa fa-sort-desc"
      onClick={voteComment}
      id="dislike"
      style={{ color: "var(--red-color)" }}
    ></i>
  );

  return (
    <CommentStyle>
      {/* Comment Section */}
      <CommentSection>
        <Likes>
          {userLike === "Like" ? likeArrowBlue : likeArrowWhite}
          <div>{likes}</div>
          {userLike === "Dislike" ? dislikeArrowBlue : dislikeArrowWhite}
        </Likes>
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

        <CommentUser>{comment.user.name}</CommentUser>
      </CommentSection>
      {/* Reply Section */}
      {addReply && <Reply comment={comment}></Reply>}
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

const Likes = styled.div`
  grid-row: 1/-1;
  grid-column: 1/2;
  display: grid;
  justify-items: center;
  align-items: center;
  justify-self: center;
  align-self: center;

  & i {
    font-size: 1.8rem;
  }
  & i:hover {
    cursor: pointer;
    color: var(--primary-color);
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
  justify-self: end;
  margin-right: 2rem;
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
